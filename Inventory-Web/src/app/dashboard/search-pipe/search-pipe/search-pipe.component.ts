import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/core.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pipe, PipeDefinition, PipeProperty_Category, PipeProperty_Condition, PipeSearchParams } from '../../../models/pipe.model';
import { Observable, Subject, map, startWith, takeUntil } from 'rxjs';
import { selectLoadingPipe, selectPipe } from '../../../store/pipe/pipe.selectors';
import { actionGetPipe, actionGetPipeById } from '../../../store/pipe/pipe.actions';
import { Rack } from '../../../models/rack.model';
import { selectRacks } from '../../../store/rack/rack.selectors';
import { clearNotifications } from 'src/app/store/notification-hub/notification-hub.actions';
import { selectCategories, selectConditions } from 'src/app/store/pipe-properties/pipe-properties/pipe-properties.selectors';
import { selectAllPipeDefinitions, selectLoadingPipeDefinitions } from 'src/app/store/pipe-definition/pipe-definition.selectors';
import { actionGetAllPipeProperties } from 'src/app/store/pipe-properties/pipe-properties/pipe-properties.actions';
import { actionGetPipeDefinitions } from 'src/app/store/pipe-definition/pipe-definition.actions';

@Component({
  selector: 'app-search-pipe',
  templateUrl: './search-pipe.component.html',
  styleUrls: ['./search-pipe.component.scss']
})
export class SearchPipeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('categoryInput') categoryInput!: ElementRef<HTMLInputElement>;
  @ViewChild('conditionInput') conditionInput!: ElementRef<HTMLInputElement>;

  categoryControl = new FormControl();
  conditionControl = new FormControl();

  pipeDefinitionsList$: Observable<PipeDefinition[] | null> = this.store.select(selectAllPipeDefinitions);
  loadingPipeDefinitions: Boolean = false;
  loadingPipeDefinition$: Observable<Boolean> = this.store.select((selectLoadingPipeDefinitions));

  displayedColumns: string[] = [
    'quantity',
    'lengthInMeters',
    'rack',
    'tier',
    'category',
    'condition',
    'grade',
    'actions'
  ];

  dataSource: MatTableDataSource<Pipe> = new MatTableDataSource<Pipe>
  dataSourcePipeDefinitions = new MatTableDataSource<PipeDefinition>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pipeForm!: FormGroup

  private unsubscribe$ = new Subject<void>();

  pipeDefinitionList: PipeDefinition[] = [];
  racks: Rack[] = [];
  
  searchParams: PipeSearchParams | null = {
    categoryId: null,
    conditionId: null,
    coatingId: null,
    gradeId: null,
    isActive: null,
    rangeId: null,
    sizeId: null,
    threadId: null,
    wallId: null,
    weightId: null
  };

  // The observable streams for categories and conditions, which are used for dropdown filtering.
  categories$: Observable<PipeProperty_Category[]>;
  conditions$: Observable<PipeProperty_Condition[]>;

  // Local arrays to old the selected categories and conditions once the observable streams emit values.
  // Used as the source of truth for the dropdowns which can be used to filter the dropdowns.
  categories: PipeProperty_Category[] = [];
  conditions: PipeProperty_Condition[] = [];

  // Filtered for displaying only the selected categories and conditions in the dropdown.
  filteredCategories: PipeProperty_Category[] = [];
  filteredConditions: PipeProperty_Condition[] = [];

  // Subject to manage the unsubscription of observables on component destruction to prevent memory leaks.
  private destroy$ = new Subject<void>();

  // Observable stream for retrieving pipe data from the store, used for displaying pipe information in the UI.
  pipe$: Observable<Pipe[]> = this.store.select(selectPipe);

  // Boolean flag to track the loading state of pipe data to manage UI elements like loaders.
  loadingPipe: Boolean = false;

  // Observable stream for monitoring the loading state of pipe data, which helps in showing or hiding loading indicators.
  loading$: Observable<Boolean> = this.store.select(selectLoadingPipe);


  constructor(
    private store: Store<AppState>) {

      this.store.dispatch(actionGetAllPipeProperties());

    // Initializes observables for categories and conditions by selecting them from the store.
    this.categories$ = this.store.select(selectCategories);
    this.conditions$ = this.store.select(selectConditions);
  }

  ngOnInit(): void {

    this.buildForm();
    this.loadingPipe = true;
    this.store.dispatch(actionGetPipe({ searchParams: this.searchParams }));
    this.store.dispatch(actionGetPipeDefinitions({ searchParams: null }));

    this.store.dispatch(clearNotifications());
    
    this.pipe$.pipe(takeUntil(this.destroy$)).subscribe((pipe) => {
      if (pipe) {
        this.dataSource = new MatTableDataSource(pipe as Pipe[]);
        this.loadingPipe = false;

        if (pipe.length > 0)
          this.store.dispatch(actionGetPipeById({ pipeId: pipe[0].pipeId }));
      }
    });

    this.loading$.subscribe((loading) => {
      this.loadingPipe = loading;
    });

    this.loading$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(loading => {
      this.loadingPipeDefinitions = loading; // Reflects the state managed by NgRx
    });

    this.subscribeToPipeDefinitions();
    this.setupFilterSubscriptions();
  }

  subscribeToPipeDefinitions(): void {
    // Subscribes to the observable of pipe definitions and updates the table data source when it changes.
    this.pipeDefinitionsList$.subscribe(definitions => {
      if (definitions) {
        this.dataSourcePipeDefinitions.data = definitions;
      }
    });
  }

  setupFilterSubscriptions(): void {
    this.categories$.pipe(takeUntil(this.unsubscribe$)).subscribe(categories => {
      this.categories = categories;
      this.filteredCategories = categories;
    });

    this.conditions$.pipe(takeUntil(this.unsubscribe$)).subscribe(conditions => {
      this.conditions = conditions;
      this.filteredConditions = conditions;
    });
  }

  buildForm() {
    this.pipeForm = new FormGroup({
      category: this.categoryControl,
      condition: this.conditionControl,
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  filter() {
    this.searchParams = {
      categoryId: this.pipeForm.value.category ? this.pipeForm.value.category.pipeProperty_CategoryId : null,
      conditionId: this.pipeForm.value.condition ? this.pipeForm.value.condition.pipeProperty_ConditionId : null,
      coatingId: null,
      gradeId: null,
      isActive: null,
      rangeId: null,
      sizeId: null,
      threadId: null,
      wallId: null,
      weightId: null  
    };
    this.loadingPipe = true;
    console.log("Current searchParams:", this.searchParams); // Log the current search parameters

    this.store.dispatch(actionGetPipe({ searchParams: this.searchParams }));
  }

  clearForm() {
    this.pipeForm.reset();
    this.searchParams = {
      categoryId: null,
      conditionId: null,
      coatingId: null,
      gradeId: null,
      isActive: null,
      rangeId: null,
      sizeId: null,
      threadId: null,
      wallId: null,
      weightId: null
    };

    this.store.dispatch(actionGetPipe({ searchParams: this.searchParams }));

     // In order to clear the drop down selection, the filtered list has to be cleared.
    // Whenever a drop down control gets focus and/or gets input, this filter function is called.
    // This function takes the input value, then updates the displayed list (the filtered list ) by selecting
    // everything in the full data list that matches the input.
    // So, if we clear the filteredCategories list, it will be repopulated immidiately as soon as the user clicks 
    // on it or types, which is a behvaiour that works fine. 
    // If the .setValue('') method is used to clear the value, the drop down will show the placeholder text,
    // but the value will still be selected since it holds on to the last selected value from the internal list.
    // So by clearing the list, it makes keeping a selected option impossible since it no longer exists in the list. 
    this.filteredCategories = [];
    this.filteredConditions = [];
  }

  viewCustomer(pipe: Pipe) {
    this.store.dispatch(actionGetPipeById({ pipeId: pipe.pipeId }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // -- Filter functions for the drop down fields to filter drop down options based on user input -- //
  filterCategories(): void {
    const filterValue = this.categoryInput.nativeElement.value.toLowerCase();
    this.filteredCategories = this.categories.filter(category => category.name.toLowerCase().includes(filterValue));
  }

  filterConditions(): void {
    const filterValue = this.conditionInput.nativeElement.value.toLowerCase();
    this.filteredConditions = this.conditions.filter(condition => condition.name.toLowerCase().includes(filterValue));
  }
  

  onConditionBlur(): void {
    const inputVal = this.conditionInput.nativeElement.value;
    if (!this.filteredConditions.some(condition => condition.name.toLowerCase() === inputVal.toLowerCase())) {
      this.conditionControl.setValue('');
    }
  }

  onCategoryBlur(): void {
    const inputVal = this.categoryInput.nativeElement.value;
    if (!this.filteredCategories.some(category => category.name.toLowerCase() === inputVal.toLowerCase())) {
      this.categoryControl.setValue('');
    }
  }

    // -- Display functions for the pipe properties -- //
    displayCategory(category: PipeProperty_Category): string {
      return category ? category.name : '';
    }
  
    displayCondition(condition: PipeProperty_Condition): string {
      return condition ? condition.name : '';
    }

}
