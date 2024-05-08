import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, Subscription, combineLatest } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { PipeProperty_Thread } from 'src/app/models/pipe.model';
import { AppState } from '../../store/core.state';

import {
  selectAllThreads,
  selectCreatingThreadError,
  selectErrorLoadingThreads,
  selectLoadingThreads,
  selectSelectedThreadError,
  selectCreatedThread,
  selectUpdatedThread
} from 'src/app/store/pipe-properties/pipe-property-thread/pipe-property-thread.selectors';
import {
  actionCreatePipeProperty_Thread,
  actionGetThreads,
  actionUpdatePipeProperty_Thread,
  resetThreadNotifications,
} from 'src/app/store/pipe-properties/pipe-property-thread/pipe-property-thread.actions';

@Component({
  selector: 'app-pipe-property-thread',
  templateUrl: './pipe-property-thread.component.html',
  styleUrls: ['./pipe-property-thread.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PipePropertyThreadComponent implements OnInit, OnDestroy {

  loadingThreadsSubscription: Subscription | undefined;

  dataSource: MatTableDataSource<PipeProperty_Thread>;
  displayedColumns: string[] = ['name', 'isActive', 'actions'];
  threadForm: FormGroup;
  editingThread: PipeProperty_Thread | null = null;
  loadingThreads$: Observable<boolean> | undefined;
  private destroy$ = new Subject<void>();

  errorMessage$: Observable<string>;
  isThreadCreated$: Observable<boolean>;
  isThreadUpdated$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.threadForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true, Validators.required]
    });
    this.dataSource = new MatTableDataSource<PipeProperty_Thread>([]);

    this.errorMessage$ = combineLatest([
      this.store.select(selectErrorLoadingThreads),
      this.store.select(selectCreatingThreadError),
      this.store.select(selectSelectedThreadError)
    ]).pipe(
      map(([loadingError, creatingError, selectedError]) => loadingError || creatingError || selectedError ? "An error occurred" : '')
    );

    this.isThreadCreated$ = this.store.select(selectCreatedThread).pipe(map(thread => !!thread));
    this.isThreadUpdated$ = this.store.select(selectUpdatedThread).pipe(map(thread => !!thread));
  }

  ngOnInit(): void {
    this.loadingThreads$ = this.store.select(selectLoadingThreads);
    this.store.dispatch(actionGetThreads({ searchParams: null }));
    this.store.pipe(
      select(selectAllThreads),
      takeUntil(this.destroy$)
    ).subscribe(threads => this.dataSource.data = threads);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.loadingThreadsSubscription) {
      this.loadingThreadsSubscription.unsubscribe();
    }
    this.checkAndResetNotifications();
  }

  selectThread(thread: PipeProperty_Thread): void {
    this.editingThread = thread;
    this.threadForm.patchValue(thread);
    this.checkAndResetNotifications();
  }

  checkAndResetNotifications(): void {
    combineLatest([
      this.store.select(selectCreatedThread),
      this.store.select(selectUpdatedThread),
      this.store.select(selectErrorLoadingThreads),
      this.store.select(selectCreatingThreadError),
      this.store.select(selectSelectedThreadError)
    ]).pipe(
      take(1)
    ).subscribe(([created, updated, loadingError, creatingError, selectedError]) => {
      if (created || updated || loadingError || creatingError || selectedError) {
        this.store.dispatch(resetThreadNotifications());
      }
    });
  }

  saveOrUpdateThread(): void {
    if (this.editingThread) {
      const threadId = this.editingThread.pipeProperty_ThreadId;
      const threadUpdate = {
        ...this.editingThread,
        ...this.threadForm.value
      };
      this.store.dispatch(actionUpdatePipeProperty_Thread({ id: threadId, thread: threadUpdate }));
    } else {
      this.store.dispatch(actionCreatePipeProperty_Thread({ threadCreate: this.threadForm.value }));
    }
    this.resetForm();
  }

  resetForm(): void {
    this.editingThread = null;
    this.threadForm.reset({ name: '', isActive: true });
    this.checkAndResetNotifications();
  }
}
