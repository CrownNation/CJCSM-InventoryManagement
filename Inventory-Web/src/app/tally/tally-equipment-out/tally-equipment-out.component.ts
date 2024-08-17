import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Equipment, EquipmentCreate, EquipmentDefinition } from 'src/app/models/equipment.model';
import { Rack, RackWithStock, RackWithTier } from 'src/app/models/rack.model';
import { EquipmentDefinitionSelectComponent } from 'src/app/shared/equipment-definition-select/equipment-definition-select.component';
import { AppState } from 'src/app/store/core.state';
import { actionGetEquipmentRacks, actionGetRackById } from 'src/app/store/rack/rack.actions';
import { selectEquipmentRacks, selectRacksWithTiers, selectSelectedRack } from 'src/app/store/rack/rack.selectors';

@Component({
  selector: 'app-tally-equipment-out',
  templateUrl: './tally-equipment-out.component.html',
  styleUrls: ['./tally-equipment-out.component.scss']
})
export class TallyEquipmentOutComponent {
  equipmentAddForm!: FormGroup;

  // This is the rack with equipment on that rack. We use this to add equipment back to the rack if they have added, then removed equipment form the tally.
  private localRackWithStock: RackWithStock | null = null;
  // localEquipmentList is a copy of the equipment on a selected rack that we can manipulate without affecting the store
  // 1. We use this to populate the equipment list on the rack display table.
  // 2. We can remove equipment from this list when a rack is selected to remove equipment that are already in the tally.
  // 3. We can add equipment back to this list when equipment is removed from the tally (meaning they go back on the rack).
  private localEquipmentList: Equipment[] = [];

  // These are the data sources for the tables (rack and equipment on the tally)
  dataSourceEquipmentOnRack: MatTableDataSource<Equipment> = new MatTableDataSource<Equipment>();
  dataSourceEquipmentForTally: MatTableDataSource<EquipmentCreate> = new MatTableDataSource<EquipmentCreate>();

  displayedColumnsRack = ['equipmentProperties', 'rackName', 'lengthInMeters', 'quantity'];
  displayedColumnsTally = ['equipmentProperties', 'rackName', 'lengthInMeters', 'quantity', 'actions'];

  // These are pipes registered to for the tally
  registeredEquipment: EquipmentCreate[] = [];

  // This is the selected piece of equipment in the tally table
  selectedEquipmentInTallyForEdit: Equipment | null = null;
  //This is the selection made in the rack table
  selectedEquipmentOnRack = new SelectionModel<Equipment>(true, []); // true for multiple selection

  // This is the selected rack from the store - ie. the rack in the store when you dispatch 'actionGetRackById'
  selectedRack$!: Observable<RackWithStock | null>;

  // This is used to populate the equipment rack drop down
  equipmentRacks: Rack[] = [];
  equipmentRacks$: Observable<Rack[] | null> = this.store.select(selectEquipmentRacks);

  emptyGuid = '00000000-0000-0000-0000-000000000000';

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.store.dispatch(actionGetEquipmentRacks());

    this.buildForm();

    this.dataSourceEquipmentForTally = new MatTableDataSource(this.registeredEquipment);

    this.equipmentRacks$.pipe(takeUntil(this.destroy$)).subscribe((racks) => {
      if (racks) {
        this.equipmentRacks = racks;
      }
    });

  }

  buildForm() {
    this.equipmentAddForm = new FormGroup({
      rack: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null),
    });
  }

  addEquipment(formDirective: any) {
    //If we're editing, then we don't add a new equipment.
    if (this.selectedEquipmentInTallyForEdit) return;

    console.log("Check for valid: " + this.equipmentAddForm.invalid);
    // If the form is invalid, check all other form controls and mark them as touched, and return.
    if (this.equipmentAddForm.invalid == true) {
      this.equipmentAddForm.markAllAsTouched();

      Object.keys(this.equipmentAddForm.controls).forEach(key => {
        const controlErrors = this.equipmentAddForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`Control: ${key}, Errors:`, controlErrors);
        }
      });

      return;
    }

    const selectedEquipmentOnRack = this.selectedEquipmentOnRack.selected;

    if (selectedEquipmentOnRack.length === 0) {
      this.showSnackBar("Please select at least one equipment.", 'Close', { duration: 5000, panelClass: ['error-snack-bar'] });
      return;
    }

    // For each selection (You can select more than one thing to move at once).
    // If you have more than one thing selected, it uses all quantity on that stack (ie. does not use the quantity text box)
    selectedEquipmentOnRack.forEach(equipmentOnRack => {
      const moveQuantity = selectedEquipmentOnRack.length === 1
        ? this.equipmentAddForm.get('quantity')?.value
        : equipmentOnRack.quantity;

      if (moveQuantity > equipmentOnRack.quantity) {
        this.showSnackBar(`Not enough quantity on the selected tier for ${equipmentOnRack.equipmentDefinition.category}.`, 'Close', { duration: 5000, panelClass: ['error-snack-bar'] });
        return;
      }

      const newEquipment: EquipmentCreate = {
        equipmentId: equipmentOnRack.equipmentId,
        rackId: this.equipmentAddForm.get('rack')?.value.rackId,
        rackName: this.equipmentAddForm.get('rack')?.value.name,
        equipmentDefinitionId: equipmentOnRack.equipmentDefinition.equipmentDefinitionId,
        equipmentDefinition: equipmentOnRack.equipmentDefinition,
        customerId: "", // This is populated when the tally is created
        shopLocationId: "", // This is populated when the tally is created
        quantity: this.equipmentAddForm.get('quantity')?.value,
        lengthInMeters: this.equipmentAddForm.get('lengthInMeters')?.value,
        lengthInFeet: 0 // Note: this is calculated in tally create
      };

      // Add the new equipment to the tally
      this.registeredEquipment.push(newEquipment);
      this.dataSourceEquipmentForTally.data = this.registeredEquipment;

      // Find the eqipment in the local list and update its quantity
      const localEquipmentIndex = this.localEquipmentList.findIndex(e => e.equipmentId === equipmentOnRack.equipmentId);
      if (localEquipmentIndex > -1) {
        // Create a new object that is a copy of the localEquipment
        const localEquipment = { ...this.localEquipmentList[localEquipmentIndex] };

        localEquipment.quantity -= moveQuantity;

        if (localEquipment.quantity <= 0) {
          // Remove the equipment from the local list if its quantity is zero or less
          this.localEquipmentList.splice(localEquipmentIndex, 1);
        } else {
          // Replace the original equipment in the local list with the updated equipment
          this.localEquipmentList[localEquipmentIndex] = localEquipment;
        }
      }
    });

    // Update the equipment data source with the local equipment list to reflect the equipment that was removed from the rack
    this.dataSourceEquipmentOnRack.data = [...this.localEquipmentList];

    // Clear the selection & quantity field
    this.selectedEquipmentOnRack.clear();
    this.equipmentAddForm.get('quantity')?.reset();
  }

  removeEquipment(row: any) {
    this.registeredEquipment = this.registeredEquipment.filter(equipment => equipment !== row);
    this.dataSourceEquipmentForTally.data = this.registeredEquipment;
  }

  cancelEdit(formDirective: any) {
    this.selectedEquipmentInTallyForEdit = null;
    this.equipmentAddForm.reset();
    formDirective.resetForm();
  }

  showSnackBar(message: string, action: string = 'Close', config: any = { duration: 5000, panelClass: ['snack-bar'] }) {
    this.snackBar.open(message, action, config);
  }

  // Method to get registered equipment
  getEquipmentList(): EquipmentCreate[] {
    return this.registeredEquipment;
  }

  handleEquipmentOnRackClick(row: any) {
    this.selectedEquipmentOnRack.toggle(row);

    // Change the quantity field based on the number of items selected. Quantity is only used if a single item is selected.
    // If 1 item is selected, we use the quantity, otherwise we set it to null (ie empty)
    if (this.selectedEquipmentOnRack.selected.length > 1) {
      this.equipmentAddForm.get('quantity')?.setValue(null);
    } else if (this.selectedEquipmentOnRack.selected.length === 1) {
      this.equipmentAddForm.get('quantity')?.setValue(row.quantity);
    } else {
      this.equipmentAddForm.get('quantity')?.setValue(null);
    }
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
        this.localEquipmentList = [...rack.equipmentList]; // Store a local copy of the pipe list

        // Remove pipes that are already in the tally. This is to prevent adding the same equipment to the tally twice, or showing it as an option to add.
        this.localEquipmentList = this.localEquipmentList.filter(
          equipment => !this.registeredEquipment.some(e => e.equipmentId === equipment.equipmentId)
        );

        // Reset the pipe data source with the filtered list
        this.dataSourceEquipmentOnRack.data = [...this.localEquipmentList];
      }
    });

  }

  updateEquipment(_t6: FormGroupDirective) {
    throw new Error('Method not implemented.');
  }

}
