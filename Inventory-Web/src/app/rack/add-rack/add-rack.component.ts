import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/core.state';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopLocation } from '../../models/shop-location.model';
import { Router } from '@angular/router';
import { actionCreateRack } from '../../store/rack/rack.actions';
import { RackCreate } from '../../models/rack.model';

@Component({
  selector: 'app-add-rack',
  templateUrl: './add-rack.component.html',
  styleUrls: ['./add-rack.component.scss']
})
export class AddRackComponent implements OnInit {

  addRackForm!: FormGroup;

  shops: ShopLocation[] = [
    // {
    //   shopLocationId: 'DAB952D4-FDB5-4711-AEEC-668526075124',
    //   name: 'Shop 1'
    // },
    // {
    //   shopLocationId: '0D0D449E-5941-4652-B45C-3826D7D3A1A9',
    //   shopLocationName: 'Shop 2'
    // },
    // {
    //   shopLocationId: 'C4776E09-EC7E-45E0-B77A-F3D07D6D0987',
    //   shopLocationName: 'Shop 3'
    // },
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
    // this.router.navigate([`/rack/someRackId`]);

    if(this.addRackForm.valid) {
      console.log('form valid');
      console.log(this.addRackForm.value);

      // this.store.dispatch(actionCreateRack({
      //   rackCreate: {
      //     name: this.addRackForm.value.name,
      //     shopLocationId: this.addRackForm.value.shop,
      //     isActive: true
      //   }
      // }));
    } else {
      console.log('form invalid');
      console.log(this.addRackForm.value);
      this.addRackForm.markAllAsTouched();
    }

  }


}
