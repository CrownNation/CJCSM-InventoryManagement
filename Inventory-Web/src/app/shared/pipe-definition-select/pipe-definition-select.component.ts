import { Component, OnInit, ElementRef, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { PipeDefinition, PipeDefinitionCreate, PipeDefinitionSearchParams, PipeProperty_Category, PipeProperty_Coating, PipeProperty_Condition, PipeProperty_Grade, PipeProperty_Range, PipeProperty_Size, PipeProperty_Thread, PipeProperty_Wall, PipeProperty_Weight } from 'src/app/models/pipe.model';
import { AppState } from 'src/app/store/core.state';
import { actionGetAllPipeProperties } from 'src/app/store/pipe-properties/pipe-properties/pipe-properties.actions';
import { selectCategories, selectCoatings, selectConditions, selectGrades, selectRanges, selectSizes, selectThreads, selectWalls, selectWeights } from 'src/app/store/pipe-properties/pipe-properties/pipe-properties.selectors';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialogRef } from '@angular/material/dialog';
import { actionGetPipeDefinitions } from 'src/app/store/pipe-definition/pipe-definition.actions';
import { selectAllPipeDefinitions, selectLoadingPipeDefinitions } from 'src/app/store/pipe-definition/pipe-definition.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PipeDefinitionService } from 'src/app/core/services/pipe-definition-service/pipe-definition.service';

@Component({
  selector: 'app-pipe-definition-select',
  templateUrl: './pipe-definition-select.component.html',
  styleUrls: ['./pipe-definition-select.component.scss']
})
export class PipeDefinitionSelectComponent implements OnInit, OnDestroy {
  @ViewChild('errorLabel') errorLabel!: ElementRef;

  @ViewChild('categoryInput') categoryInput!: ElementRef<HTMLInputElement>;
  @ViewChild('coatingInput') coatingInput!: ElementRef<HTMLInputElement>;
  @ViewChild('conditionInput') conditionInput!: ElementRef<HTMLInputElement>;
  @ViewChild('gradeInput') gradeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('rangeInput') rangeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('threadInput') threadInput!: ElementRef<HTMLInputElement>;
  @ViewChild('sizeInput') sizeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('wallInput') wallInput!: ElementRef<HTMLInputElement>;
  @ViewChild('weightInput') weightInput!: ElementRef<HTMLInputElement>;

  displayedColumns: string[] = ['Category', 'Coating', 'Condition', 'Grade', 'Range', 'Thread', 'Size Metric', 'Size Imperial', 'Wall Metric', 'Wall Imperial', 'Weight Metric', 'Weight Imperial'];


  categoryControl = new FormControl();
  coatingControl = new FormControl();
  conditionControl = new FormControl();
  gradeControl = new FormControl();
  rangeControl = new FormControl();
  threadControl = new FormControl();
  sizeControl = new FormControl();
  wallControl = new FormControl();
  weightControl = new FormControl();

  pipeForm: FormGroup;

  private unsubscribe$ = new Subject<void>();

  dataSource = new MatTableDataSource<PipeDefinition>([]);

  pipeDefinitionsList$: Observable<PipeDefinition[] | null> = this.store.select(selectAllPipeDefinitions);

  loadingPipeDefinitions: Boolean = false;
  loading$: Observable<Boolean> = this.store.select((selectLoadingPipeDefinitions));

  pipeDefinitionSearchParams: PipeDefinitionSearchParams = {
    categoryId: null,
    coatingId: null,
    conditionId: null,
    gradeId: null,
    rangeId: null,
    sizeId: null,
    threadId: null,
    wallId: null,
    weightId: null,
    isActive: true
  };

  selection = new SelectionModel<PipeDefinition>(false, []); // false for single selection

  categories$: Observable<PipeProperty_Category[]>;
  coatings$: Observable<PipeProperty_Coating[]>;
  conditions$: Observable<PipeProperty_Condition[]>;
  grades$: Observable<PipeProperty_Grade[]>;
  ranges$: Observable<PipeProperty_Range[]>;
  threads$: Observable<PipeProperty_Thread[]>;
  sizes$: Observable<PipeProperty_Size[]>;
  walls$: Observable<PipeProperty_Wall[]>;
  weights$: Observable<PipeProperty_Weight[]>;

  categories: PipeProperty_Category[] = [];
  coatings: PipeProperty_Coating[] = [];
  conditions: PipeProperty_Condition[] = [];
  grades: PipeProperty_Grade[] = [];
  ranges: PipeProperty_Range[] = [];
  sizes: PipeProperty_Size[] = [];
  threads: PipeProperty_Thread[] = [];
  walls: PipeProperty_Wall[] = [];
  weights: PipeProperty_Weight[] = [];

  filteredCategories: PipeProperty_Category[] = [];
  filteredCoatings: PipeProperty_Coating[] = [];
  filteredConditions: PipeProperty_Condition[] = [];
  filteredGrades: PipeProperty_Grade[] = [];
  filteredRanges: PipeProperty_Range[] = [];
  filteredThreads: PipeProperty_Thread[] = [];
  filteredSizes: PipeProperty_Size[] = [];
  filteredWalls: PipeProperty_Wall[] = [];
  filteredWeights: PipeProperty_Weight[] = [];
 

  constructor(private store: Store<AppState>,
    public dialogRef: MatDialogRef<PipeDefinitionSelectComponent>,
    private snackBar: MatSnackBar,
    private pipeDefinitionService: PipeDefinitionService
  ) {
    this.categories$ = this.store.select(selectCategories);
    this.coatings$ = this.store.select(selectCoatings);
    this.conditions$ = this.store.select(selectConditions);
    this.grades$ = this.store.select(selectGrades);
    this.ranges$ = this.store.select(selectRanges);
    this.threads$ = this.store.select(selectThreads);
    this.sizes$ = this.store.select(selectSizes);
    this.walls$ = this.store.select(selectWalls);
    this.weights$ = this.store.select(selectWeights);

    this.pipeForm = new FormGroup({
      category: this.categoryControl,
      condition: this.conditionControl,
      coating: this.coatingControl,
      grade: this.gradeControl,
      range: this.rangeControl,
      thread: this.threadControl,
      size: this.sizeControl,
      wall: this.wallControl,
      weight: this.weightControl
    });
  }

  ngOnInit(): void {
    this.loading$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(loading => {
      this.loadingPipeDefinitions = loading; // Reflects the state managed by NgRx
    });

    this.store.dispatch(actionGetAllPipeProperties());
    this.loadPipeDefinitions();
    this.subscribeToPipeDefinitions();
    this.setupFilterSubscriptions();



  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  subscribeToPipeDefinitions(): void {
    // Subscribes to the observable of pipe definitions and updates the table data source when it changes.
    this.pipeDefinitionsList$.subscribe(definitions => {
      if (definitions) {
        this.dataSource.data = definitions;
      }
    });
  }

  loadPipeDefinitions() {
    console.log("Loading pipe definitions.");
    this.store.dispatch(actionGetPipeDefinitions({ searchParams: this.pipeDefinitionSearchParams }));
  }

  setupFilterSubscriptions(): void {
    this.categories$.pipe(takeUntil(this.unsubscribe$)).subscribe(categories => {
      this.categories = categories;
      this.filteredCategories = categories;
    });

    this.coatings$.pipe(takeUntil(this.unsubscribe$)).subscribe(coatings => {
      this.coatings = coatings;
      this.filteredCoatings = coatings;
    });

    this.conditions$.pipe(takeUntil(this.unsubscribe$)).subscribe(conditions => {
      this.conditions = conditions;
      this.filteredConditions = conditions;
    });

    this.grades$.pipe(takeUntil(this.unsubscribe$)).subscribe(grades => {
      this.grades = grades;
      this.filteredGrades = grades;
    });

    this.ranges$.pipe(takeUntil(this.unsubscribe$)).subscribe(ranges => {
      this.ranges = ranges;
      this.filteredRanges = ranges;
    });

    this.sizes$.pipe(takeUntil(this.unsubscribe$)).subscribe(sizes => {
      this.sizes = sizes;
      this.filteredSizes = sizes;
    });

    this.threads$.pipe(takeUntil(this.unsubscribe$)).subscribe(threads => {
      this.threads = threads;
      this.filteredThreads = threads;
    });

    this.walls$.pipe(takeUntil(this.unsubscribe$)).subscribe(walls => {
      this.walls = walls;
      this.filteredWalls = walls;
    });

    this.weights$.pipe(takeUntil(this.unsubscribe$)).subscribe(weights => {
      this.weights = weights;
      this.filteredWeights = weights;
    });
  }

  filter() {
    this.setSearchParametersFromForm();

    console.log("Current searchParams:", this.pipeDefinitionSearchParams); // Log the current search parameters
    this.store.dispatch(actionGetPipeDefinitions({ searchParams: this.pipeDefinitionSearchParams }));
  }

  private setSearchParametersFromForm() {
    this.pipeDefinitionSearchParams = {
      categoryId: this.pipeForm.value.category ? this.pipeForm.value.category.pipeProperty_CategoryId : null,
      coatingId: this.pipeForm.value.coating ? this.pipeForm.value.coating.pipeProperty_CoatingId : null,
      conditionId: this.pipeForm.value.condition ? this.pipeForm.value.condition.pipeProperty_ConditionId : null,
      gradeId: this.pipeForm.value.grade ? this.pipeForm.value.grade.pipeProperty_GradeId : null,
      rangeId: this.pipeForm.value.range ? this.pipeForm.value.range.pipeProperty_RangeId : null,
      threadId: this.pipeForm.value.thread ? this.pipeForm.value.thread.pipeProperty_ThreadId : null,
      sizeId: this.pipeForm.value.size ? this.pipeForm.value.size.pipeProperty_SizeId : null,
      wallId: this.pipeForm.value.wall ? this.pipeForm.value.wall.pipeProperty_WallId : null,
      weightId: this.pipeForm.value.weight ? this.pipeForm.value.weight.pipeProperty_WeightId : null,
      isActive: true
    };
  }

  clearForm(): void {
    this.pipeForm.reset();

    this.pipeDefinitionSearchParams = {
      categoryId: null,
      coatingId: null,
      conditionId: null,
      gradeId: null,
      rangeId: null,
      threadId: null,
      sizeId: null,
      wallId: null,
      weightId: null,
      isActive: true
    };

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
    this.filteredCoatings = [];
    this.filteredConditions = [];
    this.filteredGrades = [];
    this.filteredRanges = [];
    this.filteredSizes = [];
    this.filteredThreads = [];
    this.filteredWalls = [];
    this.filteredWeights = [];
    
    this.store.dispatch(actionGetPipeDefinitions({ searchParams: this.pipeDefinitionSearchParams }));
  }

  selectPipeDefinition(): void {

    if (this.selection.isEmpty()) {
      this.showSnackBar("Please select a pipe definition to continue.");
      return;
    }

    const selectedPipeDefinition: PipeDefinition = this.selection.selected[0];
    console.log("Selected pipe definition:", selectedPipeDefinition.category?.name);
    this.dialogRef.close(selectedPipeDefinition);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  newFromFilters(): void {
    // Check for null values in filters
    if (Object.values(this.pipeForm.value).some(value => value === null)) {
      this.showSnackBar("All filters must be set before creating a new pipe definition.", 'Close', { panelClass: ['error-snack-bar'] });
      return;
    }
  
    // Local check for existing pipe definitions
    const localCheck = this.dataSource.data.some(def => 
      def.categoryId === this.pipeDefinitionSearchParams.categoryId &&
      def.coatingId === this.pipeDefinitionSearchParams.coatingId &&
      def.conditionId === this.pipeDefinitionSearchParams.conditionId &&
      def.gradeId === this.pipeDefinitionSearchParams.gradeId &&
      def.rangeId === this.pipeDefinitionSearchParams.rangeId &&
      def.sizeId === this.pipeDefinitionSearchParams.sizeId &&
      def.threadId === this.pipeDefinitionSearchParams.threadId &&
      def.wallId === this.pipeDefinitionSearchParams.wallId &&
      def.weightId === this.pipeDefinitionSearchParams.weightId
    );
  
    if (localCheck) {
      this.showSnackBar("A pipe definition with these pipe properties already exists.", 'Close', { panelClass: ['error-snack-bar'] });
      return;
    }
  
    // Server check (simulate or actual)
    this.setSearchParametersFromForm();

    console.log("Current search parameters:", JSON.stringify(this.pipeDefinitionSearchParams, null, 2));


    this.pipeDefinitionService.checkPipeDefinitionExists(this.pipeDefinitionSearchParams).pipe(
      switchMap((exists: boolean) => {
        console.log("Received 'exists' value:", exists);
        if (exists === false) {
          // If the pipe definition does not exist, attempt to create it
          return this.createPipeDefinition(this.pipeDefinitionSearchParams);
        } else {
          // If it does exist, show a notification and complete the observable without emitting
          this.showSnackBar("A pipe definition with these filters already exists on the server.", 'Close', { panelClass: ['error-snack-bar'] });
          return EMPTY;
        }
      })
    ).subscribe({
      next: (result) => {
        console.log("Pipe definition created successfully:", result);
        this.showSnackBar("New pipe definition created successfully!", 'Close', { panelClass: ['confirmation-snack-bar'] });
        this.loadPipeDefinitions();
      },
      error: (error) => {
        this.showSnackBar("Failed to create pipe definition.", 'Close', { panelClass: ['error-snack-bar'] });
        console.error("Failed to create pipe definition:", error);
      }
    });

  }


  createPipeDefinition(params: PipeDefinitionSearchParams): Observable<PipeDefinition> {
    const newDef: PipeDefinitionCreate = {
      categoryId: params.categoryId!,
      coatingId: params.coatingId!,
      conditionId: params.conditionId!,
      gradeId: params.gradeId!,
      rangeId: params.rangeId!,
      sizeId: params.sizeId!,
      threadId: params.threadId!,
      wallId: params.wallId!,
      weightId: params.weightId!,
      isActive: true
    };
  
    return this.pipeDefinitionService.createPipeDefinition(newDef);
  }

  showError(message: string): void {
    const label = this.errorLabel.nativeElement;
    label.textContent = message; // Set the error message text
    label.style.display = 'block'; // Make the label visible

    // Hide the label after 5 seconds
    setTimeout(() => {
      label.style.display = 'none';
    }, 5000);
  }


  showSnackBar(message: string, action: string = 'Close', config: any = { duration: 5000, panelClass: ['snack-bar'] }) {
    this.snackBar.open(message, action, config);
  }



// -- Handle double and single clicks on the table rows -- //
// -- Single clicks will highlight / unhighlight a row, double click will select and return the row -- //
private clickTimeout: any;
handleClick(row: any): void {
  if (this.clickTimeout) {
    clearTimeout(this.clickTimeout);
    this.clickTimeout = null;
  }
  this.clickTimeout = setTimeout(() => {
    this.onSingleClick(row);
  }, 250); // 250 milliseconds for double-click threshold
}

handleDoubleClick(row: any): void {
  clearTimeout(this.clickTimeout);
  this.clickTimeout = null;
  this.onDoubleClick(row);
}

onSingleClick(row: any): void {
  this.selection.toggle(row);
}

onDoubleClick(row: any): void {
  this.selection.select(row);
  this.selectPipeDefinition();
} 

  // -- Filter functions for the drop down fields to filter drop down options based on user input -- //
  filterCategories(): void {
    const filterValue = this.categoryInput.nativeElement.value.toLowerCase();
    this.filteredCategories = this.categories.filter(category => category.name.toLowerCase().includes(filterValue));
  }

  filterCoatings(): void {
    const filterValue = this.coatingInput.nativeElement.value.toLowerCase();
    this.filteredCoatings = this.coatings.filter(coating => coating.name.toLowerCase().includes(filterValue));
  }

  filterConditions(): void {
    const filterValue = this.conditionInput.nativeElement.value.toLowerCase();
    this.filteredConditions = this.conditions.filter(condition => condition.name.toLowerCase().includes(filterValue));
  }

  filterGrades(): void {
    const filterValue = this.gradeInput.nativeElement.value.toLowerCase();
    this.filteredGrades = this.grades.filter(grade => grade.name.toLowerCase().includes(filterValue));
  }

  filterRanges(): void {
    const filterValue = this.rangeInput.nativeElement.value.toLowerCase();
    this.filteredRanges = this.ranges.filter(range => range.name.toLowerCase().includes(filterValue));
  }

  filterThreads(): void {
    const filterValue = this.threadInput.nativeElement.value.toLowerCase();
    this.filteredThreads = this.threads.filter(thread => thread.name.toLowerCase().includes(filterValue));
  }

  filterSizes(): void {
    const filterValue = this.sizeInput.nativeElement.value.toLowerCase();
    // Since size has both metric and imperial, the display is both of those combined, so in the filter we have to 
    // compare against the exact same format as is used in the component display in the HTML.
    // That is: {{ size.sizeMetric }} (mm)/{{ size.sizeImperial }}(in)
    // NOTE: Even though I have &nbsp; spaces in the display, this has to have no spaces in order to match.
    this.filteredSizes = this.sizes.filter(size =>
      (size.sizeMetric.toString().toLowerCase() + "(mm)/" + size.sizeImperial.toString().toLowerCase() + "(in)").includes(filterValue));

  }

  filterWalls(): void {
    const filterValue = this.wallInput.nativeElement.value.toLowerCase();
    // See comment in filterSizes for the filter info.
    this.filteredWalls = this.walls.filter(wall =>
      (wall.wallMetric.toString().toLowerCase() + "(mm)/" + wall.wallImperial.toString().toLowerCase() + "(in)").includes(filterValue)
    );
  }

  filterWeights(): void {
    const filterValue = this.weightInput.nativeElement.value.toLowerCase();
    // See comment in filterSizes for the filter info.
    this.filteredWeights = this.weights.filter(weight =>
      (weight.weightInKgPerMeter.toString().toLowerCase() + "(kg/m)/" + weight.weightInLbsPerFoot.toString().toLowerCase() + "(lbs/ft)").includes(filterValue)
    );

  }

  // -- Event handlers for the input blur events ie. losing focus -- //
  onCoatingBlur(): void {
    const inputVal = this.coatingInput.nativeElement.value;
    if (!this.filteredCoatings.some(coating => coating.name.toLowerCase() === inputVal.toLowerCase())) {
      this.coatingControl.setValue('');
    }
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

  onGradeBlur(): void {
    const inputVal = this.gradeInput.nativeElement.value;
    if (!this.filteredGrades.some(grade => grade.name.toLowerCase() === inputVal.toLowerCase())) {
      this.gradeControl.setValue('');
    }
  }

  onRangeBlur(): void {
    const inputVal = this.rangeInput.nativeElement.value;
    if (!this.filteredRanges.some(range => range.name.toLowerCase() === inputVal.toLowerCase())) {
      this.rangeControl.setValue('');
    }
  }

  onThreadBlur(): void {
    const inputVal = this.threadInput.nativeElement.value;
    if (!this.filteredThreads.some(thread => thread.name.toLowerCase() === inputVal.toLowerCase())) {
      this.threadControl.setValue('');
    }
  }

  onSizeBlur(): void {
    const inputVal = this.sizeInput.nativeElement.value;

    // Find if any size matches the input display format exactly
    const matchedSize = this.filteredSizes.find(size =>
      `${size.sizeMetric}(mm)/${size.sizeImperial}(in)` == inputVal
    );

    //If no exact match is found, clear the control
    if (!matchedSize) {
      this.sizeControl.setValue('');
    }
  }

  onWallBlur(): void {
    const inputVal = this.wallInput.nativeElement.value;

    // Find if any wall matches the input display format exactly
    const matchedWall = this.filteredWalls.find(wall =>
      `${wall.wallMetric}(mm)/${wall.wallImperial}(in)` === inputVal
    );

    // If no exact match is found, clear the control
    if (!matchedWall) {
      this.wallControl.setValue('');
    }
  }


  onWeightBlur(): void {
    const inputVal = this.weightInput.nativeElement.value;

    // Find if any weight matches the input display format exactly
    const matchedWeight = this.filteredWeights.find(weight =>
      `${weight.weightInKgPerMeter}(kg/m)/${weight.weightInLbsPerFoot}(lbs/ft)` === inputVal
    );

    // If no exact match is found, clear the control
    if (!matchedWeight) {
      this.weightControl.setValue('');
    }
  }

  // -- Display functions for the pipe properties -- //
  displayCategory(category: PipeProperty_Category): string {
    return category ? category.name : '';
  }

  displayCoating(coating: PipeProperty_Coating): string {
    return coating ? coating.name : '';
  }

  displayCondition(condition: PipeProperty_Condition): string {
    return condition ? condition.name : '';
  }


  displayGrade(grade: PipeProperty_Grade): string {
    return grade ? grade.name : '';
  }

  displayRange(range: PipeProperty_Range): string {
    return range ? range.name : '';
  }

  displayThread(thread: PipeProperty_Thread): string {
    return thread ? thread.name : '';
  }

  displaySize(size: PipeProperty_Size): string {
    return size ? size.sizeMetric + "(mm)/" + size.sizeImperial + "(in)" : '';
  }

  displayWall(wall: PipeProperty_Wall): string {
    return wall ? wall.wallMetric + "(mm)/" + wall.wallImperial + "(in)" : '';
  }

  displayWeight(weight: PipeProperty_Weight): string {
    return weight ? weight.weightInKgPerMeter + "(kg/m)/" + weight.weightInLbsPerFoot + "(lbs/ft)" : '';
  }



}


