import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { PipePropertiesService } from "src/app/core/services/pipe-properties-service/pipe-properties.service";

import {
    actionGetRanges,
    actionGetRangesSuccess,
    actionGetRangesError,
    actionCreatePipeProperty_Range,
    actionCreatePipeProperty_RangeSuccess,
    actionCreatePipeProperty_RangeError,
    actionUpdatePipeProperty_Range,
    actionUpdatePipeProperty_RangeSuccess,
    actionUpdatePipeProperty_RangeError
} from './pipe-property-range.actions';

@Injectable()
export class PipeProperty_RangeEffects {

  constructor(
      private actions$: Actions,
      private pipePropertiesService: PipePropertiesService,
  ) {}

  loadRanges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGetRanges),
      switchMap(() =>
        this.pipePropertiesService.getRange(null).pipe(
          map(ranges => actionGetRangesSuccess({ ranges })),
          catchError(errorLoadingRanges => of(actionGetRangesError({ errorLoadingRanges })))
        )
      )
    )
  );

  createRange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCreatePipeProperty_Range),
      switchMap(data =>
        this.pipePropertiesService.createRange(data.rangeCreate).pipe(
          map(range => actionCreatePipeProperty_RangeSuccess({ range })),
          catchError(errorCreatingRange => of(actionCreatePipeProperty_RangeError({ errorCreatingRange })))
        )
      )
    )
  );

  updateRange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionUpdatePipeProperty_Range),
      switchMap(({ id, range }) =>
        this.pipePropertiesService.updateRange(id, range).pipe(
          map(() => actionUpdatePipeProperty_RangeSuccess({ id, range })),
          catchError(errorUpdatingRange => of(actionUpdatePipeProperty_RangeError({ error: errorUpdatingRange })))
        )
      )
    )
  );
  
}
