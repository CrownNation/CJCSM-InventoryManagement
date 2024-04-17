import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, Subscription, combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { PipeProperty_Condition } from 'src/app/models/pipe.model';
import { AppState } from '../../store/core.state';

import {
  selectAllConditions,
  selectCreatingConditionError,
  selectErrorLoadingConditions,
  selectLoadingConditions,
  selectSelectedConditionError,
  selectCreatedCondition,
  selectUpdatedCondition
} from 'src/app/store/pipe-properties/pipe-property-condition/pipe-property-condition.selectors';
import {
  actionCreatePipeProperty_Condition,
  actionGetConditions,
  actionUpdatePipeProperty_Condition
} from 'src/app/store/pipe-properties/pipe-property-condition/pipe-property-condition.actions';

@Component({
  selector: 'app-pipe-property-condition',
  templateUrl: './pipe-property-condition.component.html',
  styleUrls: ['./pipe-property-condition.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PipePropertyConditionComponent implements OnInit, OnDestroy {

  loadingConditionsSubscription: Subscription | undefined;

  dataSource: MatTableDataSource<PipeProperty_Condition>;
  displayedColumns: string[] = ['name', 'isActive', 'actions'];
  conditionForm: FormGroup;
  editingCondition: PipeProperty_Condition | null = null;
  loadingConditions$: Observable<boolean> | undefined;
  private destroy$ = new Subject<void>();

  errorMessage$: Observable<string>;
  isConditionCreated$: Observable<boolean>;
  isConditionUpdated$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.conditionForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true, Validators.required]
    });
    this.dataSource = new MatTableDataSource<PipeProperty_Condition>([]);

    this.errorMessage$ = combineLatest([
      this.store.select(selectErrorLoadingConditions),
      this.store.select(selectCreatingConditionError),
      this.store.select(selectSelectedConditionError)
    ]).pipe(
      map(([loadingError, creatingError, updatingError]) => loadingError || creatingError || updatingError ? "An error occurred" : '')
    );

    this.isConditionCreated$ = this.store.select(selectCreatedCondition).pipe(map(condition => !!condition));
    this.isConditionUpdated$ = this.store.select(selectUpdatedCondition).pipe(map(condition => !!condition));
  }

  ngOnInit(): void {
    this.loadingConditions$ = this.store.select(selectLoadingConditions);
    this.store.dispatch(actionGetConditions({ searchParams: null }));
    this.store.pipe(
      select(selectAllConditions),
      takeUntil(this.destroy$)
    ).subscribe(conditions => this.dataSource.data = conditions);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.loadingConditionsSubscription) {
      this.loadingConditionsSubscription.unsubscribe();
    }
  }

  selectCondition(condition: PipeProperty_Condition): void {
    this.editingCondition = condition;
    this.conditionForm.patchValue(condition);
  }

  saveOrUpdateCondition(): void {
    if (this.editingCondition) {
      const conditionId = this.editingCondition.pipeProperty_ConditionId;
      const conditionUpdate = {
        ...this.editingCondition,
        ...this.conditionForm.value
      };
      this.store.dispatch(actionUpdatePipeProperty_Condition({ id: conditionId, condition: conditionUpdate }));
    } else {
      this.store.dispatch(actionCreatePipeProperty_Condition({ conditionCreate: this.conditionForm.value }));
    }
    this.resetForm();
  }

  resetForm(): void {
    this.editingCondition = null;
    this.conditionForm.reset({ name: '', isActive: true });
  }
}
