import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { ShopLocation } from '../../models/shop-location.model';
import { Customer } from '../../models/customer.model';
import { DtoTallyCreate, DtoTierWithPipe, Tally } from '../../models/tally.model';
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
import { TallyPipeInComponent } from '../tally-pipe-in/tally-pipe-in.component';
import { TallyEquipmentInComponent } from '../tally-equipment-in/tally-equipment-in.component';
import { TallyTypes } from 'src/app/enums/tally-types.enum';
import { TallyPipeOutComponent } from '../tally-pipe-out/tally-pipe-out.component';
import { TallyEquipmentOutComponent } from '../tally-equipment-out/tally-equipment-out.component';

@Component({
  selector: 'app-tally-add',
  templateUrl: './tally-add.component.html',
  styleUrls: ['./tally-add.component.scss']
})
export class TallyAddComponent {
  @ViewChild('tallyPipeInRef') tallyPipeInComponent!: TallyPipeInComponent;
  @ViewChild('tallyPipeOutRef') tallyPipeOutComponent!: TallyPipeOutComponent;

  @ViewChild('tallyEquipmentInRef') tallyEquipmentInComponent!: TallyEquipmentInComponent;
  @ViewChild('tallyEquipmentOutRef') tallyEquipmentOutComponent!: TallyEquipmentOutComponent;

  tallyAddForm!: FormGroup;

  isInit: boolean = true;
  loading: Boolean = true;
  error: HttpErrorResponse | null = null;


  shops: ShopLocation[] = [];
  customers: Customer[] = [];
  public TallyTypes = TallyTypes;

  public tallyType: TallyTypes = TallyTypes.In;  // Example use of the enum

  customersFullList: Customer[] = [];
  shopLocations: ShopLocation[] = [];
  tiers: TierWithPipeInfo[] = [];
  emptyGuid = '00000000-0000-0000-0000-000000000000'; // Used for creating a new tier when sending to api


  private destroy$ = new Subject<void>();

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
    this.store.dispatch(actionGetShopLocations({ searchParams: null }));

    this.buildForm();

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
      tallyType: new FormControl(TallyTypes.In, [Validators.required]),
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

    var pipeList: PipeCreate[] = [];

    if (this.tallyType === TallyTypes.Out)
      pipeList = this.tallyPipeOutComponent.getPipeForTallyOutList();
    else
      pipeList = this.tallyPipeInComponent.getPipeList();

    pipeList.forEach(pipe => {
      // 1 meter is equal to 3.280839895 feet
      // Round to 3 decimal places
      // .toFixed(3) rounds the result to three decimal places as a string, parseFloat() converts the string back to a number with the rounding intact.
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

    var equipmentList: EquipmentCreate[] = [];

    if (this.tallyType === TallyTypes.Out)
      equipmentList = this.tallyEquipmentOutComponent.getEquipmentList();
    else
      equipmentList = this.tallyEquipmentInComponent.getEquipmentList();


    //Loop through registered equipment and set the customer id and shop location id
    equipmentList.forEach(equipment => {
      equipment.customerId = this.tallyAddForm.get('customer')?.value;
      equipment.shopLocationId = this.tallyAddForm.get('shopLocation')?.value;
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
      equipmentList: equipmentList
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

  close(): void {
    this.router.navigate(['/dashboard']);
  }

  get tallyTypeOptions(): TallyTypes[] {
    return Object.values(TallyTypes);
  }

  displayTallyType(tallyType: TallyTypes) {
    if (tallyType === TallyTypes.In) {
      return 'In'
    }
    else if (tallyType === TallyTypes.Out) {
      return 'Out'
    }

    return ''
  }

  onTallyTypeChange(event: MatSelectChange): void {
    this.tallyType = event.value;
    console.log("TALLY TYPE: " + this.tallyType);
  }

  cancelEdit() {

  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }




  showSnackBar(message: string, action: string = 'Close', config: any = { duration: 5000, panelClass: ['snack-bar'] }) {
    this.snackBar.open(message, action, config);
  }
}
