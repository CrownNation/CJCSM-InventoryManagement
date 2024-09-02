import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Rack, RackCreate } from '../../models/rack.model';
import { actionCreateRack } from '../../store/rack/rack.actions';
import { ShopLocation } from '../../models/shop-location.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectCreatedRack, selectCreatedRackError, selectCreatingRack } from '../../store/rack/rack.selectors';
import { NotificationService } from '../../core/notifications/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { selectAllShopLocations } from 'src/app/store/shop-location/shop-location.selectors';
import { RackTypes } from 'src/app/enums/rack-types.enum';

@Component({
  selector: 'app-rack-add',
  templateUrl: './rack-add.component.html',
  styleUrls: ['./rack-add.component.scss'],

})
export class RackAddComponent implements OnInit, OnDestroy {

  rackAddForm!: FormGroup;
  isInit: boolean = true;
  loading: Boolean = true;
  error: HttpErrorResponse | null = null;

  private destroy$ = new Subject<void>();
  shops: ShopLocation[] = [];
  shopsFullList$: Observable<ShopLocation[] | null> = this.store.select(selectAllShopLocations);
  creatingRack$: Observable<Boolean> = this.store.select((selectCreatingRack));
  createdRack$: Observable<Rack | null> = this.store.select((selectCreatedRack));
  error$: Observable<HttpErrorResponse | null> = this.store.select((selectCreatedRackError));

  // To hold rack options from the RackTypes enum
  rackTypeOptions: string[] = [];

  existingRack: Rack | null = null; // To hold the passed rack data if any

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<RackAddComponent>,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: { rack?: Rack } // Inject the data passed from the parent
  ) {
    this.existingRack = data.rack || null; // Assign the rack data if provided
  }

  ngOnInit(): void {
    this.buildForm();

    this.rackTypeOptions = Object.values(RackTypes);

    this.shopsFullList$.pipe(takeUntil(this.destroy$)).subscribe((shops) => {
      if (shops) {
        this.shops = shops;
      }
    });

    this.error$.subscribe((error) => {
      if (error) {
        console.error(error);
        this.error = error;
        this.notificationService.error('There was a problem creating the rack. ');
      }
    });

    this.createdRack$.subscribe((rack) => {

      if (rack && !this.isInit) {
        this.notificationService.success('Rack Created Successfully');
        this.dialogRef.close();
      }
    });

    this.creatingRack$.subscribe((loading) => {
      this.loading = loading;
    });
    if (this.existingRack) {
      this.populateForm(this.existingRack);
    }
  }


  buildForm() {
    this.rackAddForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      shopLocation: new FormControl(null, [Validators.required]),
      jointsPerTier: new FormControl(null, [Validators.required]),
      rackType: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
    });
  }

  addRack() {

    if (this.rackAddForm.valid) {

      const rackCreate: RackCreate = {
        name: this.rackAddForm.value.name,
        shopLocationId: this.rackAddForm.get('shopLocation')?.value,
        isActive: true,
        description: this.rackAddForm.value.description,
        jointsPerTier: this.rackAddForm.value.jointsPerTier,
        rackType: this.rackAddForm.value.rackType
      }

      this.isInit = false;
      if (this.existingRack) {
        // Call update action instead of create
        //this.store.dispatch(actionUpdateRack({ rackId: this.existingRack.rackId, rackUpdate: rackCreate }));
      } else {
        this.store.dispatch(actionCreateRack({ rackCreate }));
      }    }
    else {
      this.rackAddForm.markAllAsTouched();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  populateForm(rack: Rack) {
    this.rackAddForm.patchValue({
      name: rack.name,
      shopLocation: rack.shopLocationId,
      jointsPerTier: rack.jointsPerTier,
      rackType: rack.rackType,
      description: rack.description,
    });
  }



}

