import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { ShopLocation } from '../../models/shop.model';
import { Customer } from '../../models/customer.model';
import { TallyType } from '../../models/tally.model';

@Component({
  selector: 'app-tally-add',
  templateUrl: './tally-add.component.html',
  styleUrls: ['./tally-add.component.scss']
})
export class TallyAddComponent {

  addTallyForm!: FormGroup;

  shops: ShopLocation[] = [
    {
      shopLocationId: '1',
      shopLocationName: 'Shop 1'
    },
    {
      shopLocationId: '2',
      shopLocationName: 'Shop 2'
    },
    {
      shopLocationId: '3',
      shopLocationName: 'Shop 3'
    },
  ];

  customers: Customer[] = [];
  tallyTypes = Object.values(TallyType);

  constructor(
    private router: Router,
    private store: Store<AppState>)  {
  }

  ngOnInit(): void {    
    this.buildForm();
  }

  buildForm() {
    this.addTallyForm = new FormGroup({
      tallyType: new FormControl(TallyType.TallyIn, [Validators.required]),
      tallyNumber: new FormControl(null, [Validators.required]), 
      shopLocation: new FormControl(null, [Validators.required]),
      shipTo: new FormControl(null, [Validators.required]),
      shipFrom: new FormControl(null, [Validators.required]),
      consultantName: new FormControl(null, [Validators.required]),
      landLocation: new FormControl(null, [Validators.required]),
      via: new FormControl(null, [Validators.required]),
      rack: new FormControl(null, [Validators.required]),
    });
  }

  addRack() {
    console.log('add tally');
    // this.router.navigate([`/rack/someRackId`]);
  }


}
