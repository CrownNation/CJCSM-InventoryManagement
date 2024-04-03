import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PipeProperty_Category } from 'src/app/models/pipe.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppState } from '../../store/core.state';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, combineLatest, map, takeUntil } from 'rxjs';
import { selectAllCategories, selectCreatingCategoryError, selectErrorLoadingCategories, selectLoadingCategories, selectSelectedCategoryError } from 'src/app/store/pipe-properties/pipe-property-category/pipe-property-category.selectors';
import { actionCreatePipeProperty_Category, actionGetCategories, actionUpdatePipeProperty_Category } from 'src/app/store/pipe-properties/pipe-property-category/pipe-property-category.actions';

@Component({
  selector: 'app-pipe-property-category',
  templateUrl: './pipe-property-category.component.html',
  styleUrls: ['./pipe-property-category.component.scss']
})
export class PipePropertyCategoryComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<PipeProperty_Category>;
  displayedColumns: string[] = ['name', 'isActive', 'actions'];
  categoryForm: FormGroup;
  editingCategory: PipeProperty_Category | null = null;
  loadingCategories$: Observable<Boolean>;
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

    this.loadingCategories$ = this.store.select(selectLoadingCategories);
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true, Validators.required]
    });
    this.dataSource = new MatTableDataSource<PipeProperty_Category>([]);
  }

  ngOnInit(): void {
    this.store.dispatch(actionGetCategories({ searchParams: null }));
    this.store.pipe(
      select(selectAllCategories),
      takeUntil(this.destroy$)
    ).subscribe(categories => this.dataSource.data = categories);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
