import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { PipePropertiesService } from "src/app/core/services/pipe-properties-service/pipe-properties.service";

import {
    actionGetSizes,
    actionGetSizesSuccess,
    actionGetSizesError,
    actionCreatePipeProperty_Size,
    actionCreatePipeProperty_SizeSuccess,
    actionCreatePipeProperty_SizeError,
    actionUpdatePipeProperty_Size,
    actionUpdatePipeProperty_SizeSuccess,
    actionUpdatePipeProperty_SizeError
} from './pipe-property-size.actions';

@Injectable()
export class PipeProperty_SizeEffects {

  constructor(
      private actions$: Actions,
      private pipePropertiesService: PipePropertiesService,
  ) {}

  loadSizes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGetSizes),
      switchMap(() =>
        this.pipePropertiesService.getSize(null).pipe(
          map(sizes => actionGetSizesSuccess({ sizes })),
          catchError(errorLoadingSizes => of(actionGetSizesError({ errorLoadingSizes })))
        )
      )
    )
  );

  createSize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCreatePipeProperty_Size),
      switchMap(data =>
        this.pipePropertiesService.createSize(data.sizeCreate).pipe(
          map(size => actionCreatePipeProperty_SizeSuccess({ size })),
          catchError(errorCreatingSize => of(actionCreatePipeProperty_SizeError({ errorCreatingSize })))
        )
      )
    )
  );

  updateSize$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionUpdatePipeProperty_Size),
      switchMap(({ id, size }) =>
        this.pipePropertiesService.updateSize(id, size).pipe(
          map(() => actionUpdatePipeProperty_SizeSuccess({ id, size })),
          catchError(errorUpdatingSize => of(actionUpdatePipeProperty_SizeError({ errorUpdatingSize: errorUpdatingSize })))
        )
      )
    )
  );
  
}
