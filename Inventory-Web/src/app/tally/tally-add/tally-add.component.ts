import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { ShopLocation } from '../../models/shop.model';
import { Customer } from '../../models/customer.model';
import { DtoPipeCreate, DtoTallyCreate, DtoTierWithPipe, TallyTypes } from '../../models/tally.model';
import { actionGetCustomersFullList } from '../../store/customer/customer.actions';
import { actionGetRacksWithTiers, actionGetShopLocations } from '../../store/rack/rack.actions';
import { actionGetPipeDefinitionsList } from '../../store/pipe/pipe.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RackWithTier, TierWithPipeInfo } from '../../models/rack.model';
import { selectRacksWithTiers, selectShopLocations } from '../../store/rack/rack.selectors';
import { selectCustomersFullList } from '../../store/customer/customer.selectors';
import { PipeDefinition } from '../../models/pipe.model';
import { selectPipeDefinitionsList } from '../../store/pipe/pipe.selectors';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { actionCreateTally } from '../../store/tally/tally.actions';

@Component({
  selector: 'app-tally-add',
  templateUrl: './tally-add.component.html',
  styleUrls: ['./tally-add.component.scss']
})
export class TallyAddComponent {

  tallyAddForm!: FormGroup;
  pipeAddForm!: FormGroup;

  shops: ShopLocation[] = [];
  customers: Customer[] = [];
  tallyTypes = Object.values(TallyTypes).filter(value => typeof value === 'number') as number[];
  racksWithTiers: RackWithTier[] = [];
  customersFullList: Customer[] = [];
  pipeDefinitionList: PipeDefinition[] = [];
  shopLocations: ShopLocation[] = [];
  tiers: TierWithPipeInfo[] = [];
  emptyGuid = '00000000-0000-0000-0000-000000000000';
  selectedPipe: DtoPipeCreate | null = null;
  formDirective: any;

  displayedColumns: string[] = [
    'tallyNumber',
    'actions'
  ];
  dataSource: MatTableDataSource<DtoPipeCreate> = new MatTableDataSource<DtoPipeCreate>;
  registeredPipes: DtoPipeCreate[] = [];

  private destroy$ = new Subject<void>();

  racksWithTiers$: Observable<RackWithTier[] | null> = this.store.select(selectRacksWithTiers);
  customersFullList$: Observable<Customer[] | null> = this.store.select(selectCustomersFullList);
  pipeDefinitionsList$: Observable<PipeDefinition[] | null> = this.store.select(selectPipeDefinitionsList);
  shopLocationList$: Observable<ShopLocation[] | null> = this.store.select(selectShopLocations);


  constructor(
    private store: Store<AppState>,
    private router: Router)  {
  }

  ngOnInit(): void {
    this.store.dispatch(actionGetCustomersFullList({ searchParams: null }));
    this.store.dispatch(actionGetRacksWithTiers());
    this.store.dispatch(actionGetPipeDefinitionsList({ searchParams: null }));
    this.store.dispatch(actionGetShopLocations());

    this.buildForm();
    this.dataSource = new MatTableDataSource(this.registeredPipes);

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

    this.pipeDefinitionsList$.pipe(takeUntil(this.destroy$)).subscribe((pipDefinitions) => {
      if (pipDefinitions) {
        this.pipeDefinitionList = pipDefinitions;
      }
    });

    this.shopLocationList$.pipe(takeUntil(this.destroy$)).subscribe((shopLocations) => {
      if (shopLocations) {
        this.shopLocations = shopLocations;
      }
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
      lengthInMeters: new FormControl(null, [Validators.required]),
      // lengthInFeet: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
    });
  }

  createTally() {
    console.log('add tally');

    if(this.tallyAddForm.invalid) {
      console.log('invalid form');
      this.tallyAddForm.markAllAsTouched();
      return;
    }

    console.log('valid form');

    console.log(this.registeredPipes);
    const tiersWithPipe: DtoTierWithPipe[] = [];
    this.registeredPipes.forEach(pipe => {

      pipe.lengthInFeet = 0; // Dummy since this is calculated at the backend
      pipe.customerId = this.tallyAddForm.get('customer')?.value;
      const tier = tiersWithPipe.find(t => t.tierId === pipe.tierId);
      if(tier) {
        tier.pipeList.push(pipe);
      }
      else {
        tiersWithPipe.push({
          tierId: pipe.tierId,
          pipeList: [pipe]
        });
      }
    });

    console.log(tiersWithPipe);


    const newTally: DtoTallyCreate = {
      tallyNumber: this.tallyAddForm.get('tallyNumber')?.value,
      shopLocationId: this.tallyAddForm.get('shopLocation')?.value,
      tallyType: this.tallyAddForm.get('tallyType')?.value,
      dateOfCreation: this.tallyAddForm.get('dateOfCreation')?.value,
      notes: this.tallyAddForm.get('notes')?.value,
      invoiceNumber: this.tallyAddForm.get('invoiceNumber')?.value,
      carrierName: this.tallyAddForm.get('carrierName')?.value,
      tierList: tiersWithPipe,

      customerId: this.tallyAddForm.get('customer')?.value,
      talliedByUserId: 'B3CFC44C-879B-43EF-B6F0-02FA0D232430', // Not used in backend, dummy data
    };


    console.log(newTally);

    this.store.dispatch(actionCreateTally({ tallyCreate: newTally }));


  }

  addPipe(formDirective: any) {

    if(this.selectedPipe)
      return;


    if(!this.pipeAddForm.invalid ) {
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
      this.dataSource.data = this.registeredPipes;

      this.pipeAddForm.reset();
      formDirective.resetForm();
      this.formDirective = formDirective;
    }
    else{
      this.pipeAddForm.markAllAsTouched();
    }
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
    this.dataSource.data = this.registeredPipes;

    this.selectedPipe = null;

    this.pipeAddForm.reset();
    this.formDirective.resetForm();
  }

  cancelEdit(){
    this.selectedPipe = null;
    this.pipeAddForm.reset();
    this.formDirective.resetForm();
  }

  removePipe(row: any) {
    this.registeredPipes = this.registeredPipes.filter(pipe => pipe !== row);
    this.dataSource.data = this.registeredPipes;
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

    if(tier.tierId === this.emptyGuid)
      return 'New Tier'

    return tier.number;
  }

  close(): void {
    this.router.navigate(['/dashboard']);
  }

  displayTallyType(tallyType: number) {
    if(tallyType === TallyTypes.TallyIn) {
      return 'In'
    }
    else if(tallyType === TallyTypes.TallyOut) {
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


}
