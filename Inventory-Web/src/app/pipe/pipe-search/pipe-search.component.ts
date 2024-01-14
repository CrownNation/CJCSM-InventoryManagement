import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../models/customer.model';
import { Pipe, PipeDefinition, PipeSearchParams } from '../../models/pipe.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectLoadingPipe, selectPipe, selectPipeDefinitionsList } from '../../store/pipe/pipe.selectors';
import { actionGetPipe, actionGetPipeById } from '../../store/pipe/pipe.actions';
import { Rack } from '../../models/rack.model';
import { selectRacks } from '../../store/rack/rack.selectors';

@Component({
  selector: 'app-pipe-search',
  templateUrl: './pipe-search.component.html',
  styleUrls: ['./pipe-search.component.scss']
})
export class PipeSearchComponent implements OnInit, AfterViewInit, OnDestroy {

  // Pipe Summary headings: Qty, Length in Meters, Rack #, Tier Number, Category
  // Search criteria = Category, Rack, Condition

  displayedColumns: string[] = [
    'quantity',
    'lengthInMeters',
    'rack',
    'tier',
    'category',
    'condition',
    'actions'
  ];
  dataSource: MatTableDataSource<Pipe> = new MatTableDataSource<Pipe>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pipeForm!: FormGroup

  pipeDefinitionList: PipeDefinition[] = [];
  racks: Rack[] = [];
  searchParams: PipeSearchParams | null = {
    pipeId: null,
    pipeDefinitionId: null,
    lengthInMeters: null,
    lengthInFeet: null,
    categoryId: null,
    conditionId: null,
    rackId: null
  };

  private destroy$ = new Subject<void>();
  pipe$: Observable<Pipe[]> = this.store.select(selectPipe);
  loadingPipe: Boolean = false;
  loading$: Observable<Boolean> = this.store.select((selectLoadingPipe));

  pipeDefinitionsList$: Observable<PipeDefinition[] | null> = this.store.select(selectPipeDefinitionsList);
  racks$: Observable<Rack[]> = this.store.select(selectRacks);


  constructor(
    private store: Store<AppState>)
  {  }


  ngOnInit(): void {

    this.buildForm();
    this.loadingPipe = true;
    this.store.dispatch(actionGetPipe({searchParams: this.searchParams}));


    this.pipe$.pipe(takeUntil(this.destroy$)).subscribe((pipe) => {
      if (pipe) {
        this.dataSource = new MatTableDataSource(pipe as Pipe[]);
        this.loadingPipe = false;

        if(pipe.length > 0)
          this.store.dispatch(actionGetPipeById({pipeId: pipe[0].pipeId}));
        }
    });

    this.pipeDefinitionsList$.pipe(takeUntil(this.destroy$)).subscribe((pipDefinitions) => {
      if (pipDefinitions) {
        console.log(pipDefinitions);
        this.pipeDefinitionList = pipDefinitions;
      }
    });

    this.loading$.subscribe((loading) => {
      this.loadingPipe = loading;
    });

    this.racks$.pipe(takeUntil(this.destroy$)).subscribe((racks) => {
      if (racks) {
        this.racks = racks;
      }
    });

  }

  buildForm() {

    this.pipeForm = new FormGroup({
      category: new FormControl('', []),
      condition: new FormControl('', []),
      rack: new FormControl('', [])
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

  filter()  {
    this.searchParams = {
      pipeId: null,
      pipeDefinitionId: this.pipeForm.value.pipeType,
      lengthInMeters: null,
      lengthInFeet: null,
      categoryId: this.pipeForm.value.category,
      conditionId: this.pipeForm.value.condition,
      rackId: this.pipeForm.value.rack

    };
    this.loadingPipe = true;
    this.store.dispatch(actionGetPipe({searchParams: this.searchParams}));
  }

  clearForm() {
    this.pipeForm.reset();
    this.searchParams = {
      pipeId: null,
      pipeDefinitionId: null,
      lengthInMeters: null,
      lengthInFeet: null,
      categoryId: null,
      conditionId: null,
      rackId: null
    };

    this.store.dispatch(actionGetPipe({searchParams: this.searchParams}));
  }

  viewCustomer(pipe: Pipe) {
    this.store.dispatch(actionGetPipeById({pipeId: pipe.pipeId}));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
