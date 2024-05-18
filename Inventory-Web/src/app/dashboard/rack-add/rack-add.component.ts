import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { MatDialogRef } from '@angular/material/dialog';
import { Rack, RackCreate } from '../../models/rack.model';
import { actionCreateRack } from '../../store/rack/rack.actions';
import { ShopLocation } from '../../models/shop.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectCreatedRack, selectCreatedRackError, selectCreatingRack, selectShopLocations } from '../../store/rack/rack.selectors';
import { NotificationService } from '../../core/notifications/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

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
  shopsFullList$: Observable<ShopLocation[] | null> = this.store.select(selectShopLocations);
  creatingRack$: Observable<Boolean> = this.store.select((selectCreatingRack));
  createdRack$: Observable<Rack | null> = this.store.select((selectCreatedRack));
  error$: Observable<HttpErrorResponse | null> = this.store.select((selectCreatedRackError));

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<RackAddComponent>,
    private notificationService: NotificationService)  {
  }

  ngOnInit(): void {
    this.buildForm();

    this.shopsFullList$.pipe(takeUntil(this.destroy$)).subscribe((shops) => {
      if (shops) {
        this.shops = shops;
      }
    });

    this.error$.subscribe((error) => {
      if(error) {
        console.error(error);
        this.error = error;
        this.notificationService.success('There was a problem creating the customer. ');
      }
    });

    this.createdRack$.subscribe((rack) => {

      if(rack && !this.isInit) {
        this.notificationService.success('Rack Created Successfully');
        this.dialogRef.close();
      }
    });

    this.creatingRack$.subscribe((loading) => {
      this.loading = loading;
    });

  }


  buildForm() {
    this.rackAddForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      shopLocation: new FormControl(null, [Validators.required]),
      jointsPerTier: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
    });
  }

  addRack() {

    if(this.rackAddForm.valid) {

      const rackCreate: RackCreate = {
        name: this.rackAddForm.value.name,
        shopLocationId: 'A671AF6A-8AA7-4D49-B08B-88003ADCA01C', //this.rackAddForm.value.shopLocation,
        isActive: true,
        description: this.rackAddForm.value.description,
        jointsPerTier: this.rackAddForm.value.jointsPerTier,
        rackType: this.rackAddForm.value.rackType
      }

      this.isInit = false;
      this.store.dispatch(actionCreateRack({ rackCreate }));
    }
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

}

