import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, Subscription, combineLatest } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { PipeProperty_Grade } from 'src/app/models/pipe.model';
import { AppState } from '../../store/core.state';

import {
  selectAllGrades,
  selectCreatingGradeError,
  selectErrorLoadingGrades,
  selectLoadingGrades,
  selectSelectedGradeError,
  selectCreatedGrade,
  selectUpdatedGrade
} from 'src/app/store/pipe-properties/pipe-property-grade/pipe-property-grade.selectors';
import {
  actionCreatePipeProperty_Grade,
  actionGetGrades,
  actionUpdatePipeProperty_Grade,
  resetGradeNotifications,
} from 'src/app/store/pipe-properties/pipe-property-grade/pipe-property-grade.actions';

@Component({
  selector: 'app-pipe-property-grade',
  templateUrl: './pipe-property-grade.component.html',
  styleUrls: ['./pipe-property-grade.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PipePropertyGradeComponent implements OnInit, OnDestroy {

  loadingGradesSubscription: Subscription | undefined;

  dataSource: MatTableDataSource<PipeProperty_Grade>;
  displayedColumns: string[] = ['name', 'isActive', 'actions'];
  gradeForm: FormGroup;
  editingGrade: PipeProperty_Grade | null = null;
  loadingGrades$: Observable<boolean> | undefined;
  private destroy$ = new Subject<void>();

  errorMessage$: Observable<string>;
  isGradeCreated$: Observable<boolean>;
  isGradeUpdated$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.gradeForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true, Validators.required]
    });
    this.dataSource = new MatTableDataSource<PipeProperty_Grade>([]);

    this.errorMessage$ = combineLatest([
      this.store.select(selectErrorLoadingGrades),
      this.store.select(selectCreatingGradeError),
      this.store.select(selectSelectedGradeError)
    ]).pipe(
      map(([loadingError, creatingError, updatingError]) => loadingError || creatingError || updatingError ? "An error occurred" : '')
    );

    this.isGradeCreated$ = this.store.select(selectCreatedGrade).pipe(map(grade => !!grade));
    this.isGradeUpdated$ = this.store.select(selectUpdatedGrade).pipe(map(grade => !!grade));
  }

  ngOnInit(): void {
    this.loadingGrades$ = this.store.select(selectLoadingGrades);
    this.store.dispatch(actionGetGrades({ searchParams: null }));
    this.store.pipe(
      select(selectAllGrades),
      takeUntil(this.destroy$)
    ).subscribe(grades => this.dataSource.data = grades);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.loadingGradesSubscription) {
      this.loadingGradesSubscription.unsubscribe();
    }
    this.checkAndResetNotifications();
  }

  selectGrade(grade: PipeProperty_Grade): void {
    this.editingGrade = grade;
    this.gradeForm.patchValue(grade);
    this.checkAndResetNotifications();
  }

  //Checks for any notifications present, if there are any, reset them.
  checkAndResetNotifications(): void {
    combineLatest([
      this.store.select(selectCreatedGrade),
      this.store.select(selectUpdatedGrade),
      this.store.select(selectErrorLoadingGrades),
      this.store.select(selectCreatingGradeError),
      this.store.select(selectSelectedGradeError)
    ]).pipe(
      take(1)
    ).subscribe(([created, updated, loadingError, creatingError, selectedError]) => {
      // Check if any of the states are truthy (i.e., there is either a success message or an error message)
      if (created || updated || loadingError || creatingError || selectedError) {
        this.store.dispatch(resetGradeNotifications());
      }
    });
  }

  saveOrUpdateGrade(): void {
    if (this.editingGrade) {
      const gradeId = this.editingGrade.pipeProperty_GradeId;
      const gradeUpdate = {
        ...this.editingGrade,
        ...this.gradeForm.value
      };
      this.store.dispatch(actionUpdatePipeProperty_Grade({ id: gradeId, grade: gradeUpdate }));
    } else {
      this.store.dispatch(actionCreatePipeProperty_Grade({ gradeCreate: this.gradeForm.value }));
    }
    this.resetForm();
  }

  resetForm(): void {
    this.editingGrade = null;
    this.gradeForm.reset({ name: '', isActive: true });
    this.checkAndResetNotifications();
  }
}
