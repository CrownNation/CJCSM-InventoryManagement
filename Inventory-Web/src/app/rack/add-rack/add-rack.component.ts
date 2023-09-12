import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/core.state';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopLocation } from '../../models/shop.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-rack',
  templateUrl: './add-rack.component.html',
  styleUrls: ['./add-rack.component.scss']
})
export class AddRackComponent implements OnInit {

  addRackForm!: FormGroup;
  
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

  constructor(
    private router: Router,
    private store: Store<AppState>)  {
  }

  ngOnInit(): void {    
    this.buildForm();
  }

  buildForm() {
    this.addRackForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      shop: new FormControl('', [Validators.required])
    });
  }

  addRack() {
    console.log('add rack');
    this.router.navigate([`/rack/someRackId`]);
  }


}
