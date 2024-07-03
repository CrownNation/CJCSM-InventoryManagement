import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PipeDefinition, PipeProperty_Category, PipeProperty_Condition } from 'src/app/models/pipe.model';
import { AppState } from 'src/app/store/core.state';
import { actionGetAllPipeProperties } from 'src/app/store/pipe-properties/pipe-properties/pipe-properties.actions';
import { selectCategories, selectConditions } from 'src/app/store/pipe-properties/pipe-properties/pipe-properties.selectors';

@Component({
  selector: 'app-pipe-definition-select',
  templateUrl: './pipe-definition-select.component.html',
  styleUrls: ['./pipe-definition-select.component.scss']
})
export class PipeDefinitionSelectComponent implements OnInit, OnDestroy {
  @ViewChild('categoryInput') categoryInput!: ElementRef<HTMLInputElement>;
  @ViewChild('conditionInput') conditionInput!: ElementRef<HTMLInputElement>;

  displayedColumns: string[] = ['Category', 'Coating', 'Condition', 'Grade', 'Range', 'Thread', 'Size Metric', 'Size Imperial', 'Wall Metric', 'Wall Imperial', 'Weight Metric', 'Weight Imperial'];

  categoryControl = new FormControl();
  conditionControl = new FormControl();
  pipeForm: FormGroup;

  private unsubscribe$ = new Subject<void>();
  dataSource = new MatTableDataSource<PipeDefinition>([]);

  categories$: Observable<PipeProperty_Category[]>;
  conditions$: Observable<PipeProperty_Condition[]>;

  categories: PipeProperty_Category[] = [];
  filteredCategories: PipeProperty_Category[] = [];

  conditions: PipeProperty_Condition[] = [];
  filteredConditions: PipeProperty_Condition[] = [];

  constructor(private store: Store<AppState>) {
    this.categories$ = this.store.select(selectCategories);
    this.conditions$ = this.store.select(selectConditions);

    this.pipeForm = new FormGroup({
      category: this.categoryControl,
      condition: this.conditionControl,
    });
  }

  ngOnInit(): void {
    this.loadPipeProperties();
    this.setupFilterSubscriptions();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadPipeProperties(): void {
    this.store.dispatch(actionGetAllPipeProperties());
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

  // filterCategories(): void {
  //   const filterValue = this.categoryInput.nativeElement.value.toLowerCase();
  //   this.filteredCategories = this.categories.filter(category => category.name.toLowerCase().includes(filterValue));
  // }

  // filterConditions(): void {
  //   const filterValue = this.conditionInput.nativeElement.value.toLowerCase();
  //   this.filteredConditions = this.conditions.filter(condition => condition.name.toLowerCase().includes(filterValue));
  // }
  filterCategories(): void {
    const filterValue = this.categoryInput.nativeElement.value.toLowerCase();
    this.filteredCategories = this.categories.filter(category => category.name.toLowerCase().includes(filterValue));
    console.log("NUM: " + this.filteredCategories.length)
  }

  filterConditions(): void {
    const filterValue = this.conditionInput.nativeElement.value.toLowerCase();
    this.filteredConditions = this.conditions.filter(condition => condition.name.toLowerCase().includes(filterValue));
  }


  onCategoryBlur(): void {
    const inputVal = this.categoryInput.nativeElement.value;
    if (!this.filteredCategories.some(category => category.name.toLowerCase() === inputVal.toLowerCase())) {
      this.categoryControl.setValue('');
    }
    console.log("Here we are mate.");
  }
  
  displayCategory(category: PipeProperty_Category): string {
    return category ? category.name : '';
  }

  displayCondition(condition: PipeProperty_Condition): string {
    return condition ? condition.name : '';
  }

  clearForm(): void {
    this.pipeForm.reset();
    console.log("Form has been cleared");
  }

  selectPipeDefinition(): void {
    console.log("Pipe definition selected");
    // Implement your selection logic here
  }

  cancel(): void {
    console.log("Operation cancelled");
    // Implement cancel logic
  }

  newFromFilters(): void {
    console.log("Creating new from filters with:", this.pipeForm.value);
    // Implement logic to create new from current filter settings
  }

  selectRow(row: any): void {
    console.log("Row selected:", row);
    // Implement row selection logic
  }

}




// import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
// import { MatTableDataSource } from '@angular/material/table';
// import { Store, select } from '@ngrx/store';
// import { Observable, Subject } from 'rxjs';
// import { filter, map, startWith, take, takeUntil, tap } from 'rxjs/operators';
// import { PipeDefinition, PipeDefinitionSearchParams, PipeProperty_Category, PipeProperty_Condition } from 'src/app/models/pipe.model';
// import { AppState } from 'src/app/store/core.state';
// import { actionGetAllPipeProperties } from 'src/app/store/pipe-properties/pipe-properties/pipe-properties.actions';
// import { selectAllPipeProperties, selectCategories, selectConditions } from 'src/app/store/pipe-properties/pipe-properties/pipe-properties.selectors';
// import { actionGetPipeDefinitionsList } from 'src/app/store/pipe/pipe.actions';
// import { selectPipeDefinitionsList } from 'src/app/store/pipe/pipe.selectors';

// @Component({
//   selector: 'app-pipe-definition-select',
//   templateUrl: './pipe-definition-select.component.html',
//   styleUrls: ['./pipe-definition-select.component.scss']
// })
// export class PipeDefinitionSelectComponent implements OnInit {
//   @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
//   @ViewChild('conditionInput') conditionInput: ElementRef<HTMLInputElement>;

//   categoryControl = new FormControl();
//   conditionControl = new FormControl();

//   private unsubscribe$ = new Subject<void>();
//   pipeForm!: FormGroup;
//   displayedColumns: string[] = ['Category', 'Coating', 'Condition', 'Grade', 'Range', 'Thread', 'Size Metric', 'Size Imperial', 'Wall Metric', 'Wall Imperial', 'Weight Metric', 'Weight Imperial'];
//   dataSource = new MatTableDataSource<PipeDefinition>([]);

//   pipeDefinitionsList$: Observable<PipeDefinition[] | null> = this.store.select(selectPipeDefinitionsList);

//   pipeDefinitionSearchParams: PipeDefinitionSearchParams = {
//     categoryId: null,
//     coatingId: null,
//     conditionId: null,
//     gradeId: null,
//     rangeId: null,
//     sizeId: null,
//     threadId: null,
//     wallId: null,
//     weightId: null
//   };

//   // Subject to manage the unsubscription of observables on component destruction to prevent memory leaks.
//   private destroy$ = new Subject<void>();

//   // Observable streams of filtered categories and conditions for UI binding, used for dropdown filtering.
//   filteredCategories: PipeProperty_Category[] = [];
//   filteredConditions: PipeProperty_Condition[] = [];

//   // Local arrays to hold the full list of categories and conditions retrieved from the store or backend.
//   categories: PipeProperty_Category[] = [];
//   conditions: PipeProperty_Condition[] = [];

//   // Observable streams from the store for categories and conditions, allowing the component to reactively update when store data changes.
//   categories$: Observable<PipeProperty_Category[]>;
//   conditions$: Observable<PipeProperty_Condition[]>;

//   constructor(private store: Store<AppState>) {
//     this.categories$ = this.store.select(selectCategories);
//     this.conditions$ = this.store.select(selectConditions);
//   }

//   ngOnInit(): void {
//     this.buildForm();
//     this.loadPipeDefinitions();
//     this.subscribeToPipeDefinitions();
//     this.loadPipePropertiesIfNeeded();
//     this.setupFilterSubscriptions();
//   }

//   ngOnDestroy(): void {
//     this.unsubscribe$.next();
//     this.unsubscribe$.complete();
//   }

//   buildForm() {
//     this.pipeForm = new FormGroup({
//       category: this.categoryControl,
//       condition: this.conditionControl,
//     });
//   }

//   subscribeToPipeDefinitions(): void {
//     // Subscribes to the observable of pipe definitions and updates the table data source when it changes.
//     this.pipeDefinitionsList$.subscribe(definitions => {
//       if (definitions) {
//         this.dataSource.data = definitions;
//       }
//     });
//   }

//   loadPipeDefinitions() {
//     this.store.dispatch(actionGetPipeDefinitionsList({ searchParams: this.pipeDefinitionSearchParams }));
//   }

//   loadPipePropertiesIfNeeded() {
//     this.store.select(selectAllPipeProperties).pipe(
//       take(1),
//       tap(pipeProperties => {
//         if (!pipeProperties) {
//           console.log('PipeProperties is null, dispatching action to fetch all pipe properties');
//           this.store.dispatch(actionGetAllPipeProperties());
//         }
//       }),
//       filter(pipeProperties => !!pipeProperties), // Ensure properties are not null
//       tap(() => {
//         this.setupFilterSubscriptions(); // Setup filters after ensuring properties are loaded
//       })
//     ).subscribe();
//   }

//   setupFilterSubscriptions() {
//     this.categories$.pipe(takeUntil(this.destroy$)).subscribe(categories => {
//       this.categories = categories;
//       this.filteredCategories = categories;
//     });

//     this.conditions$.pipe(takeUntil(this.destroy$)).subscribe(conditions => {
//       this.conditions = conditions;
//       this.filteredConditions = conditions;
//     });
//   }

//   filterCategories(): void {
//     const filterValue = this.categoryInput.nativeElement.value.toLowerCase();
//     this.filteredCategories = this.categories.filter(category => category.name.toLowerCase().includes(filterValue));
//   }

//   filterConditions(): void {
//     const filterValue = this.conditionInput.nativeElement.value.toLowerCase();
//     this.filteredConditions = this.conditions.filter(condition => condition.name.toLowerCase().includes(filterValue));
//   }

//   filter(): void {
//     console.log("Filtering based on:", this.pipeForm.value);
//     // Implement your filter logic here
//   }

//   clearForm(): void {
//     this.pipeForm.reset();
//     console.log("Form has been cleared");
//   }

//   selectPipeDefinition(): void {
//     console.log("Pipe definition selected");
//     // Implement your selection logic here
//   }

//   cancel(): void {
//     console.log("Operation cancelled");
//     // Implement cancel logic
//   }

//   newFromFilters(): void {
//     console.log("Creating new from filters with:", this.pipeForm.value);
//     // Implement logic to create new from current filter settings
//   }

//   selectRow(row: any): void {
//     console.log("Row selected:", row);
//     // Implement row selection logic
//   }

//   displayCategory(category: PipeProperty_Category): string {
//     return category ? category.name : '';
//   }

//   displayCondition(condition: PipeProperty_Condition): string {
//     return condition ? condition.name : '';
//   }

//   onBlur(controlName: 'category' | 'condition'): void {
//     const control = this.pipeForm.get(controlName) as FormControl;
//     const data: (PipeProperty_Category | PipeProperty_Condition)[] = controlName === 'category' ? this.categories : this.conditions;

//     if (control && control.value && typeof control.value === 'string') {
//       const validOption = data.find(item => item.name === control.value);
//       control.setValue(validOption ? validOption : '');
//     }
//   }
// }
