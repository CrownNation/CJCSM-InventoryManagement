import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, Subscription, combineLatest } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { PipeProperty_Range } from 'src/app/models/pipe.model';
import { AppState } from '../../store/core.state';

import {
  selectAllRanges,
  selectCreatingRangeError,
  selectErrorLoadingRanges,
  selectLoadingRanges,
  selectSelectedRangeError,
  selectCreatedRange,
  selectUpdatedRange
} from 'src/app/store/pipe-properties/pipe-property-range/pipe-property-range.selectors';
import {
  actionCreatePipeProperty_Range,
  actionGetRanges,
  actionUpdatePipeProperty_Range,
  resetRangeNotifications,
} from 'src/app/store/pipe-properties/pipe-property-range/pipe-property-range.actions';

@Component({
  selector: 'app-pipe-property-range',
  templateUrl: './pipe-property-range.component.html',
  styleUrls: ['./pipe-property-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PipePropertyRangeComponent implements OnInit, OnDestroy {

  loadingRangesSubscription: Subscription | undefined;

  dataSource: MatTableDataSource<PipeProperty_Range>;
  displayedColumns: string[] = ['name', 'isActive', 'actions'];
  rangeForm: FormGroup;
  editingRange: PipeProperty_Range | null = null;
  loadingRanges$: Observable<boolean> | undefined;
  private destroy$ = new Subject<void>();

  errorMessage$: Observable<string>;
  isRangeCreated$: Observable<boolean>;
  isRangeUpdated$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.rangeForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true, Validators.required]
    });
    this.dataSource = new MatTableDataSource<PipeProperty_Range>([]);

    this.errorMessage$ = combineLatest([
      this.store.select(selectErrorLoadingRanges),
      this.store.select(selectCreatingRangeError),
      this.store.select(selectSelectedRangeError)
    ]).pipe(
      map(([loadingError, creatingError, selectedError]) => loadingError || creatingError || selectedError ? "An error occurred" : '')
    );

    this.isRangeCreated$ = this.store.select(selectCreatedRange).pipe(map(range => !!range));
    this.isRangeUpdated$ = this.store.select(selectUpdatedRange).pipe(map(range => !!range));
  }

  ngOnInit(): void {
    this.loadingRanges$ = this.store.select(selectLoadingRanges);
    this.store.dispatch(actionGetRanges({ searchParams: null }));
    this.store.pipe(
      select(selectAllRanges),
      takeUntil(this.destroy$)
    ).subscribe(ranges => this.dataSource.data = ranges);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.loadingRangesSubscription) {
      this.loadingRangesSubscription.unsubscribe();
    }
    this.checkAndResetNotifications();
  }

  selectRange(range: PipeProperty_Range): void {
    this.editingRange = range;
    this.rangeForm.patchValue(range);
    this.checkAndResetNotifications();
  }

  //Checks for any notifications present, if there are any, reset them.
  checkAndResetNotifications(): void {
    combineLatest([
      this.store.select(selectCreatedRange),
      this.store.select(selectUpdatedRange),
      this.store.select(selectErrorLoadingRanges),
      this.store.select(selectCreatingRangeError),
      this.store.select(selectSelectedRangeError)
    ]).pipe(
      take(1)
    ).subscribe(([created, updated, loadingError, creatingError, selectedError]) => {
      if (created || updated || loadingError || creatingError || selectedError) {
        this.store.dispatch(resetRangeNotifications());
      }
    });
  }

  saveOrUpdateRange(): void {
    if (this.editingRange) {
      const rangeId = this.editingRange.pipeProperty_RangeId;
      const rangeUpdate = {
        ...this.editingRange,
        ...this.rangeForm.value
      };
      this.store.dispatch(actionUpdatePipeProperty_Range({ id: rangeId, range: rangeUpdate }));
    } else {
      this.store.dispatch(actionCreatePipeProperty_Range({ rangeCreate: this.rangeForm.value }));
    }
    this.resetForm();
  }

  resetForm(): void {
    this.editingRange = null;
    this.rangeForm.reset({ name: '', isActive: true });
    this.checkAndResetNotifications();
  }
}
