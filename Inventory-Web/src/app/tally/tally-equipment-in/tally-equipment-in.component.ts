import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { EquipmentCreate, EquipmentDefinition } from 'src/app/models/equipment.model';
import { Rack } from 'src/app/models/rack.model';
import { EquipmentDefinitionSelectComponent } from 'src/app/shared/equipment-definition-select/equipment-definition-select.component';
import { AppState } from 'src/app/store/core.state';
import { actionGetEquipmentRacks } from 'src/app/store/rack/rack.actions';
import { selectEquipmentRacks } from 'src/app/store/rack/rack.selectors';

@Component({
  selector: 'app-tally-equipment-in',
  templateUrl: './tally-equipment-in.component.html',
  styleUrls: ['./tally-equipment-in.component.scss']
})
export class TallyEquipmentInComponent {

  equipmentAddForm!: FormGroup;

  // Used to set a flag for showing an error message when a pipe definition is not selected
  showEquipmentDefinitionSelectedError: boolean = false;
  equipmentRacks: Rack[] = [];

  selectedEquipment: EquipmentCreate | null = null;
  selectedEquipmentDefinition: EquipmentDefinition | null = null;

  dataSourceEquipment: MatTableDataSource<EquipmentCreate> = new MatTableDataSource<EquipmentCreate>;
  registeredEquipment: EquipmentCreate[] = [];

  equipmentRacks$: Observable<Rack[] | null> = this.store.select(selectEquipmentRacks);

  displayedColumnsEquipment = ['equipmentProperties', 'name', 'quantity', 'actions'];

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {

    this.store.dispatch(actionGetEquipmentRacks());

    this.buildForm();
    
    this.dataSourceEquipment = new MatTableDataSource(this.registeredEquipment);

    this.equipmentRacks$.pipe(takeUntil(this.destroy$)).subscribe((racks) => {
      if (racks) {
        this.equipmentRacks = racks;
      }
    });

  }

  buildForm() {

    this.equipmentAddForm = new FormGroup({
      rackEquipment: new FormControl(null, [Validators.required]),
      equipmentDefinition: new FormControl(null, [Validators.required]),
      quantityEquipment: new FormControl(null, [Validators.required]),
      lengthInMetersEquipment: new FormControl(null, [Validators.required])
    });
  }

  addEquipment(formDirective: any) {
    if (this.selectedEquipment)
      return;

    console.log("oooooooooooooooooooooooooooooooooooooooooooooooo");
    console.log("EQUIPMENT DEFINITION: " + this.selectedEquipmentDefinition!.equipmentDefinitionId);
    if (!this.equipmentAddForm.invalid) {
      const newEquipment: EquipmentCreate = {
        rackId: this.equipmentAddForm.get('rackEquipment')?.value.rackId,
        rackName: this.equipmentAddForm.get('rackEquipment')?.value.name,
        equipmentDefinitionId: this.selectedEquipmentDefinition!.equipmentDefinitionId,
        equipmentDefinition: this.selectedEquipmentDefinition!,
        customerId: "", // This is populated when the tally is created
        shopLocationId: "", // This is populated when the tally is created
        quantity: this.equipmentAddForm.get('quantityEquipment')?.value,
        lengthInMeters: this.equipmentAddForm.get('lengthInMetersEquipment')?.value,
        lengthInFeet: 0 // Note: this is calculated in tally create
      };

      //display the new equipment's rack id and name
      console.log("rackId: " + newEquipment.rackId);
      console.log("rackName: " + newEquipment.rackName);
      this.registeredEquipment.push(newEquipment);
      this.dataSourceEquipment.data = this.registeredEquipment;

      formDirective.resetForm();

    } else {
      this.equipmentAddForm.markAllAsTouched();
    }
  }

  
  removeEquipment(row: any) {
    this.registeredEquipment = this.registeredEquipment.filter(equipment => equipment !== row);
    this.dataSourceEquipment.data = this.registeredEquipment;
  }

  
  openSelectEquipmentDefinitionDialog() {
    const dialogRef = this.dialog.open(EquipmentDefinitionSelectComponent, {
      width: '90%', // You can use percentage
      maxWidth: 'none', // This ensures the dialog can expand full width if necessary
      maxHeight: 'none', // This ensures the dialog can expand full height if necessary
      height: '90%',
      panelClass: 'custom-dialog-container',
      autoFocus: false // This prevents the dialog from focusing on the first input field, otherwise drop down opens
    });

    dialogRef.afterClosed().subscribe((selectedEquipmentDefinition: EquipmentDefinition | null) => {
      if (selectedEquipmentDefinition) {
        var equipmentDefText: string = "";
        equipmentDefText += "Category: " + selectedEquipmentDefinition.category;
        equipmentDefText += " - Grade: " + selectedEquipmentDefinition.grade!.name;
        equipmentDefText += " - Size: " + selectedEquipmentDefinition.size!.sizeMetric + "(mm)/" + selectedEquipmentDefinition.size!.sizeImperial + "(in)";
        equipmentDefText += " - Description: " + (selectedEquipmentDefinition.description || "N/A");
        // Here, assuming you have a form control for equipment definition on your form
        this.equipmentAddForm.get('equipmentDefinition')!.setValue(equipmentDefText);
        this.selectedEquipmentDefinition = selectedEquipmentDefinition;

      }
      console.log('The dialog was closed');
      // Additional actions can be performed here with the selected equipment definition
    });
  }

  cancelEdit(formDirective: any) {
    this.selectedEquipment = null;
    this.equipmentAddForm.reset();
    formDirective.resetForm();
  }

  showSnackBar(message: string, action: string = 'Close', config: any = { duration: 5000, panelClass: ['snack-bar'] }) {
    this.snackBar.open(message, action, config);
  }

    // Method to get registered pipes
    getEquipmentList(): EquipmentCreate[] {
      return this.registeredEquipment;
    }
  
}
