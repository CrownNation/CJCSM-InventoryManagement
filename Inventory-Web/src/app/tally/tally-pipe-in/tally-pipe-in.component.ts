import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RackWithTier, TierWithPipeInfo } from '../../models/rack.model';
import { MatSelectChange } from '@angular/material/select';
import { PipeDefinitionSelectComponent } from 'src/app/shared/pipe-definition-select/pipe-definition-select.component';
import { v4 as uuidv4 } from 'uuid';
import { actionGetRacksWithTiers, addTierToRack } from 'src/app/store/rack/rack.actions';
import { AppState } from 'src/app/store/core.state';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectRacksWithTiers } from 'src/app/store/rack/rack.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PipeCreate, PipeDefinition } from 'src/app/models/pipe.model';

@Component({
  selector: 'app-tally-pipe-in',
  templateUrl: './tally-pipe-in.component.html',
  styleUrls: ['./tally-pipe-in.component.scss']
})
export class TallyPipeInComponent {
  @Input() racksWithTiers: RackWithTier[] = [];
  @Input() tiers: TierWithPipeInfo[] = [];
  @Output() pipeAdded = new EventEmitter<PipeCreate[]>();

  pipeAddForm!: FormGroup;
  dataSourcePipe: MatTableDataSource<PipeCreate> = new MatTableDataSource<PipeCreate>;
  registeredPipes: PipeCreate[] = [];

  selectedPipeDefinition: PipeDefinition | null = null;

  pipeDefinitionList: PipeDefinition[] = [];

  selectedPipe: PipeCreate | null = null;

  emptyGuid = '00000000-0000-0000-0000-000000000000'; // Used for creating a new tier when sending to api

  displayedColumns = ['pipeProperties', 'rackName', 'tierNumber', 'quantity', 'lengthInMeters', 'actions'];

  racksWithTiers$: Observable<RackWithTier[] | null> = this.store.select(selectRacksWithTiers);

  // Used to set a flag for showing an error message when a pipe definition is not selected
  showPipeDefinitionSelectedError: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(public dialog: MatDialog,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {

    this.store.dispatch(actionGetRacksWithTiers());

    // this.racksWithTiers$.pipe(
    //   takeUntil(this.destroy$)
    // ).subscribe((racks) => {
    //   if (racks) {
    //     this.racksWithTiers = racks;
    //   }
    // });
    this.racksWithTiers$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((racks) => {
      if (racks) {
        this.racksWithTiers = racks;
        // Log jointsPerTier for each rack
        racks.forEach(rack => {
          console.log(`Rack ID: ${rack.rackId}, Joints per Tier: ${rack.jointsPerTier}`);
        });
      }
    });
  }

  buildForm() {
    this.pipeAddForm = new FormGroup({
      rack: new FormControl(null, [Validators.required]),
      tier: new FormControl(null, [Validators.required]),
      pipeDefinition: new FormControl(null, [Validators.required]),
      lengthInMeters: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required])
    });

    this.dataSourcePipe = new MatTableDataSource(this.registeredPipes);

  }

  addPipe(formDirective: any) {
    if (this.selectedPipe)
      return;

    this.pipeDefinitionList.find(p => p.pipeDefinitionId === this.pipeAddForm.get('pipeDefinition')?.value)

    if (!this.pipeAddForm.invalid) {
      var selectedRack: RackWithTier | undefined = this.racksWithTiers.find(r => r.rackId === this.pipeAddForm.get('rack')?.value.rackId);

      //Check for new tier selection.
      console.log("SELECTED TIER: " + this.pipeAddForm.get('tier')?.value.tierId);

      // Set these variables now, and they will be overwritten if there is a new pipe.
      var tierIdForPipe: string = this.pipeAddForm.get('tier')?.value.tierId;
      var tierNumberForPipe: number = this.pipeAddForm.get('tier')?.value.number;

      if (this.pipeAddForm.get('tier')?.value.tierId === this.emptyGuid) {
        console.log("NEW TIER");
        const tierList = selectedRack ? selectedRack.tierList || [] : []; // Provide a fallback empty array if tierList is undefined

        //Create a new tier and add it to the tier list with a new generated GUID
        const newTier: TierWithPipeInfo = {
          tierId: uuidv4(),
          rackId: selectedRack!.rackId,
          number: tierList.length + 1,
          pipeCount: 0
        };

        tierIdForPipe = newTier.tierId;
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("New Tier Number: " + newTier.number);
        tierNumberForPipe = newTier.number;

        var rackId: string = selectedRack!.rackId;
        //Add the new tier to the tiers list
        this.store.dispatch(addTierToRack({ rackId, newTier }));
      }

      // Get the number of pipes in the selected tier
      var pipeCount = selectedRack?.tierList.find(t => t.tierId === this.pipeAddForm.get('tier')?.value.tierId)?.pipeCount || 0;

      console.log("PIPE ON TIER: " + pipeCount);
      console.log("JOINTS PER TIER: " + selectedRack!.jointsPerTier);
      console.log("QUANTITY: " + this.pipeAddForm.get('quantity')?.value);

      if (pipeCount + this.pipeAddForm.get('quantity')?.value > selectedRack!.jointsPerTier) {
        //show message card that the tier is full
        this.showSnackBar("Tier is full. Please select a new tier or rack.", 'Close', { duration: 5000, panelClass: ['error-snack-bar'] });
        return;
      }
      const newPipe: PipeCreate = {
        pipeId: "",
        pipeDefinitionId: this.selectedPipeDefinition!.pipeDefinitionId,
        tierId: tierIdForPipe,
        rackId: this.pipeAddForm.get('rack')?.value.rackId,
        tierNumber: tierNumberForPipe,
        rackName: this.pipeAddForm.get('rack')?.value.name,
        customerId: "", // This is populated when the tally is created
        lengthInMeters: this.pipeAddForm.get('lengthInMeters')?.value,
        lengthInFeet: 0, // Note; This is calculated in tally create
        quantity: this.pipeAddForm.get('quantity')?.value,
        indexOfPipe: 0, // This is calculated at the backend
        pipeDefinition: this.selectedPipeDefinition!
      };
      this.registeredPipes.push(newPipe);
      this.dataSourcePipe.data = this.registeredPipes;

      console.log("=======================================");
      console.log("TIER NUMBER: " + newPipe.tierNumber);

      console.log("=======================================");


      formDirective.resetForm();
    }
    else {
      this.pipeAddForm.markAllAsTouched();
    }
  }

  tierDisplay(tier: TierWithPipeInfo): string {
    if (tier.tierId === this.emptyGuid) return 'New Tier';
    return tier.number + " (#Pipe: " + tier.pipeCount + ")";
  }
  onRackChange(event: MatSelectChange) {
    const selectedRack = this.racksWithTiers.find(r => r.rackId === event.value.rackId);
    const tierList = selectedRack ? selectedRack.tierList || [] : []; // Provide a fallback empty array if tierList is undefined
    const newTier: TierWithPipeInfo = {
      tierId: this.emptyGuid,
      rackId: event.value.rackId,
      number: 0,
      pipeCount: 0
    };
    this.tiers = [newTier, ...tierList];
  }

  editPipe(pipe: PipeCreate) {
    this.pipeAddForm.patchValue({
      rack: pipe.rackId,
      tier: pipe.tierId,
      pipeDefinition: pipe.pipeDefinitionId,
      lengthInMeters: pipe.lengthInMeters,
      quantity: pipe.quantity
    }, {
      onlySelf: true,
      emitEvent: false
    });

    this.selectedPipe = pipe;
  }

  updatePipe(formDirective: any) {

    const newPipe: PipeCreate = {
      pipeId: "",
      pipeDefinitionId: this.pipeAddForm.get('pipeDefinition')?.value,
      tierId: this.pipeAddForm.get('tier')?.value.tierId,
      rackId: this.pipeAddForm.get('rack')?.value.rackId,
      tierNumber: this.pipeAddForm.get('tier')?.value.number,
      rackName: this.pipeAddForm.get('rack')?.value.name,
      customerId: this.emptyGuid, // This is populated when the tally is created
      lengthInMeters: this.pipeAddForm.get('lengthInMeters')?.value,
      lengthInFeet: this.pipeAddForm.get('lengthInFeet')?.value, // Note; This is calculated at the backend
      quantity: this.pipeAddForm.get('quantity')?.value,
      indexOfPipe: 1, // This is calculated at the backend
      pipeDefinition: this.pipeDefinitionList.find(p => p.pipeDefinitionId === this.pipeAddForm.get('pipeDefinition')?.value)
    };

    const index = this.registeredPipes.indexOf(this.selectedPipe as PipeCreate);
    this.registeredPipes[index] = newPipe;
    this.dataSourcePipe.data = this.registeredPipes;

    this.selectedPipe = null;

    this.pipeAddForm.reset();
    formDirective.resetForm();
  }



  removePipe(row: any) {
    this.registeredPipes = this.registeredPipes.filter(pipe => pipe !== row);
    this.dataSourcePipe.data = this.registeredPipes;
  }

  cancelEdit(formDirective: any) {
    this.selectedPipe = null;
    this.pipeAddForm.reset();
    formDirective.resetForm();
  }

  openSelectPipeDefinitionDialog() {
    const dialogRef = this.dialog.open(PipeDefinitionSelectComponent, {
      width: '90%', // You can use percentage
      maxWidth: 'none',
      maxHeight: 'none',
      height: '90%',
      panelClass: 'custom-dialog-container',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((selectedPipeDefinition: PipeDefinition | null) => {
      if (selectedPipeDefinition) {
        var pipeDefText: string = "";
        pipeDefText += "Category: " + selectedPipeDefinition.category?.name;
        pipeDefText += "- Condition: " + selectedPipeDefinition.condition?.name;
        //add grade
        pipeDefText += "- Grade: " + selectedPipeDefinition.grade?.name;
        //add size both metric and imperial
        pipeDefText += "- Size: " + selectedPipeDefinition.size?.sizeMetric + "(mm)/" + selectedPipeDefinition.size?.sizeImperial + "(in)";
        this.pipeAddForm.get('pipeDefinition')!.setValue(pipeDefText);
        this.selectedPipeDefinition = selectedPipeDefinition;

      }
      console.log('The dialog was closed');
      // You can do something with the result here if needed
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showSnackBar(message: string, action: string = 'Close', config: any = { duration: 5000, panelClass: ['snack-bar'] }) {
    this.snackBar.open(message, action, config);
  }

  // Method to get registered pipes
  getPipeList(): PipeCreate[] {
    return this.registeredPipes;
  }

}


