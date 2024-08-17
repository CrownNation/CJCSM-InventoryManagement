import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Pipe, PipeCreate } from 'src/app/models/pipe.model';
import { RackWithStock, RackWithTier, TierWithPipeInfo } from 'src/app/models/rack.model';
import { AppState } from 'src/app/store/core.state';
import { actionGetRackById, actionGetRacksWithTiers } from 'src/app/store/rack/rack.actions';
import { selectRacksWithTiers, selectSelectedRack } from 'src/app/store/rack/rack.selectors';

@Component({
  selector: 'app-tally-pipe-out',
  templateUrl: './tally-pipe-out.component.html',
  styleUrls: ['./tally-pipe-out.component.scss']
})
export class TallyPipeOutComponent {
  updatePipe(_t6: FormGroupDirective) {
    throw new Error('Method not implemented.');
  }

  pipeAddForm!: FormGroup;

  // Holds the rack and pipe on the rack so we can look them up if we need to add them back to the rack if the user
  // removes them from the tally (after having added them).
  private localRackWithStock: RackWithStock | null = null;
  // localPipeList is a copy of the pipes on a selected rack that we can manipulate without affecting the store
  // 1. We use this to populate the pipe list on the rack display table.
  // 2. We can remove pipes from this list when a rack is selected to remove pipe that are already in the tally.
  // 3. We can add pipes back to this list when a pipe is removed from the tally (meaning they go back on the rack).
  private localPipeList: Pipe[] = [];

  dataSourcePipeOnRack: MatTableDataSource<Pipe> = new MatTableDataSource<Pipe>();
  dataSourcePipeForTally: MatTableDataSource<PipeCreate> = new MatTableDataSource<PipeCreate>();

  // These are pipes registered to for the tally
  registeredPipes: PipeCreate[] = [];

  selectedPipeInTallyForEdit: Pipe | null = null;

  //This is the selection made in the rack table
  selectedPipeOnRack = new SelectionModel<Pipe>(true, []); // true for multiple selection

  emptyGuid = '00000000-0000-0000-0000-000000000000';

  displayedColumnsRack = ['pipeProperties', 'rackName', 'tierNumber', 'lengthInMeters', 'indexOfPipe', 'quantity'];
  displayedColumnsTally = ['pipeProperties', 'rackName', 'tierNumber', 'lengthInMeters', 'quantity', 'actions'];

  // This is the list of racks with their tiers
  racksWithTiers$: Observable<RackWithTier[] | null> = this.store.select(selectRacksWithTiers);
  racksWithTiers: RackWithTier[] = [];
  tiers: TierWithPipeInfo[] = [];

  // This is the selected rack from the store - ie. the rack in the store when you dispatch 'actionGetRackById'
  selectedRack$!: Observable<RackWithStock | null>;

  private destroy$ = new Subject<void>();

  constructor(public dialog: MatDialog, private store: Store<AppState>, private snackBar: MatSnackBar) {
    this.buildForm();
  }


  ngOnInit(): void {
    this.store.dispatch(actionGetRacksWithTiers());

    this.racksWithTiers$.pipe(takeUntil(this.destroy$)).subscribe((racks) => {
      if (racks) {
        this.racksWithTiers = racks;
        if (this.racksWithTiers.length > 0) {
          this.store.dispatch(actionGetRackById({ rackId: this.racksWithTiers[0].rackId }));
        }
        racks.forEach(rack => {
          console.log(`Rack ID: ${rack.rackId}, Joints per Tier: ${rack.jointsPerTier}`);
        });
      }
    });
  }

  buildForm() {
    this.pipeAddForm = new FormGroup({
      rack: new FormControl(null, [Validators.required]),
      tier: new FormControl(null),
      quantity: new FormControl(null)
    });
  }

  onRackChange(event: MatSelectChange) {
    const rackId = event.value.rackId;

    // Dispatch action to get the rack with its pipes
    this.store.dispatch(actionGetRackById({ rackId }));

    this.selectedRack$ = this.store.select(selectSelectedRack);

    this.selectedRack$.pipe(takeUntil(this.destroy$)).subscribe((rack) => {
      if (rack) {
        // Store the local copy of the full rack with stock data
        this.localRackWithStock = { ...rack };
        this.localPipeList = [...rack.pipeList]; // Store a local copy of the pipe list

        // Remove pipes that are already in the tally
        this.localPipeList = this.localPipeList.filter(
          pipe => !this.registeredPipes.some(p => p.pipeId === pipe.pipeId)
        );

        // Reset the pipe data source with the filtered list
        this.dataSourcePipeOnRack.data = [...this.localPipeList];
      }
    });

    // Reset the tier selection and filter
    this.pipeAddForm.get('tier')?.reset();

    // Get the tiers for the selected rack for further filtering
    const selectedRack = this.racksWithTiers.find(r => r.rackId === event.value.rackId);
    this.tiers = selectedRack ? selectedRack.tierList.filter(tier => tier.pipeCount > 0) : [];
  }


  onTierChange(event: MatSelectChange) {
    const selectedTierId = event.value.tierId;

    // Filter pipes by the selected tier
    this.filterPipesByTier(selectedTierId);
  }

  filterPipesByTier(tierId: string) {
    if (this.localRackWithStock) {
      // Filter pipes using the local copy of the pipe list
      const filteredPipes = this.localPipeList.filter(pipe => pipe.tierId === tierId);
      this.dataSourcePipeOnRack.data = filteredPipes;
    }
  }

  tierDisplay(tier: TierWithPipeInfo): string {
    return tier.number + " (#Pipe: " + tier.pipeCount + ")";
  }

  removePipe(row: Pipe) {
    // Remove the pipe from the tally list
    this.registeredPipes = this.registeredPipes.filter(pipe => pipe !== row);
    this.dataSourcePipeForTally.data = [...this.registeredPipes];

    // Check if the pipe being removed belongs to the currently selected rack and tier
    const currentRackId = this.pipeAddForm.get('rack')?.value.rackId;
    const currentTierId = this.pipeAddForm.get('tier')?.value?.tierId;

    // If the pipe doesn't belong to the current rack or tier, return early and do nothing
    if (row.rackId !== currentRackId || currentTierId == null || row.tierId !== currentTierId) {
      return;
    }

    // If the pipe does not belong to the current rack or tier, we proceed with re-adding it to the rack's list
    // First, find the pipe in question from the localPipeList
    const existingPipeInRack = this.localPipeList.find(
      pipe => pipe.pipeDefinitionId === row.pipeDefinitionId &&
        pipe.rackId === row.rackId &&
        pipe.tierId === row.tierId
    );

    if (existingPipeInRack) {
      // If it exists, update the quantity
      existingPipeInRack.quantity += row.quantity;
    } else {
      // If it does not exist in the localPipeList, we have to add it back in, so find the original pipe from the racksWithTiers (which holds all racks and tiers).
      const originalPipeInRack = this.racksWithTiers
        .flatMap(rack => rack.tierList)
        .flatMap(tier => tier.tierId === row.tierId && tier.rackId === row.rackId ? this.localRackWithStock!.pipeList : [])
        .find(pipe => pipe.pipeDefinitionId === row.pipeDefinitionId);

      if (originalPipeInRack) {
        // Recreate the original pipe with correct properties and add it to the localPipeList
        const restoredPipe: Pipe = {
          ...originalPipeInRack,
          quantity: row.quantity // Set the quantity to the row's quantity
        };

        this.localPipeList.push(restoredPipe);

        // Sort the local pipe list by Rack, then Tier (ascending), then indexOfPipe
        this.localPipeList.sort((a, b) => {
          const rackComparison = a.rackId.localeCompare(b.rackId);
          if (rackComparison !== 0) return rackComparison;

          const tierComparison = a.tierId.localeCompare(b.tierId);
          if (tierComparison !== 0) return tierComparison;

          return a.indexOfPipe - b.indexOfPipe;
        });
      }
    }

    // Update the data source to reflect changes
    this.dataSourcePipeOnRack.data = [...this.localPipeList];

    // If there is a tier filter active, reapply it
    if (currentTierId) {
      this.filterPipesByTier(currentTierId);
    }
  }


  cancelEdit(formDirective: any) {
    this.selectedPipeInTallyForEdit = null;
    this.pipeAddForm.reset();
    formDirective.resetForm();
  }

  addPipe(formDirective: any) {
    //If we're editing, then we don't add a new pipe.
    if (this.selectedPipeInTallyForEdit) return;

    // Check if the form is valid, if not, mark all fields as touched (so they show their error as well so we can see all missing fields) and return
    if (this.pipeAddForm.invalid) {
      this.pipeAddForm.markAllAsTouched();
      return;
    }

    const selectedPipesOnRack = this.selectedPipeOnRack.selected;

    if (selectedPipesOnRack.length === 0) {
      this.showSnackBar("Please select at least one pipe.", 'Close', { duration: 5000, panelClass: ['error-snack-bar'] });
      return;
    }

    selectedPipesOnRack.forEach(pipeOnRack => {
      const moveQuantity = selectedPipesOnRack.length === 1
        ? this.pipeAddForm.get('quantity')?.value
        : pipeOnRack.quantity;

      if (moveQuantity > pipeOnRack.quantity) {
        this.showSnackBar(`Not enough quantity on the selected tier for ${pipeOnRack.pipeDefinition.category?.name}.`, 'Close', { duration: 5000, panelClass: ['error-snack-bar'] });
        return;
      }

      // Create a new pipe entry for the tally
      const newPipe: PipeCreate = {
        pipeId: pipeOnRack.pipeId,
        pipeDefinitionId: pipeOnRack.pipeDefinitionId,
        tierId: pipeOnRack.tierId,
        rackId: pipeOnRack.rackId,
        tierNumber: pipeOnRack.tierNumber,
        rackName: pipeOnRack.rackName,
        customerId: pipeOnRack.customerId,
        lengthInMeters: pipeOnRack.lengthInMeters,
        lengthInFeet: pipeOnRack.lengthInFeet,
        quantity: moveQuantity,
        indexOfPipe: 0,
        pipeDefinition: pipeOnRack.pipeDefinition
      };

      // Add the new pipe to the tally list
      this.registeredPipes.push(newPipe);
      this.dataSourcePipeForTally.data = [...this.registeredPipes];

      // Find the pipe in the local list and update its quantity
      const localPipeIndex = this.localPipeList.findIndex(p => p.pipeId === pipeOnRack.pipeId);
      if (localPipeIndex > -1) {
        // Create a new object that is a copy of the localPipe
        const localPipe = { ...this.localPipeList[localPipeIndex] };

        localPipe.quantity -= moveQuantity;

        if (localPipe.quantity <= 0) {
          // Remove the pipe from the local list if its quantity is zero or less
          this.localPipeList.splice(localPipeIndex, 1);
        } else {
          // Replace the original pipe in the local list with the updated pipe
          this.localPipeList[localPipeIndex] = localPipe;
        }
      }

    });

    // Update the pipe data source with the local pipe list
    this.dataSourcePipeOnRack.data = [...this.localPipeList];

    // Apply tier filter if a tier is selected
    const selectedTierId = this.pipeAddForm.get('tier')?.value?.tierId;
    if (selectedTierId) {
      this.filterPipesByTier(selectedTierId);
    }

    // Clear the selection & quantity field
    this.selectedPipeOnRack.clear();
    this.pipeAddForm.get('quantity')?.reset();
  }

  handlePipeOnRackClick(row: Pipe) {
    this.selectedPipeOnRack.toggle(row);

    // Change the quantity field based on the number of items selected. Quantity is only used if a single item is selected.
    // If 1 item is selected, we use the quantity, otherwise we set it to null (ie empty)
    if (this.selectedPipeOnRack.selected.length > 1) {
      this.pipeAddForm.get('quantity')?.setValue(null);
    } else if (this.selectedPipeOnRack.selected.length === 1) {
      this.pipeAddForm.get('quantity')?.setValue(row.quantity);
    } else {
      this.pipeAddForm.get('quantity')?.setValue(null);
    }
  }

  showSnackBar(message: string, action: string = 'Close', config: any = { duration: 5000, panelClass: ['snack-bar'] }) {
    this.snackBar.open(message, action, config);
  }

  // Method to get registered pipes
  getPipeForTallyOutList(): PipeCreate[] {
    return this.registeredPipes;
  }

}

