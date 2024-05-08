import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, Subscription, combineLatest } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { PipeProperty_Category } from 'src/app/models/pipe.model';
import { AppState } from '../../store/core.state';

import {
  selectAllCategories,
  selectCreatingCategoryError,
  selectErrorLoadingCategories,
  selectLoadingCategories,
  selectSelectedCategoryError,
  selectCreatedCategory,
  selectUpdatedCategory,
} from 'src/app/store/pipe-properties/pipe-property-category/pipe-property-category.selectors';
import {
  actionCreatePipeProperty_Category,
  actionGetCategories,
  actionUpdatePipeProperty_Category,
  resetCategoryNotifications
} from 'src/app/store/pipe-properties/pipe-property-category/pipe-property-category.actions';

@Component({
  selector: 'app-pipe-property-category',
  templateUrl: './pipe-property-category.component.html',
  styleUrls: ['./pipe-property-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PipePropertyCategoryComponent implements OnInit, OnDestroy {

  loadingCategoriesSubscription: Subscription | undefined;

  dataSource: MatTableDataSource<PipeProperty_Category>;
  displayedColumns: string[] = ['name', 'isActive', 'actions'];
  categoryForm: FormGroup;
  editingCategory: PipeProperty_Category | null = null;
  loadingCategories$: Observable<boolean> | undefined;
  private destroy$ = new Subject<void>();

  errorMessage$: Observable<string>;
  isCategoryCreated$: Observable<boolean>;
  isCategoryUpdated$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true, Validators.required]
    });
    this.dataSource = new MatTableDataSource<PipeProperty_Category>([]);

    this.errorMessage$ = combineLatest([
      this.store.select(selectErrorLoadingCategories),
      this.store.select(selectCreatingCategoryError),
      this.store.select(selectSelectedCategoryError)
    ]).pipe(
      map(([loadingError, creatingError, updatingError]) => loadingError || creatingError || updatingError ? "An error occurred" : '')
    );

    this.isCategoryCreated$ = this.store.select(selectCreatedCategory).pipe(map(category => !!category));
    this.isCategoryUpdated$ = this.store.select(selectUpdatedCategory).pipe(map(category => !!category));
  }

  ngOnInit(): void {
    this.loadingCategories$ = this.store.select(selectLoadingCategories);
    this.store.dispatch(actionGetCategories({ searchParams: null }));
    this.store.pipe(
      select(selectAllCategories),
      takeUntil(this.destroy$)
    ).subscribe(categories => this.dataSource.data = categories);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.loadingCategoriesSubscription) {
      this.loadingCategoriesSubscription.unsubscribe();
    }
    this.checkAndResetNotifications();
  }

  selectCategory(category: PipeProperty_Category): void {
    this.editingCategory = category;
    this.categoryForm.patchValue(category);
    // Reset notifications when a new category is selected
    this.checkAndResetNotifications();
  }

  //Checks for any notifications present, if there are any, reset them.
  checkAndResetNotifications(): void {
    combineLatest([
      this.store.select(selectCreatedCategory),
      this.store.select(selectUpdatedCategory),
      this.store.select(selectErrorLoadingCategories),
      this.store.select(selectCreatingCategoryError),
      this.store.select(selectSelectedCategoryError)
    ]).pipe(
      take(1)
    ).subscribe(([created, updated, loadingError, creatingError, selectedError]) => {
      // Check if any of the states are truthy (i.e., there is either a success message or an error message)
      if (created || updated || loadingError || creatingError || selectedError) {
        this.store.dispatch(resetCategoryNotifications());
      }
    });
  }

  saveOrUpdateCategory(): void {
    if (this.editingCategory) {
      const categoryId = this.editingCategory.pipeProperty_CategoryId;
      const categoryUpdate = {
        ...this.editingCategory,
        ...this.categoryForm.value
      };
      this.store.dispatch(actionUpdatePipeProperty_Category({ id: categoryId, category: categoryUpdate }));
    } else {
      this.store.dispatch(actionCreatePipeProperty_Category({ categoryCreate: this.categoryForm.value }));
    }
    this.resetForm();
  }

  resetForm(): void {
    this.editingCategory = null;
    this.categoryForm.reset({ name: '', isActive: true });
    this.checkAndResetNotifications();
  }

}
