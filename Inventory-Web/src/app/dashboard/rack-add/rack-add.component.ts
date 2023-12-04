import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { MatDialogRef } from '@angular/material/dialog';
import { RackCreate } from '../../models/rack.model';
import { actionCreateRack } from '../../store/rack/rack.actions';
import { ShopLocation } from '../../models/shop.model';

@Component({
  selector: 'app-rack-add',
  templateUrl: './rack-add.component.html',
  styleUrls: ['./rack-add.component.scss']
})
export class RackAddComponent {

  rackAddForm!: FormGroup;

  shopsFullList: ShopLocation[] = [];
  // shopsFullList$: Observable<ShopLocation[] | null> = this.store.select(selectShopssFullList);

  // Todo: Handle errors on this and closing form with the closing on success

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<RackAddComponent>)  {
  }

  ngOnInit(): void {
    this.buildForm();

    // this.shopsFullList$.pipe(takeUntil(this.destroy$)).subscribe((shops) => {
    //   if (shops) {
    //     this.shopsFullList = shops;
    //   }
    // });

  }

  buildForm() {
    this.rackAddForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      shopLocation: new FormControl(null, [Validators.required]),
      jointsPerRack: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
    });
  }

  addRack() {
    console.log('add rack');

    if(this.rackAddForm.valid) {

      const rackCreate: RackCreate = {
        name: this.rackAddForm.value.name,
        shopLocationId: 'A671AF6A-8AA7-4D49-B08B-88003ADCA01C', //this.rackAddForm.value.shopLocation,
        isActive: true,
        description: this.rackAddForm.value.description,
        jointsPerRack: this.rackAddForm.value.jointsPerRack
      }
      console.log(rackCreate);

      this.store.dispatch(actionCreateRack({ rackCreate }));
      this.dialogRef.close();

    }
    else {
      this.rackAddForm.markAllAsTouched();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}

