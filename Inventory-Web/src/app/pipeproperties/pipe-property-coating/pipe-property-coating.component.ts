import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PipeProperty_Coating } from 'src/app/models/pipe.model';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, Subscription, combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AppState } from '../../store/core.state';
import {
  actionGetCoatings,
  actionCreatePipeProperty_Coating,
  actionUpdatePipeProperty_Coating,
  actionGetCoatingsSuccess,
  actionGetCoatingsError
} from 'src/app/store/pipe-properties/pipe-property-coating/pipe-property-coating.actions';
import {
  selectAllCoatings,
  selectLoadingCoatings,
  selectErrorLoadingCoatings,
  selectCreatingCoatingError
} from 'src/app/store/pipe-properties/pipe-property-coating/pipe-property-coating.selectors';

@Component({
  selector: 'app-pipe-property-coating',
  templateUrl: './pipe-property-coating.component.html',
  styleUrls: ['./pipe-property-coating.component.scss']
})
export class PipePropertyCoatingComponent implements OnInit, OnDestroy {

  loadingCoatingsSubscription : Subscription | undefined;

  dataSource: MatTableDataSource<PipeProperty_Coating>;
  displayedColumns: string[] = ['name', 'isActive', 'actions'];
  coatingForm: FormGroup;
  editingCoating: PipeProperty_Coating | null = null;
  loadingCoatings$: Observable<boolean>;
  errorMessage$: Observable<string>;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.loadingCoatings$ = this.store.pipe(select(selectLoadingCoatings));
    this.coatingForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true, Validators.required]
    });
    this.dataSource = new MatTableDataSource<PipeProperty_Coating>([]);

    this.errorMessage$ = combineLatest([
      this.store.select(selectErrorLoadingCoatings),
      this.store.select(selectCreatingCoatingError)
    ]).pipe(
      map(([loadingError, creatingError]) => {
        return loadingError || creatingError ? "An error occurred" : ''; // Customize based on actual error handling needs
      })
    );
  }

  ngOnInit(): void {
    console.log("COATINGS INIT");
    this.store.dispatch(actionGetCoatings({ searchParams: null }));
    this.store.pipe(
      select(selectAllCoatings),
      takeUntil(this.destroy$)
    ).subscribe(coatings => this.dataSource.data = coatings);

    this.loadingCoatingsSubscription = this.store.select(selectLoadingCoatings)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(loading => {
      console.log('loadingCoatings$ value:', loading);
    }
  );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectCoating(coating: PipeProperty_Coating): void {
    this.editingCoating = coating;
    this.coatingForm.patchValue(coating);
  }

  saveOrUpdateCoating(): void {
    if (this.editingCoating) {
      const coatingId = this.editingCoating.pipeProperty_CoatingId; // Adjust based on your model
      const coatingUpdate = {
        ...this.editingCoating,
        ...this.coatingForm.value
      };
      this.store.dispatch(actionUpdatePipeProperty_Coating({ id: coatingId, coating: coatingUpdate }));
    } else {
      this.store.dispatch(actionCreatePipeProperty_Coating({ coatingCreate: this.coatingForm.value }));
    }
    this.resetForm();
  }

  resetForm(): void {
    this.editingCoating = null;
    this.coatingForm.reset({ name: '', isActive: true });
  }
}
