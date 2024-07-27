import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { ShopLocation } from '../../models/shop-location.model';
import { Customer } from '../../models/customer.model';
import { DtoPipeCreate, DtoTallyCreate, DtoTierWithPipe, Tally, TallyTypes } from '../../models/tally.model';
import { actionGetCustomersFullList } from '../../store/customer/customer.actions';
import { actionGetRacksWithTiers, actionGetShopLocations } from '../../store/rack/rack.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RackWithTier, TierWithPipeInfo } from '../../models/rack.model';
import { selectRacksWithTiers } from '../../store/rack/rack.selectors';
import { selectCustomersFullList } from '../../store/customer/customer.selectors';
import { PipeDefinition } from '../../models/pipe.model';
import { MatSelectChange } from '@angular/material/select';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { actionCreateTally } from '../../store/tally/tally.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { selectCreatedTally, selectCreatingTally, selectCreatingTallyError } from '../../store/tally/tally.selectors';
import { NotificationService } from '../../core/notifications/notification.service';
import { selectAllShopLocations } from 'src/app/store/shop-location/shop-location.selectors';
import { MatDialog } from '@angular/material/dialog';
import { PipeDefinitionSelectComponent } from 'src/app/shared/pipe-definition-select/pipe-definition-select.component';
import { EquipmentDefinitionSelectComponent } from 'src/app/shared/equipment-definition-select/equipment-definition-select.component';
import { DtoEquipmentCreate, EquipmentDefinition } from 'src/app/models/equipment.model';
import { MatTabLabelWrapper } from '@angular/material/tabs';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-tally-add',
  templateUrl: './tally-add.component.html',
  styleUrls: ['./tally-add.component.scss']
})
export class TallyAddComponent {

  @ViewChild('lengthInMetersInput') lengthInMetersInput!: ElementRef;

  tallyAddForm!: FormGroup;
  pipeAddForm!: FormGroup;
  equipmentAddForm!: FormGroup;

  isInit: boolean = true;
  loading: Boolean = true;
  error: HttpErrorResponse | null = null;

  // Used to set a flag for showing an error message when a pipe definition is not selected
  showPipeDefinitionSelectedError: boolean = false;
  showEquipmentDefinitionSelectedError: boolean = false;

  shops: ShopLocation[] = [];
  customers: Customer[] = [];
  tallyTypes = Object.values(TallyTypes).filter(value => typeof value === 'number') as number[];
  racksWithTiers: RackWithTier[] = [];
  customersFullList: Customer[] = [];
  pipeDefinitionList: PipeDefinition[] = [];
  shopLocations: ShopLocation[] = [];
  tiers: TierWithPipeInfo[] = [];
  emptyGuid = '00000000-0000-0000-0000-000000000000'; // Used for creating a new tier when sending to api
  selectedPipe: DtoPipeCreate | null = null;
  selectedEquipment: DtoEquipmentCreate | null = null;
  selectedPipeDefinition: PipeDefinition | null = null;


  formDirective: any;

  // displayedColumns: string[] = [
  //   'tallyNumber',
  //   'actions'
  // ];

  //  displayedColumns = ['quantity', 'lengthInMeters', 'rack', 'tier', 'pipeProperties', 'actions'];
  displayedColumns = ['quantity', 'lengthInMeters', 'pipeProperties', 'actions'];

  dataSourcePipe: MatTableDataSource<DtoPipeCreate> = new MatTableDataSource<DtoPipeCreate>;
  dataSourceEquipment: MatTableDataSource<DtoEquipmentCreate> = new MatTableDataSource<DtoEquipmentCreate>;

  registeredPipes: DtoPipeCreate[] = [];
  registeredEquipment: DtoEquipmentCreate[] = [];

  private destroy$ = new Subject<void>();

  racksWithTiers$: Observable<RackWithTier[] | null> = this.store.select(selectRacksWithTiers);
  customersFullList$: Observable<Customer[] | null> = this.store.select(selectCustomersFullList);
  shopLocationList$: Observable<ShopLocation[] | null> = this.store.select(selectAllShopLocations);

  creatingTally$: Observable<Boolean> = this.store.select((selectCreatingTally));
  createdTally$: Observable<Tally | null> = this.store.select((selectCreatedTally));
  error$: Observable<HttpErrorResponse | null> = this.store.select((selectCreatingTallyError));

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private notificationService: NotificationService,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.store.dispatch(actionGetCustomersFullList({ searchParams: null }));
    this.store.dispatch(actionGetRacksWithTiers());
    this.store.dispatch(actionGetShopLocations());

    this.buildForm();
    this.dataSourcePipe = new MatTableDataSource(this.registeredPipes);
    this.dataSourceEquipment = new MatTableDataSource(this.registeredEquipment);


    this.racksWithTiers$.pipe(takeUntil(this.destroy$)).subscribe((racks) => {
      if (racks) {
        this.racksWithTiers = racks;
      }
    });

    this.customersFullList$.pipe(takeUntil(this.destroy$)).subscribe((customers) => {
      if (customers) {
        this.customersFullList = customers;
      }
    });


    this.shopLocationList$.pipe(takeUntil(this.destroy$)).subscribe((shopLocations) => {
      if (shopLocations) {
        this.shopLocations = shopLocations;
      }
    });

    // Creating Tally
    this.error$.subscribe((error) => {
      if (error) {
        console.error(error);
        this.error = error;
        this.notificationService.success('There was a problem creating the tally. ');
      }
    });

    this.createdTally$.subscribe((tally) => {
      console.log('tally: ', tally);

      if (tally && !this.isInit) {
        this.notificationService.success('Tally created successfully');
        this.close();
      }
    });

    this.creatingTally$.subscribe((loading) => {
      this.loading = loading;
    });
  }

  buildForm() {
    this.tallyAddForm = new FormGroup({
      tallyType: new FormControl(TallyTypes.TallyIn, [Validators.required]),
      tallyNumber: new FormControl(null, [Validators.required]),
      customer: new FormControl(null, [Validators.required]),
      shopLocation: new FormControl(null, [Validators.required]),
      dateOfCreation: new FormControl(new Date(), [Validators.required]),
      notes: new FormControl(null),
      invoiceNumber: new FormControl(null),
      carrierName: new FormControl(null, [Validators.required]),
      // weightInKg: new FormControl(null, [Validators.required]),
      // weightInLbs: new FormControl(null, [Validators.required])
    });

    this.pipeAddForm = new FormGroup({
      rack: new FormControl(null, [Validators.required]),
      tier: new FormControl(null, [Validators.required]),
      pipeDefinition: new FormControl(null, [Validators.required]),
      equipmentDefinition: new FormControl(null),
      lengthInMeters: new FormControl(null, [Validators.required]),
      // lengthInFeet: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
    });

    this.equipmentAddForm = new FormGroup({
      equipmentDefinition: new FormControl(null, [Validators.required]),
      quantityEquipment: new FormControl(null, [Validators.required]),
      lengthInMetersEquipment: new FormControl(null, [Validators.required])
    });

  }

  createTally() {
    if (this.tallyAddForm.invalid) {
      this.tallyAddForm.markAllAsTouched();
      return;
    }

    // Go through each of the pipe that was added by the user.
    // This block will organize all of the pipe into the tiers in which they belong.
    // It will find a tier that matches the pipe's tierId, if it doesn't exist in the list yet, it will add
    // that tier to the list, and add the pipe to that tier's pipe list.
    // If the tier already exists in the list, it will just add the pipe to that tier's pipe list.
    // Note that the tierId can be null, which means that the pipe is not assigned to a tier yet.
    // This case is handled in the back end and a new tier will be assigned.
    const tiersWithPipe: DtoTierWithPipe[] = [];

    this.registeredPipes.forEach(pipe => {
      // 1 meter is equal to 3.280839895 feet
      pipe.lengthInFeet = pipe.lengthInMeters * 3.280839895;
      pipe.customerId = this.tallyAddForm.get('customer')?.value;

      const tier = tiersWithPipe.find(t => t.tierId === pipe.tierId);
      if (tier) {
        tier.pipeList.push(pipe);
      }
      else {
        tiersWithPipe.push({
          tierId: pipe.tierId,
          pipeList: [pipe]
        });
      }
    });


    const newTally: DtoTallyCreate = {
      tallyNumber: this.tallyAddForm.get('tallyNumber')?.value,
      shopLocationId: this.tallyAddForm.get('shopLocation')?.value,
      tallyType: this.tallyAddForm.get('tallyType')?.value,
      dateOfCreation: new Date(this.tallyAddForm.get('dateOfCreation')?.value).toISOString(),
      notes: this.tallyAddForm.get('notes')?.value,
      invoiceNumber: this.tallyAddForm.get('invoiceNumber')?.value,
      carrierName: this.tallyAddForm.get('carrierName')?.value,
      tierList: tiersWithPipe,

      customerId: this.tallyAddForm.get('customer')?.value,
      talliedByUserId: 'B3CFC44C-879B-43EF-B6F0-02FA0D232430', // Not used in backend, dummy data

    };

    this.isInit = false;
    this.store.dispatch(actionCreateTally({ tallyCreate: newTally }));


  }

  addPipe(formDirective: any) {
    if (this.selectedPipe)
      return;

    this.pipeDefinitionList.find(p => p.pipeDefinitionId === this.pipeAddForm.get('pipeDefinition')?.value)

    if (!this.pipeAddForm.invalid) {
      const newPipe: DtoPipeCreate = {
        pipeDefinitionId: this.pipeAddForm.get('pipeDefinition')?.value,
        tierId: this.pipeAddForm.get('tier')?.value,
        rackId: this.pipeAddForm.get('rack')?.value,
        customerId: this.tallyAddForm.get('customer')?.value,
        lengthInMeters: this.pipeAddForm.get('lengthInMeters')?.value,
        lengthInFeet: this.pipeAddForm.get('lengthInFeet')?.value, // Note; This is calculated at the backend
        quantity: this.pipeAddForm.get('quantity')?.value,
        indexOfPipe: 1, // This is calculated at the backend
        //pipeDefinition: this.pipeDefinitionList.find(p => p.pipeDefinitionId === this.pipeAddForm.get('pipeDefinition')?.value)
        pipeDefinition: this.selectedPipeDefinition!
      };
      this.registeredPipes.push(newPipe);
      this.dataSourcePipe.data = this.registeredPipes;

      // this.pipeAddForm.reset();
      // formDirective.resetForm();


      // this.formDirective.resetForm();
      this.clearAfterPipeAdd();
      this.formDirective = formDirective;
    }
    else {
      this.pipeAddForm.markAllAsTouched();
    }
  }


  addEquipment(formDirective: any) {
    if (this.selectedPipe)
      return;


    if (!this.pipeAddForm.invalid) {
      const newPipe: DtoPipeCreate = {
        pipeDefinitionId: this.pipeAddForm.get('pipeDefinition')?.value,
        tierId: this.pipeAddForm.get('tier')?.value,
        rackId: this.pipeAddForm.get('rack')?.value,
        customerId: this.tallyAddForm.get('customer')?.value,
        lengthInMeters: this.pipeAddForm.get('lengthInMeters')?.value,
        lengthInFeet: this.pipeAddForm.get('lengthInFeet')?.value, // Note; This is calculated at the backend
        quantity: this.pipeAddForm.get('quantity')?.value,
        indexOfPipe: 1, // This is calculated at the backend
        pipeDefinition: this.pipeDefinitionList.find(p => p.pipeDefinitionId === this.pipeAddForm.get('pipeDefinition')?.value)
      };
      this.registeredPipes.push(newPipe);
      this.dataSourcePipe.data = this.registeredPipes;

      // this.pipeAddForm.reset();
      // formDirective.resetForm();


      // this.formDirective.resetForm();
      this.clearAfterPipeAdd();
      this.formDirective = formDirective;
    }
    else {
      this.pipeAddForm.markAllAsTouched();
    }
  }


  // clearAfterPipeAdd() {
  //   this.pipeAddForm.patchValue({
  //     lengthInMeters: null,
  //   });
  //   // This is to reset the length in meters so it doesn't display as an error after adding a pipe
  //   this.pipeAddForm.get('lengthInMeters')?.setValidators([]);
  //   this.pipeAddForm.get('lengthInMeters')?.updateValueAndValidity();
  //   this.pipeAddForm.get('lengthInMeters')?.setValidators([
  //     Validators.required,
  //   ]);


  //   this.lengthInMetersInput.nativeElement.focus();
  // }

  clearAfterPipeAdd() {
    // Reset the form values
    this.pipeAddForm.reset({
      lengthInMeters: null,  // Reset length in meters and clear any associated errors
      rack: null,            // Assuming you might want to clear this as well
      tier: null,            // Clear tier
      pipeDefinition: null,  // Clear pipe definition
      quantity: null         // Clear quantity
    });

    this.selectedPipeDefinition = null;

    this.pipeAddForm.markAsPristine();
    this.pipeAddForm.markAsUntouched();

    Object.keys(this.pipeAddForm.controls).forEach(key => {
      const control = this.pipeAddForm.get(key);
      control?.setErrors(null);     // Clear any specific errors from the control
      control?.markAsPristine();    // Set each control as pristine
      control?.markAsUntouched();   // Set each control as untouched
      control?.updateValueAndValidity(); // Update the validity of the control
    });

    // Update the validity of the form to reapply the validators
    this.pipeAddForm.updateValueAndValidity();
  }

  editPipe(pipe: DtoPipeCreate) {
    this.pipeAddForm.patchValue({
      rack: pipe.rackId,
      tier: pipe.tierId,
      pipeDefinition: pipe.pipeDefinitionId,
      lengthInMeters: pipe.lengthInMeters,
      quantity: pipe.quantity
    });

    this.selectedPipe = pipe;
  }

  updatePipe() {

    const newPipe: DtoPipeCreate = {
      pipeDefinitionId: this.pipeAddForm.get('pipeDefinition')?.value,
      tierId: this.pipeAddForm.get('tier')?.value,
      rackId: this.pipeAddForm.get('rack')?.value,
      customerId: this.tallyAddForm.get('customer')?.value,
      lengthInMeters: this.pipeAddForm.get('lengthInMeters')?.value,
      lengthInFeet: this.pipeAddForm.get('lengthInFeet')?.value, // Note; This is calculated at the backend
      quantity: this.pipeAddForm.get('quantity')?.value,
      indexOfPipe: 1, // This is calculated at the backend
      pipeDefinition: this.pipeDefinitionList.find(p => p.pipeDefinitionId === this.pipeAddForm.get('pipeDefinition')?.value)
    };

    const index = this.registeredPipes.indexOf(this.selectedPipe as DtoPipeCreate);
    this.registeredPipes[index] = newPipe;
    this.dataSourcePipe.data = this.registeredPipes;

    this.selectedPipe = null;

    this.pipeAddForm.reset();
    this.formDirective.resetForm();
  }

  cancelEdit() {
    this.selectedPipe = null;
    this.pipeAddForm.reset();
    this.formDirective.resetForm();
  }

  removePipe(row: any) {
    this.registeredPipes = this.registeredPipes.filter(pipe => pipe !== row);
    this.dataSourcePipe.data = this.registeredPipes;
  }

  onRackChange(event: MatSelectChange) {
    const newTier: TierWithPipeInfo = {
      tierId: this.emptyGuid,
      rackId: event.value,
      number: 0,
      pipeCount: 0
    };
    this.tiers = [newTier, ...(this.racksWithTiers.find(r => r.rackId === event.value)?.tierList as TierWithPipeInfo[])];

  }

  tierDisplay(tier: TierWithPipeInfo) {

    if (tier.tierId === this.emptyGuid)
      return 'New Tier'

    return tier.number;
  }

  close(): void {
    this.router.navigate(['/dashboard']);
  }

  displayTallyType(tallyType: number) {
    if (tallyType === TallyTypes.TallyIn) {
      return 'In'
    }
    else if (tallyType === TallyTypes.TallyOut) {
      return 'Out'
    }

    return ''
  }

  preventDecimal(event: KeyboardEvent) {
    if (event.key === '.' || event.key === '-') {
      event.preventDefault();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
        console.log("We have a selection: " + equipmentDefText);
      } else {
        console.log("WE DO NOT HAVE A SELECTION.");
      }
      console.log('The dialog was closed');
      // Additional actions can be performed here with the selected equipment definition
    });
  }


}
