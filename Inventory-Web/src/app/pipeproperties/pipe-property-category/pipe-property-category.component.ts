import { Component, OnInit, OnDestroy, booleanAttribute, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PipeProperty_Category } from 'src/app/models/pipe.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppState } from '../../store/core.state';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, Subscription, combineLatest, map, takeUntil } from 'rxjs';
import { selectAllCategories, selectCreatingCategoryError, selectErrorLoadingCategories, selectLoadingCategories, selectSelectedCategoryError } from 'src/app/store/pipe-properties/pipe-property-category/pipe-property-category.selectors';
import { actionCreatePipeProperty_Category, actionGetCategories, actionUpdatePipeProperty_Category } from 'src/app/store/pipe-properties/pipe-property-category/pipe-property-category.actions';

@Component({
  selector: 'app-pipe-property-category',
  templateUrl: './pipe-property-category.component.html',
  styleUrls: ['./pipe-property-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PipePropertyCategoryComponent implements OnInit, OnDestroy {

  loadingCategoriesSubscription : Subscription | undefined;
  
  dataSource: MatTableDataSource<PipeProperty_Category>;
  displayedColumns: string[] = ['name', 'isActive', 'actions'];
  categoryForm: FormGroup;
  editingCategory: PipeProperty_Category | null = null;
  loadingCategories$: Observable<boolean> | undefined;
  private destroy$ = new Subject<void>();
  
  errorMessage$: Observable<string>;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.errorMessage$ = combineLatest([
      this.store.select(selectErrorLoadingCategories),
      this.store.select(selectCreatingCategoryError),
      this.store.select(selectSelectedCategoryError)
    ]).pipe(
      map(([loadingError, creatingError, updatingError]) => {
        const error = loadingError || creatingError || updatingError;
        return error ? error.message : '';
      }));

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true, Validators.required]
    });
    this.dataSource = new MatTableDataSource<PipeProperty_Category>([]);
  }

  ngOnInit(): void {
    this.loadingCategories$ = this.store.select(selectLoadingCategories); 

    console.log('WE ARE IN INIT!!');
    this.store.dispatch(actionGetCategories({ searchParams: null }));
    this.store.pipe(
      select(selectAllCategories),
      takeUntil(this.destroy$)
    ).subscribe(categories => this.dataSource.data = categories);


    this.loadingCategoriesSubscription = this.store.select(selectLoadingCategories)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(loading => {
      console.log('loadingCategories$ value:', loading);
    }
    );
    

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.loadingCategoriesSubscription) {
      this.loadingCategoriesSubscription.unsubscribe();
    }
  }

  selectCategory(category: PipeProperty_Category): void {
    this.editingCategory = category;
    this.categoryForm.patchValue(category);
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
  }

  cancelEdit(): void {
    this.resetForm();
  }
}
