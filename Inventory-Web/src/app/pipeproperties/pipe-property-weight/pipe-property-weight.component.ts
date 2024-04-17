import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, combineLatest, Subscription } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { PipeProperty_Weight } from 'src/app/models/pipe.model';
import { AppState } from '../../store/core.state';

import {
  selectAllWeights,
  selectCreatingWeightError,
  selectErrorLoadingWeights,
  selectLoadingWeights,
  selectSelectedWeightError,
  selectCreatedWeight,
  selectUpdatedWeight
} from 'src/app/store/pipe-properties/pipe-property-weight/pipe-property-weight.selectors';
import {
  actionCreatePipeProperty_Weight,
  actionGetWeights,
  actionUpdatePipeProperty_Weight,
  resetWeightNotifications,
} from 'src/app/store/pipe-properties/pipe-property-weight/pipe-property-weight.actions';

@Component({
  selector: 'app-pipe-property-weight',
  templateUrl: './pipe-property-weight.component.html',
  styleUrls: ['./pipe-property-weight.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PipePropertyWeightComponent implements OnInit, OnDestroy {

  loadingWeightsSubscription: Subscription | undefined;

  dataSource: MatTableDataSource<PipeProperty_Weight>;
  displayedColumns: string[] = ['weightInKgPerMeter', 'weightInLbsPerFoot', 'isActive', 'actions'];
  weightForm: FormGroup;
  editingWeight: PipeProperty_Weight | null = null;
  loadingWeights$: Observable<boolean> | undefined;
  private destroy$ = new Subject<void>();

  errorMessage$: Observable<string>;
  isWeightCreated$: Observable<boolean>;
  isWeightUpdated$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.weightForm = this.fb.group({
      weightInKgPerMeter: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,3})?$/)]], // Corrected form control name
      weightInLbsPerFoot: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,3})?$/)]], // Corrected form control name
      isActive: [true, Validators.required]
    });
    this.dataSource = new MatTableDataSource<PipeProperty_Weight>([]);

    this.errorMessage$ = combineLatest([
      this.store.select(selectErrorLoadingWeights),
      this.store.select(selectCreatingWeightError),
      this.store.select(selectSelectedWeightError)
    ]).pipe(
      map(([loadingError, creatingError, selectedError]) => loadingError || creatingError || selectedError ? "An error occurred" : '')
    );

    this.isWeightCreated$ = this.store.select(selectCreatedWeight).pipe(map(weight => !!weight));
    this.isWeightUpdated$ = this.store.select(selectUpdatedWeight).pipe(map(weight => !!weight));
  }

  ngOnInit(): void {
    this.loadingWeights$ = this.store.select(selectLoadingWeights);
    this.store.dispatch(actionGetWeights({ searchParams: null }));
    this.store.pipe(
      select(selectAllWeights),
      takeUntil(this.destroy$)
    ).subscribe(weights => this.dataSource.data = weights);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.loadingWeightsSubscription) {
      this.loadingWeightsSubscription.unsubscribe();
    }
    this.checkAndResetNotifications();
  }

selectWeight(weight: PipeProperty_Weight): void {
  this.editingWeight = weight;
  this.weightForm.patchValue({
    weightInKgPerMeter: weight.weightInKgPerMeter, // Corrected property name
    weightInLbsPerFoot: weight.weightInLbsPerFoot, // Corrected property name
    isActive: weight.isActive
  });
  this.checkAndResetNotifications();
}  

  checkAndResetNotifications(): void {
    combineLatest([
      this.store.select(selectCreatedWeight),
      this.store.select(selectUpdatedWeight),
      this.store.select(selectErrorLoadingWeights),
      this.store.select(selectCreatingWeightError),
      this.store.select(selectSelectedWeightError)
    ]).pipe(
      take(1)
    ).subscribe(([created, updated, loadingError, creatingError, selectedError]) => {
      if (created || updated || loadingError || creatingError || selectedError) {
        this.store.dispatch(resetWeightNotifications());
      }
    });
  }

  saveOrUpdateWeight(): void {
    if (this.editingWeight) {
      const weightId = this.editingWeight.pipeProperty_WeightId;
      const weightUpdate = {
        ...this.editingWeight,
        ...this.weightForm.value
      };
      this.store.dispatch(actionUpdatePipeProperty_Weight({ id: weightId, weight: weightUpdate }));
    } else {
      this.store.dispatch(actionCreatePipeProperty_Weight({ weightCreate: this.weightForm.value }));
    }
    this.resetForm();
  }
  

  resetForm(): void {
    this.editingWeight = null;
    this.weightForm.reset({ weightMetric: '', weightImperial: '', isActive: true });
    this.checkAndResetNotifications();
  }
}
