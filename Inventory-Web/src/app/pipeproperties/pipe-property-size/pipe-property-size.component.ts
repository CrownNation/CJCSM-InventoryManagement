import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, Subscription, combineLatest } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { PipeProperty_Size } from 'src/app/models/pipe.model';
import { AppState } from '../../store/core.state';

import {
  selectAllSizes,
  selectCreatingSizeError,
  selectErrorLoadingSizes,
  selectLoadingSizes,
  selectSelectedSizeError,
  selectCreatedSize,
  selectUpdatedSize
} from 'src/app/store/pipe-properties/pipe-property-size/pipe-property-size.selectors';
import {
  actionCreatePipeProperty_Size,
  actionGetSizes,
  actionUpdatePipeProperty_Size,
  resetSizeNotifications,
} from 'src/app/store/pipe-properties/pipe-property-size/pipe-property-size.actions';

@Component({
  selector: 'app-pipe-property-size',
  templateUrl: './pipe-property-size.component.html',
  styleUrls: ['./pipe-property-size.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PipePropertySizeComponent implements OnInit, OnDestroy {

  loadingSizesSubscription: Subscription | undefined;

  dataSource: MatTableDataSource<PipeProperty_Size>;
  displayedColumns: string[] = ['sizeMetric', 'sizeImperial', 'isActive', 'actions'];
  sizeForm: FormGroup;
  editingSize: PipeProperty_Size | null = null;
  loadingSizes$: Observable<boolean> | undefined;
  private destroy$ = new Subject<void>();

  errorMessage$: Observable<string>;
  isSizeCreated$: Observable<boolean>;
  isSizeUpdated$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.sizeForm = this.fb.group({
      sizeMetric: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,3})?$/)]],
      sizeImperial: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,3})?$/)]],
      isActive: [true, Validators.required]
    });
    this.dataSource = new MatTableDataSource<PipeProperty_Size>([]);

    this.errorMessage$ = combineLatest([
      this.store.select(selectErrorLoadingSizes),
      this.store.select(selectCreatingSizeError),
      this.store.select(selectSelectedSizeError)
    ]).pipe(
      map(([loadingError, creatingError, selectedError]) => loadingError || creatingError || selectedError ? "An error occurred" : '')
    );

    this.isSizeCreated$ = this.store.select(selectCreatedSize).pipe(map(size => !!size));
    this.isSizeUpdated$ = this.store.select(selectUpdatedSize).pipe(map(size => !!size));
  }

  ngOnInit(): void {
    this.loadingSizes$ = this.store.select(selectLoadingSizes);
    this.store.dispatch(actionGetSizes({ searchParams: null }));
    this.store.pipe(
      select(selectAllSizes),
      takeUntil(this.destroy$)
    ).subscribe(sizes => this.dataSource.data = sizes);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.loadingSizesSubscription) {
      this.loadingSizesSubscription.unsubscribe();
    }
    this.checkAndResetNotifications();
  }

  selectSize(size: PipeProperty_Size): void {
    this.editingSize = size;
    this.sizeForm.patchValue(size);
    this.checkAndResetNotifications();
  }

  checkAndResetNotifications(): void {
    combineLatest([
      this.store.select(selectCreatedSize),
      this.store.select(selectUpdatedSize),
      this.store.select(selectErrorLoadingSizes),
      this.store.select(selectCreatingSizeError),
      this.store.select(selectSelectedSizeError)
    ]).pipe(
      take(1)
    ).subscribe(([created, updated, loadingError, creatingError, selectedError]) => {
      if (created || updated || loadingError || creatingError || selectedError) {
        this.store.dispatch(resetSizeNotifications());
      }
    });
  }

  saveOrUpdateSize(): void {
    if (this.editingSize) {
      const sizeId = this.editingSize.pipeProperty_SizeId;
      const sizeUpdate = {
        ...this.editingSize,
        ...this.sizeForm.value
      };
      this.store.dispatch(actionUpdatePipeProperty_Size({ id: sizeId, size: sizeUpdate }));
    } else {
      this.store.dispatch(actionCreatePipeProperty_Size({ sizeCreate: this.sizeForm.value }));
    }
    this.resetForm();
  }

  resetForm(): void {
    this.editingSize = null;
    this.sizeForm.reset({ sizeMetric: '', sizeImperial: '', isActive: true });
    this.checkAndResetNotifications();
  }
}
