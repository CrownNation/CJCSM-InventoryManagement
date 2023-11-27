import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { ShopLocation } from '../../models/shop.model';
import { Customer } from '../../models/customer.model';
import { TallyTypes } from '../../models/tally.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tally-add',
  templateUrl: './tally-add.component.html',
  styleUrls: ['./tally-add.component.scss']
})
export class TallyAddComponent {

  tallyAddForm!: FormGroup;

  shops: ShopLocation[] = [];
  customers: Customer[] = [];
  tallyTypes = Object.values(TallyTypes).filter(value => typeof value === 'number') as number[];

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<TallyAddComponent>)  {
  }

  ngOnInit(): void {    
    this.buildForm();
  }

  buildForm() {
    this.tallyAddForm = new FormGroup({
      tallyNumber: new FormControl(null, [Validators.required]), 
      customer: new FormControl(null, [Validators.required]),
      shopLocation: new FormControl(null, [Validators.required]),
      tallyType: new FormControl(TallyTypes.TallyIn, [Validators.required]),
      dateOfCreation: new FormControl(new Date(), [Validators.required]),
      notes: new FormControl(null),
      invoiceNumber: new FormControl(null),
      talliedByUserId: new FormControl(null, [Validators.required]), // Todo: this should be handled by the api and get the current user from the token
      carrierName: new FormControl(null, [Validators.required]),
      pipeList: new FormControl(null, [Validators.required]),      
    });
  }

  addTally() {
    console.log('add tally');
  }


  closeDialog(): void {
    this.dialogRef.close();
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


}
