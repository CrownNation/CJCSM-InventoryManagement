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

@Component({
  selector: 'app-pipe-search',
  templateUrl: './pipe-search.component.html',
  styleUrls: ['./pipe-search.component.scss']
})
export class PipeSearchComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = [
    'category',
    'condition',
    'lengthInMeters',
    'lengthInFeet',
    'quantity',
    'rack',
    'tier',
    'actions'
  ];
  dataSource: MatTableDataSource<Pipe> = new MatTableDataSource<Pipe>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pipeForm!: FormGroup

  pipeDefinitionList: PipeDefinition[] = [];
  searchParams: PipeSearchParams | null = {
    pipeId: null,
    pipeDefinitionId: null,
    lengthInMeters: null,
    lengthInFeet: null
  };

  private destroy$ = new Subject<void>();

  pipe$: Observable<Pipe[]> = this.store.select(selectPipe);
  loadingPipe: Boolean = false;
  loading$: Observable<Boolean> = this.store.select((selectLoadingPipe));

  pipeDefinitionsList$: Observable<PipeDefinition[] | null> = this.store.select(selectPipeDefinitionsList);


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
        this.pipeDefinitionList = pipDefinitions;
      }
    });

    this.loading$.subscribe((loading) => {
      this.loadingPipe = loading;
    });

  }

  buildForm() {

    this.pipeForm = new FormGroup({
      pipeType: new FormControl('', []),
      lengthInMeters: new FormControl('', []),
      lengthInFeet: new FormControl('', [])
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
      lengthInMeters: this.pipeForm.value.lengthInMeters,
      lengthInFeet: this.pipeForm.value.lengthInFeet
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
      lengthInFeet: null
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
