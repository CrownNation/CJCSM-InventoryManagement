import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { ShopLocation } from '../../models/shop-location.model';
import { Customer } from '../../models/customer.model';
import { DtoTallyCreate, DtoTierWithPipe, Tally, TallyTypes } from '../../models/tally.model';
import { actionGetCustomersFullList } from '../../store/customer/customer.actions';
import { actionGetEquipmentRacks, actionGetRacksWithTiers, addTierToRack } from '../../store/rack/rack.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Rack, RackWithTier, TierWithPipeInfo } from '../../models/rack.model';
import { selectEquipmentRacks, selectRacks, selectRacksWithTiers } from '../../store/rack/rack.selectors';
import { selectCustomersFullList } from '../../store/customer/customer.selectors';
import { PipeCreate, PipeDefinition } from '../../models/pipe.model';
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
import { EquipmentCreate, EquipmentDefinition } from 'src/app/models/equipment.model';
import { actionGetShopLocations } from 'src/app/store/shop-location/shop-location.actions';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  equipmentRacks: Rack[] = [];
  customersFullList: Customer[] = [];
  pipeDefinitionList: PipeDefinition[] = [];
  shopLocations: ShopLocation[] = [];
  tiers: TierWithPipeInfo[] = [];
  emptyGuid = '00000000-0000-0000-0000-000000000000'; // Used for creating a new tier when sending to api
  selectedPipe: PipeCreate | null = null;
  selectedEquipment: EquipmentCreate | null = null;
  selectedPipeDefinition: PipeDefinition | null = null;
  selectedEquipmentDefinition: EquipmentDefinition | null = null;

  formDirective: any;

  // displayedColumns: string[] = [
  //   'tallyNumber',
  //   'actions'
  // ];

  //  displayedColumns = ['quantity', 'lengthInMeters', 'rack', 'tier', 'pipeProperties', 'actions'];
  displayedColumns = ['pipeProperties', 'rackName', 'tierNumber', 'quantity', 'lengthInMeters', 'actions'];
  displayedColumnsEquipment = ['equipmentProperties', 'name', 'quantity', 'actions'];

  dataSourcePipe: MatTableDataSource<PipeCreate> = new MatTableDataSource<PipeCreate>;
  dataSourceEquipment: MatTableDataSource<EquipmentCreate> = new MatTableDataSource<EquipmentCreate>;

  registeredPipes: PipeCreate[] = [];
  registeredEquipment: EquipmentCreate[] = [];

  private destroy$ = new Subject<void>();

  racksWithTiers$: Observable<RackWithTier[] | null> = this.store.select(selectRacksWithTiers);
  equipmentRacks$: Observable<Rack[] | null> = this.store.select(selectEquipmentRacks);
  customersFullList$: Observable<Customer[] | null> = this.store.select(selectCustomersFullList);
  shopLocationList$: Observable<ShopLocation[] | null> = this.store.select(selectAllShopLocations);

  creatingTally$: Observable<Boolean> = this.store.select((selectCreatingTally));
  createdTally$: Observable<Tally | null> = this.store.select((selectCreatedTally));
  error$: Observable<HttpErrorResponse | null> = this.store.select((selectCreatingTallyError));

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.store.dispatch(actionGetCustomersFullList({ searchParams: null }));
    this.store.dispatch(actionGetRacksWithTiers());
    this.store.dispatch(actionGetShopLocations({ searchParams: null }));
    this.store.dispatch(actionGetEquipmentRacks());

    this.buildForm();
    this.dataSourcePipe = new MatTableDataSource(this.registeredPipes);
    this.dataSourceEquipment = new MatTableDataSource(this.registeredEquipment);


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

    this.equipmentRacks$.pipe(takeUntil(this.destroy$)).subscribe((racks) => {
      if (racks) {
        this.equipmentRacks = racks;
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
      rackEquipment: new FormControl(null, [Validators.required]),
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
      // Round to 3 decimal places
      // .toFixed(3) rounds the result to three decimal places as a string, parseFloat() converts the string back to a number with the rounding intact.
      pipe.lengthInFeet = parseFloat((pipe.lengthInMeters * 3.280839895).toFixed(3));
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

    //Loop through registered equipment and set the customer id and shop location id
    this.registeredEquipment.forEach(equipment => {
      equipment.customerId = this.tallyAddForm.get('customer')?.value;
      equipment.shopLocationId = this.tallyAddForm.get('shopLocation')?.value;
      equipment.lengthInFeet = parseFloat((equipment.lengthInMeters * 3.280839895).toFixed(3));
    });

    const newTally: DtoTallyCreate = {
      tallyNumber: this.tallyAddForm.get('tallyNumber')?.value,
      shopLocationId: this.tallyAddForm.get('shopLocation')?.value,
      tallyType: this.tallyAddForm.get('tallyType')?.value,
      dateOfCreation: new Date(this.tallyAddForm.get('dateOfCreation')?.value).toISOString(),
      notes: this.tallyAddForm.get('notes')?.value,
      invoiceNumber: this.tallyAddForm.get('invoiceNumber')?.value,
      carrierName: this.tallyAddForm.get('carrierName')?.value,
      tierWithPipeList: tiersWithPipe,
      customerId: this.tallyAddForm.get('customer')?.value,
      talliedByUserId: 'B3CFC44C-879B-43EF-B6F0-02FA0D232430', // Not used in backend, dummy data
      equipmentList: this.registeredEquipment
    };

    this.isInit = false;

    // show console.log for all values of the tallyCreate object:
    console.log("Tally Number: " + newTally.tallyNumber);
    console.log("Shop Location ID: " + newTally.shopLocationId);
    console.log("Tally Type: " + newTally.tallyType);
    console.log("Date of Creation: " + newTally.dateOfCreation);
    console.log("Notes: " + newTally.notes);
    console.log("Invoice Number: " + newTally.invoiceNumber);
    console.log("Carrier Name: " + newTally.carrierName);
    console.log("Customer ID: " + newTally.customerId);
    console.log("Tallied By User ID: " + newTally.talliedByUserId);

    //Loop through and display all the tierList values
    newTally.tierWithPipeList!.forEach(tier => {
      console.log("Tier ID: " + tier.tierId);
      tier.pipeList.forEach(pipe => {
        console.log("---Pipe Definition ID: " + pipe.pipeDefinitionId);
        console.log("---Tier ID: " + pipe.tierId);
        console.log("---Rack ID: " + pipe.rackId);
        console.log("---Tier Number: " + pipe.tierNumber);
        console.log("---Rack Name: " + pipe.rackName);
        console.log("---Customer ID: " + pipe.customerId);
        console.log("---Length in Meters: " + pipe.lengthInMeters);
        console.log("---Length in Feet: " + pipe.lengthInFeet);
        console.log("---Quantity: " + pipe.quantity);
        console.log("---Index of Pipe: " + pipe.indexOfPipe);
      });
    });

    //Loop through and display all the equipmentList values
    newTally.equipmentList!.forEach(equipment => {
      //Show concatenated category, grade, size of equipmentDefinition
      console.log("Equipment: " + equipment.equipmentDefinition!.category + " " + equipment.equipmentDefinition!.grade!.name + " " + equipment.equipmentDefinition!.size!.sizeMetric + "(mm)/" + equipment.equipmentDefinition!.size!.sizeImperial + "(in)");
      console.log("---Rack ID: " + equipment.rackId);
      console.log("---Rack Name: " + equipment.rackName);
      console.log("---Equipment Definition ID: " + equipment.equipmentDefinitionId);
      console.log("---Customer ID: " + equipment.customerId);
      console.log("---Shop Location ID: " + equipment.shopLocationId);
      console.log("---Quantity: " + equipment.quantity);
      console.log("---Length in Meters: " + equipment.lengthInMeters);
      console.log("---Length in Feet: " + equipment.lengthInFeet);
    });

    this.store.dispatch(actionCreateTally({ tallyCreate: newTally }));
  }

  addPipe(formDirective: any) {
    if (this.selectedPipe)
      return;

    this.pipeDefinitionList.find(p => p.pipeDefinitionId === this.pipeAddForm.get('pipeDefinition')?.value)

    if (!this.pipeAddForm.invalid) {
      var selectedRack : RackWithTier | undefined = this.racksWithTiers.find(r => r.rackId === this.pipeAddForm.get('rack')?.value.rackId);

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

      if(pipeCount + this.pipeAddForm.get('quantity')?.value > selectedRack!.jointsPerTier){
        //show message card that the tier is full
        this.showSnackBar("Tier is full. Please select a new tier or rack.", 'Close', { duration:5000, panelClass: ['error-snack-bar'] });
        return;
      }
      const newPipe: PipeCreate = {
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

  updatePipe() {

    const newPipe: PipeCreate = {
      pipeDefinitionId: this.pipeAddForm.get('pipeDefinition')?.value,
      tierId: this.pipeAddForm.get('tier')?.value.tierId,
      rackId: this.pipeAddForm.get('rack')?.value.rackId,
      tierNumber: this.pipeAddForm.get('tier')?.value.number,
      rackName: this.pipeAddForm.get('rack')?.value.name,
      customerId: this.tallyAddForm.get('customer')?.value,
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

  removeEquipment(row: any) {
    this.registeredEquipment = this.registeredEquipment.filter(equipment => equipment !== row);
    this.dataSourceEquipment.data = this.registeredEquipment;
  }

  onRackChange(event: MatSelectChange) {
    console.log("RACK ID: " + event.value.rackId);

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


  tierDisplay(tier: TierWithPipeInfo) {

    if (tier.tierId === this.emptyGuid)
      return 'New Tier'

    return tier.number + " (#Pipe: " + tier.pipeCount + ")";
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
        this.selectedEquipmentDefinition = selectedEquipmentDefinition;

      }
      console.log('The dialog was closed');
      // Additional actions can be performed here with the selected equipment definition
    });
  }

  showSnackBar(message: string, action: string = 'Close', config: any = { duration: 5000, panelClass: ['snack-bar'] }) {
    this.snackBar.open(message, action, config);
  }
}
