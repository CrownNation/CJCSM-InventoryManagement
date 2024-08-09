import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

import { EquipmentDefinition, EquipmentDefinitionCreate, EquipmentDefinitionSearchParams } from 'src/app/models/equipment.model';
import { AppState } from 'src/app/store/core.state';
import { actionGetEquipmentDefinitions } from 'src/app/store/equipment-definition/equipment-definition.actions';
import { selectAllEquipmentDefinitions, selectLoadingEquipmentDefinitions } from 'src/app/store/equipment-definition/equipment-definition.selectors';
import { EquipmentDefinitionService } from 'src/app/core/services/equipment-definition-service/equipment-definition.service';
import { PipeProperty_Grade, PipeProperty_Size } from 'src/app/models/pipe.model';
import { selectGrades, selectSizes } from 'src/app/store/pipe-properties/pipe-properties/pipe-properties.selectors';
import { SelectionModel } from '@angular/cdk/collections';
import { actionGetAllPipeProperties } from 'src/app/store/pipe-properties/pipe-properties/pipe-properties.actions';

@Component({
  selector: 'app-equipment-definition-select',
  templateUrl: './equipment-definition-select.component.html',
  styleUrls: ['./equipment-definition-select.component.scss']
})
export class EquipmentDefinitionSelectComponent implements OnInit, OnDestroy {
  @ViewChild('errorLabel') errorLabel!: ElementRef;

  @ViewChild('gradeInput') gradeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('sizeInput') sizeInput!: ElementRef<HTMLInputElement>;

  displayedColumns: string[] = ['Category', 'Grade', 'Size Metric', 'Size Imperial', 'Description'];

  descriptionFormControl = new FormControl();
  categoryFormControl = new FormControl();
  gradeFormControl = new FormControl();
  sizeFormControl = new FormControl();
  

  equipmentForm: FormGroup;

  private unsubscribe$ = new Subject<void>();

  dataSource = new MatTableDataSource<EquipmentDefinition>([]);

  equipmentDefinitionsList$: Observable<EquipmentDefinition[] | null> = this.store.select(selectAllEquipmentDefinitions);

  loadingEquipmentDefinitions: Boolean = false;
  loading$: Observable<Boolean> = this.store.select(selectLoadingEquipmentDefinitions);


  equipmentSearchParams: EquipmentDefinitionSearchParams = {
    category: null,
    description: null,
    gradeId: null,
    sizeId: null,
    isActive: true
  };

  selection = new SelectionModel<EquipmentDefinition>(false, []); // false for single selection

  grades$: Observable<PipeProperty_Grade[]>;
  sizes$: Observable<PipeProperty_Size[]>;

  grades: PipeProperty_Grade[] = [];
  sizes: PipeProperty_Size[] = [];
  filteredGrades: PipeProperty_Grade[] = [];
  filteredSizes: PipeProperty_Size[] = [];

  categories = [
    { name: 'Collar', value: 'Collar' },
    { name: 'Stabbing Guide', value: 'StabbingGuide' },
    { name: 'Pup Joint', value: 'PupJoint' },
    { name: 'Drift', value: 'Drift' }
  ];

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<EquipmentDefinitionSelectComponent>,
    private snackBar: MatSnackBar,
    private equipmentDefinitionService: EquipmentDefinitionService
  ) {
    this.grades$ = this.store.select(selectGrades);
    this.sizes$ = this.store.select(selectSizes);



    this.equipmentForm = new FormGroup({
      description: this.descriptionFormControl,
      category: this.categoryFormControl,
      grade: this.gradeFormControl,
      size: this.sizeFormControl
    });


  }

  ngOnInit(): void {
    this.loading$.pipe(takeUntil(this.unsubscribe$)).subscribe(loading => {
      this.loadingEquipmentDefinitions = loading;
    });

    console.log("Equipment form controls:");
    console.log(this.equipmentForm.controls);

    this.store.dispatch(actionGetAllPipeProperties());
    this.loadEquipmentDefinitions();
    this.subscribeToEquipmentDefinitions();
    this.setupFilterSubscriptions();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadEquipmentDefinitions() {
    console.log("Loading equipment definitions.");
    this.store.dispatch(actionGetEquipmentDefinitions({ searchParams: this.equipmentSearchParams }));
  }

  subscribeToEquipmentDefinitions(): void {
    this.equipmentDefinitionsList$.subscribe(definitions => {
      if (definitions) {
        this.dataSource.data = definitions;
      }
    });
  }

  setupFilterSubscriptions(): void {
    this.grades$.pipe(takeUntil(this.unsubscribe$)).subscribe(grades => {
      this.grades = grades;
      this.filteredGrades = grades;
    });

    this.sizes$.pipe(takeUntil(this.unsubscribe$)).subscribe(sizes => {
      this.sizes = sizes;
      this.filteredSizes = sizes;
    });

  }


  filter(): void {
    this.setSearchParametersFromForm();

    console.log("Current searchParams:", this.equipmentSearchParams); // Log the current search parameters

    this.store.dispatch(actionGetEquipmentDefinitions({ searchParams: this.equipmentSearchParams }));
  }

  private setSearchParametersFromForm(): void {
    this.equipmentSearchParams = {
      // Use the ternary operator to check if the value is defined; if not, set it to null
      category: this.categoryFormControl.value ? this.categoryFormControl.value : null,
      description: this.descriptionFormControl.value ? this.descriptionFormControl.value : null,
      gradeId: this.equipmentForm.value.grade ? this.equipmentForm.value.grade.pipeProperty_GradeId : null,
      sizeId: this.equipmentForm.value.size ? this.equipmentForm.value.size.pipeProperty_SizeId : null,
      isActive: true
    };
  }

  clearForm(): void {
    this.equipmentForm.reset();
    this.equipmentSearchParams = { category: null, description: null, gradeId: null, sizeId: null, isActive: true };

    this.filteredGrades = [];
    this.filteredSizes = [];

    this.store.dispatch(actionGetEquipmentDefinitions({ searchParams: this.equipmentSearchParams }));
  }

  selectEquipmentDefinition(): void {
    if (this.selection.isEmpty()) {
//      this.showSnackBar("Please select an equipment definition to continue.");
      this.showSnackBar("Please select an equipment definition to continue.", 'Close', { panelClass: ['error-snack-bar'] });

      return;
    }

    const selectedEquipmentDefinition: EquipmentDefinition = this.selection.selected[0];
    console.log("Selected equipment definition:", selectedEquipmentDefinition.category);
    this.dialogRef.close(selectedEquipmentDefinition);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  newFromFilters(): void {
    // Check for null values in filters
    if (Object.values(this.equipmentForm.value).some(value => value === null)) {
      this.showSnackBar("All filters must be set before creating a new equipment definition.", 'Close', { panelClass: ['error-snack-bar'] });
      return;
    }

    // Local check for existing equipment definitions
    const localCheck = this.dataSource.data.some(def =>
      def.category === this.equipmentSearchParams.category &&
      def.gradeId === this.equipmentSearchParams.gradeId &&
      def.sizeId === this.equipmentSearchParams.sizeId &&
      def.isActive === this.equipmentSearchParams.isActive
    );

    if (localCheck) {
      this.showSnackBar("An equipment definition with these properties already exists.", 'Close', { panelClass: ['error-snack-bar'] });
      return;
    }

    this.setSearchParametersFromForm(); // Ensure parameters are set from form

    console.log("CHECKING FOR EXISTS ON SERVER: ", this.equipmentSearchParams);
    this.equipmentDefinitionService.checkEquipmentDefinitionExists(this.equipmentSearchParams).pipe(
      switchMap((exists : boolean) => {
        console.log("Does it exists? ", exists, typeof exists);
        if (exists === false) {
          // If the equipment definition does not exist, attempt to create it
          return this.createEquipmentDefinition(this.equipmentSearchParams);
        } else {
          // If it does exist, show a notification and complete the observable without emitting
          this.showSnackBar("An equipment definition with these properties already exists on the server.", 'Close', { panelClass: ['error-snack-bar'] });
          return EMPTY;
        }
      })
    ).subscribe({
      next: (result) => {
        // Handle successful creation
        console.log("Equipment definition created successfully:", result);
        this.showSnackBar("New equipment definition created successfully!", 'Close', { panelClass: ['confirmation-snack-bar'] });
        this.loadEquipmentDefinitions(); // Reload or refresh data
      },
      error: (error) => {
        // Handle error in creation
        this.showSnackBar("Failed to create equipment definition.", 'Close', { panelClass: ['error-snack-bar'] });
        console.error("Failed to create equipment definition:", error);
      }
    });

  }


  // Method to Create Equipment Definition
  createEquipmentDefinition(params: EquipmentDefinitionSearchParams): Observable<EquipmentDefinition> {
    const newDef: EquipmentDefinitionCreate = {
      category: params.category!,
      gradeId: params.gradeId!,
      sizeId: params.sizeId!,
      isActive: true,
      description: params.description,
      notes: ''
    };

    // Return the Observable without subscribing here
    return this.equipmentDefinitionService.createEquipmentDefinition(newDef);
  }


  // showSnackBar(message: string, action: string = 'Close', config: any = { duration: 5000, panelClass: ['snack-bar'] }) {
  //   this.snackBar.open(message, action, config);
  // }



  showSnackBar(message: string, action: string = 'Close', customConfig: any = {}) {
    const defaultConfig = { duration: 5000, panelClass: ['snack-bar'] };
    const config = {...defaultConfig, ...customConfig}; // Merge default config with custom config
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
  this.selectEquipmentDefinition();
} 

  onGradeBlur(): void {
    const inputVal = this.gradeInput.nativeElement.value;
    if (!this.filteredGrades.some(grade => grade.name.toLowerCase() === inputVal.toLowerCase())) {
      this.gradeFormControl.setValue('');
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
      this.sizeFormControl.setValue('');
    }
  }


  filterGrades(): void {
    const filterValue = this.gradeInput.nativeElement.value.toLowerCase();
    this.filteredGrades = this.grades.filter(grade => grade.name.toLowerCase().includes(filterValue));
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


  displaySize(size: PipeProperty_Size): string {
    return size ? size.sizeMetric + "(mm)/" + size.sizeImperial + "(in)" : '';
  }

  displayGrade(grade: PipeProperty_Grade): string {
    return grade ? grade.name : '';
  }

}
