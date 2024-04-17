import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { PipePropertiesService } from "src/app/core/services/pipe-properties-service/pipe-properties.service";

import {
    actionGetThreads,
    actionGetThreadsSuccess,
    actionGetThreadsError,
    actionCreatePipeProperty_Thread,
    actionCreatePipeProperty_ThreadSuccess,
    actionCreatePipeProperty_ThreadError,
    actionUpdatePipeProperty_Thread,
    actionUpdatePipeProperty_ThreadSuccess,
    actionUpdatePipeProperty_ThreadError
} from './pipe-property-thread.actions';

@Injectable()
export class PipeProperty_ThreadEffects {

  constructor(
      private actions$: Actions,
      private pipePropertiesService: PipePropertiesService,
  ) {}

  loadThreads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGetThreads),
      switchMap(() =>
        this.pipePropertiesService.getThread(null).pipe(
          map(threads => actionGetThreadsSuccess({ threads })),
          catchError(errorLoadingThreads => of(actionGetThreadsError({ errorLoadingThreads })))
        )
      )
    )
  );

  createThread$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCreatePipeProperty_Thread),
      switchMap(data =>
        this.pipePropertiesService.createThread(data.threadCreate).pipe(
          map(thread => actionCreatePipeProperty_ThreadSuccess({ thread })),
          catchError(errorCreatingThread => of(actionCreatePipeProperty_ThreadError({ errorCreatingThread })))
        )
      )
    )
  );

  updateThread$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionUpdatePipeProperty_Thread),
      switchMap(({ id, thread }) =>
        this.pipePropertiesService.updateThread(id, thread).pipe(
          map(() => actionUpdatePipeProperty_ThreadSuccess({ id, thread })),
          catchError(errorUpdatingThread => of(actionUpdatePipeProperty_ThreadError({ error: errorUpdatingThread })))
        )
      )
    )
  );
  
}
