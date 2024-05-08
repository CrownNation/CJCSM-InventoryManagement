import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, Subscription, combineLatest } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { PipeProperty_Coating } from 'src/app/models/pipe.model';
import { AppState } from '../../store/core.state';

import {
  selectAllCoatings,
  selectCreatingCoatingError,
  selectErrorLoadingCoatings,
  selectLoadingCoatings,
  selectSelectedCoatingError,
  selectCreatedCoating,
  selectUpdatedCoating
} from 'src/app/store/pipe-properties/pipe-property-coating/pipe-property-coating.selectors';
import {
  actionCreatePipeProperty_Coating,
  actionGetCoatings,
  actionUpdatePipeProperty_Coating,
  resetCoatingNotifications
} from 'src/app/store/pipe-properties/pipe-property-coating/pipe-property-coating.actions';

@Component({
  selector: 'app-pipe-property-coating',
  templateUrl: './pipe-property-coating.component.html',
  styleUrls: ['./pipe-property-coating.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PipePropertyCoatingComponent implements OnInit, OnDestroy {

  loadingCoatingsSubscription: Subscription | undefined;

  dataSource: MatTableDataSource<PipeProperty_Coating>;
  displayedColumns: string[] = ['name', 'isActive', 'actions'];
  coatingForm: FormGroup;
  editingCoating: PipeProperty_Coating | null = null;
  loadingCoatings$: Observable<boolean> | undefined;
  private destroy$ = new Subject<void>();

  errorMessage$: Observable<string>;
  isCoatingCreated$: Observable<boolean>;
  isCoatingUpdated$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.coatingForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true, Validators.required]
    });
    this.dataSource = new MatTableDataSource<PipeProperty_Coating>([]);

    this.errorMessage$ = combineLatest([
      this.store.select(selectErrorLoadingCoatings),
      this.store.select(selectCreatingCoatingError),
      this.store.select(selectSelectedCoatingError)
    ]).pipe(
      map(([loadingError, creatingError, updatingError]) => loadingError || creatingError || updatingError ? "An error occurred" : '')
    );

    this.isCoatingCreated$ = this.store.select(selectCreatedCoating).pipe(map(coating => !!coating));
    this.isCoatingUpdated$ = this.store.select(selectUpdatedCoating).pipe(map(coating => !!coating));
  }

  ngOnInit(): void {
    this.loadingCoatings$ = this.store.select(selectLoadingCoatings);
    this.store.dispatch(actionGetCoatings({ searchParams: null }));
    this.store.pipe(
      select(selectAllCoatings),
      takeUntil(this.destroy$)
    ).subscribe(coatings => this.dataSource.data = coatings);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.loadingCoatingsSubscription) {
      this.loadingCoatingsSubscription.unsubscribe();
    }
    this.checkAndResetNotifications();
  }

  selectCoating(coating: PipeProperty_Coating): void {
    this.editingCoating = coating;
    this.coatingForm.patchValue(coating);
    // Reset notifications when a new grade is selected
    this.checkAndResetNotifications();
  }

  //Checks for any notifications present, if there are any, reset them.
  checkAndResetNotifications(): void {
    combineLatest([
      this.store.select(selectCreatedCoating),
      this.store.select(selectUpdatedCoating),
      this.store.select(selectErrorLoadingCoatings),
      this.store.select(selectCreatingCoatingError),
      this.store.select(selectSelectedCoatingError)
    ]).pipe(
      take(1)
    ).subscribe(([created, updated, loadingError, creatingError, selectedError]) => {
      // Check if any of the states are truthy (i.e., there is either a success message or an error message)
      if (created || updated || loadingError || creatingError || selectedError) {
        this.store.dispatch(resetCoatingNotifications());
      }
    });
  }
  
  saveOrUpdateCoating(): void {
    if (this.editingCoating) {
      const coatingId = this.editingCoating.pipeProperty_CoatingId;
      const coatingUpdate = {
        ...this.editingCoating,
        ...this.coatingForm.value
      };
      this.store.dispatch(actionUpdatePipeProperty_Coating({ id: coatingId, coating: coatingUpdate }));
    } else {
      this.store.dispatch(actionCreatePipeProperty_Coating({ coatingCreate: this.coatingForm.value }));
    }
    this.resetForm();
  }

  resetForm(): void {
    this.editingCoating = null;
    this.coatingForm.reset({ name: '', isActive: true });
    this.checkAndResetNotifications();
  }

}
