import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/core.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pipe, PipeDefinition, PipeProperty_Category, PipeProperty_Condition, PipeSearchParams } from '../../../models/pipe.model';
import { Observable, Subject, map, startWith, takeUntil } from 'rxjs';
import { selectLoadingPipe, selectPipe, selectPipeDefinitionsList } from '../../../store/pipe/pipe.selectors';
import { actionGetPipe, actionGetPipeById } from '../../../store/pipe/pipe.actions';
import { Rack } from '../../../models/rack.model';
import { selectRacks } from '../../../store/rack/rack.selectors';
import { clearNotifications } from 'src/app/store/notification-hub/notification-hub.actions';
import { selectCategories, selectConditions } from 'src/app/store/pipe-properties/pipe-properties/pipe-properties.selectors';

@Component({
  selector: 'app-search-pipe',
  templateUrl: './search-pipe.component.html',
  styleUrls: ['./search-pipe.component.scss']
})
export class SearchPipeComponent implements OnInit, AfterViewInit, OnDestroy {

  categoryControl = new FormControl();
  conditionControl = new FormControl();

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pipeForm!: FormGroup

  pipeDefinitionList: PipeDefinition[] = [];
  racks: Rack[] = [];
  searchParams: PipeSearchParams | null = {
    categoryId: null,
    conditionId: null,
  };

  // Subject to manage the unsubscription of observables on component destruction to prevent memory leaks.
  private destroy$ = new Subject<void>();

  // Observable stream for retrieving pipe data from the store, used for displaying pipe information in the UI.
  pipe$: Observable<Pipe[]> = this.store.select(selectPipe);

  // Boolean flag to track the loading state of pipe data to manage UI elements like loaders.
  loadingPipe: Boolean = false;

  // Observable stream for monitoring the loading state of pipe data, which helps in showing or hiding loading indicators.
  loading$: Observable<Boolean> = this.store.select(selectLoadingPipe);

  //-- Drop Down List Properties --//
  // Observable streams of filtered categories and conditions for UI binding, used for dropdown filtering.
  filteredCategories$: Observable<PipeProperty_Category[]>;
  filteredConditions$: Observable<PipeProperty_Condition[]>;

  // Local arrays to hold the full list of categories and conditions retrieved from the store or backend.
  categories: PipeProperty_Category[] = [];
  conditions: PipeProperty_Condition[] = [];

  // Observable streams from the store for categories and conditions, 
  // allowing the component to reactively update when store data changes.
  categories$: Observable<PipeProperty_Category[]>;
  conditions$: Observable<PipeProperty_Condition[]>;



  constructor(
    private store: Store<AppState>) {
    // Initializes observables for categories and conditions by selecting them from the store.
    this.categories$ = this.store.select(selectCategories);
    this.conditions$ = this.store.select(selectConditions);

    // Sets up an observable for filtered properties, which reacts to changes in the categoryControl input field.
    // It starts with an empty string and filters properties based on user input.
    this.filteredCategories$ = this.categoryControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterCategories(value))
      );

    this.filteredConditions$ = this.conditionControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterConditions(value))
      );

  }

  // Filters properties based on the user input. It converts both the input and property names to lowercase
  // and checks if the property name includes the input string, effectively performing a case-insensitive search.
  private filterCategories(value: string): PipeProperty_Category[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter(category =>
      category.name.toLowerCase().includes(filterValue)
    );
  }

  private filterConditions(value: string): PipeProperty_Condition[] {
    const filterValue = value.toLowerCase();
    return this.conditions.filter(condition =>
      condition.name.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {

    this.buildForm();
    this.loadingPipe = true;
    this.store.dispatch(actionGetPipe({ searchParams: this.searchParams }));

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

    this.store.pipe(select(selectCategories)).subscribe(categories => {
      this.categories = categories;
      this.setupFilter();
    });

    this.store.pipe(select(selectConditions)).subscribe(conditions => {
      this.conditions = conditions;
      this.setupFilter();
    });

    // Subscribe to categories and conditions
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe(categories => {
      console.log('Categories loaded:', categories);
    });
    this.conditions$.pipe(takeUntil(this.destroy$)).subscribe(conditions => {
      console.log('Conditions loaded:', conditions);
    });


  }

  setupFilter(): void {
    this.filteredCategories$ = this.categoryControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCategories(value))
    );

    this.filteredConditions$ = this.conditionControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterConditions(value))
    );
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filter() {
    this.searchParams = {
      categoryId: this.pipeForm.value.category,
      conditionId: this.pipeForm.value.condition,
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
    };

    this.store.dispatch(actionGetPipe({ searchParams: this.searchParams }));
  }

  viewCustomer(pipe: Pipe) {
    this.store.dispatch(actionGetPipeById({ pipeId: pipe.pipeId }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
