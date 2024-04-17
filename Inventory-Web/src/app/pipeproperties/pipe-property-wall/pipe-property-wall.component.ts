import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, combineLatest, Subscription } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { PipeProperty_Wall } from 'src/app/models/pipe.model';
import { AppState } from '../../store/core.state';

import {
  selectAllWalls,
  selectCreatingWallError,
  selectErrorLoadingWalls,
  selectLoadingWalls,
  selectSelectedWallError,
  selectCreatedWall,
  selectUpdatedWall
} from 'src/app/store/pipe-properties/pipe-property-wall/pipe-property-wall.selectors';
import {
  actionCreatePipeProperty_Wall,
  actionGetWalls,
  actionUpdatePipeProperty_Wall,
  resetWallNotifications,
} from 'src/app/store/pipe-properties/pipe-property-wall/pipe-property-wall.actions';

@Component({
  selector: 'app-pipe-property-wall',
  templateUrl: './pipe-property-wall.component.html',
  styleUrls: ['./pipe-property-wall.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PipePropertyWallComponent implements OnInit, OnDestroy {

  loadingWallsSubscription: Subscription | undefined;

  dataSource: MatTableDataSource<PipeProperty_Wall>;
  displayedColumns: string[] = ['wallMetric', 'wallImperial', 'isActive', 'actions'];
  wallForm: FormGroup;
  editingWall: PipeProperty_Wall | null = null;
  loadingWalls$: Observable<boolean> | undefined;
  private destroy$ = new Subject<void>();

  errorMessage$: Observable<string>;
  isWallCreated$: Observable<boolean>;
  isWallUpdated$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.wallForm = this.fb.group({
      wallMetric: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,3})?$/)]],
      wallImperial: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,3})?$/)]],
      isActive: [true, Validators.required]
    });
    this.dataSource = new MatTableDataSource<PipeProperty_Wall>([]);

    this.errorMessage$ = combineLatest([
      this.store.select(selectErrorLoadingWalls),
      this.store.select(selectCreatingWallError),
      this.store.select(selectSelectedWallError)
    ]).pipe(
      map(([loadingError, creatingError, selectedError]) => loadingError || creatingError || selectedError ? "An error occurred" : '')
    );

    this.isWallCreated$ = this.store.select(selectCreatedWall).pipe(map(wall => !!wall));
    this.isWallUpdated$ = this.store.select(selectUpdatedWall).pipe(map(wall => !!wall));
  }

  ngOnInit(): void {
    this.loadingWalls$ = this.store.select(selectLoadingWalls);
    this.store.dispatch(actionGetWalls({ searchParams: null }));
    this.store.pipe(
      select(selectAllWalls),
      takeUntil(this.destroy$)
    ).subscribe(walls => this.dataSource.data = walls);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.loadingWallsSubscription) {
      this.loadingWallsSubscription.unsubscribe();
    }
    this.checkAndResetNotifications();
  }

  selectWall(wall: PipeProperty_Wall): void {
    this.editingWall = wall;
    this.wallForm.patchValue(wall);
    this.checkAndResetNotifications();
  }

  checkAndResetNotifications(): void {
    combineLatest([
      this.store.select(selectCreatedWall),
      this.store.select(selectUpdatedWall),
      this.store.select(selectErrorLoadingWalls),
      this.store.select(selectCreatingWallError),
      this.store.select(selectSelectedWallError)
    ]).pipe(
      take(1)
    ).subscribe(([created, updated, loadingError, creatingError, selectedError]) => {
      if (created || updated || loadingError || creatingError || selectedError) {
        this.store.dispatch(resetWallNotifications());
      }
    });
  }

  saveOrUpdateWall(): void {
    if (this.editingWall) {
      const wallId = this.editingWall.pipeProperty_WallId;
      const wallUpdate = {
        ...this.editingWall,
        ...this.wallForm.value
      };
      this.store.dispatch(actionUpdatePipeProperty_Wall({ id: wallId, wall: wallUpdate }));
    } else {
      this.store.dispatch(actionCreatePipeProperty_Wall({ wallCreate: this.wallForm.value }));
    }
    this.resetForm();
  }

  resetForm(): void {
    this.editingWall = null;
    this.wallForm.reset({ wallMetric: '', wallImperial: '', isActive: true });
    this.checkAndResetNotifications();
  }
}
