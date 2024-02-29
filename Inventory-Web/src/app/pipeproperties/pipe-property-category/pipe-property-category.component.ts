import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PipeProperty_Category } from 'src/app/models/pipe.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppState } from '../../store/core.state';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, combineLatest, map, takeUntil } from 'rxjs';
import { selectAllCategories, selectCreatingCategoryError, selectErrorLoadingCategories, selectLoadingCategories, selectSelectedCategoryError } from 'src/app/store/pipe-properties/pipe-property-category/pipe-property-category.selectors';
import { actionGetCategories, actionCreatePipeProperty_Cateogry, actionUpdatePipeProperty_Category } from 'src/app/store/pipe-properties/pipe-property-category/pipe-property-category.actions';

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
      // Assuming your form value matches the structure expected for creation
      this.store.dispatch(actionCreatePipeProperty_Cateogry({ categoryCreate: this.categoryForm.value }));
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

/*

import { Component } from '@angular/core';
import { PipeProperty_Category } from 'src/app/models/pipe.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppState } from '../../store/core.state';
import { Store, select } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectAllCategories, selectLoadingCategories } from 'src/app/store/pipe-properties/pipe-property-category/pipe-property-category.selectors';
import { actionGetCategories } from 'src/app/store/pipe-properties/pipe-property-category/pipe-property-category.actions';

@Component({
  selector: 'app-pipe-property-category',
  templateUrl: './pipe-property-category.component.html',
  styleUrls: ['./pipe-property-category.component.scss']
})
export class PipePropertyCategoryComponent {

  dataSource: MatTableDataSource<PipeProperty_Category> = new MatTableDataSource<PipeProperty_Category>;

  displayedColumns: string[] = [
    'name',
    'isActive'
  ];

  
  private destroy$ = new Subject<void>();

  categories$: Observable<PipeProperty_Category[]> = this.store.select(selectAllCategories);
  loadingCategories$: Observable<Boolean> = this.store.select((selectLoadingCategories));

  constructor(
    private router: Router,
    private store: Store<AppState>)
  {  }

  ngOnInit(): void {

    this.store.dispatch(actionGetCategories({searchParams: null}));

    this.categories$.pipe(takeUntil(this.destroy$)).subscribe((categories) => {
      if (categories) {
        this.dataSource = new MatTableDataSource(categories as PipeProperty_Category[]);
      }
    });

  }

  viewCategory(pipeProperty_Category: PipeProperty_Category) {
    //this.store.dispatch(actionGetTallyById({tallyId: tally.tallyId}));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  
}
*/