import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopLocation } from '../../models/shop-location.model';
import { Rack } from '../../models/rack.model';

@Component({
  selector: 'app-view-details-rack',
  templateUrl: './view-details-rack.component.html',
  styleUrls: ['./view-details-rack.component.scss']
})
export class ViewDetailsRackComponent implements OnInit {

  editRackForm!: FormGroup;
  editMode: boolean = false;
  editToolTip: string = 'Edit Rack';

  // Todo: get this from the store
  shops: ShopLocation[] = [
    // {
    //   shopLocationId: '1',
    //   shopLocationName: 'Shop 1'
    // },
    // {
    //   shopLocationId: '2',
    //   shopLocationName: 'Shop 2'
    // },
    // {
    //   shopLocationId: '3',
    //   shopLocationName: 'Shop 3'
    // },
  ];

  // Todo: get this from the store
  rack: Rack = {} as Rack;

  constructor() { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.editRackForm = new FormGroup({
      name: new FormControl(this.rack.name, [Validators.required]),
      shop: new FormControl(this.shops[0].shopLocationId, [Validators.required])
    });
  }

  updateRack() {
    console.log('update rack');
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.editToolTip = this.editMode ? 'Cancel' : 'Edit Rack';
  }

}
