import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { PipePropertiesService } from "src/app/core/services/pipe-properties-service/pipe-properties.service";

import {
    actionGetWeights,
    actionGetWeightsSuccess,
    actionGetWeightsError,
    actionCreatePipeProperty_Weight,
    actionCreatePipeProperty_WeightSuccess,
    actionCreatePipeProperty_WeightError,
    actionUpdatePipeProperty_Weight,
    actionUpdatePipeProperty_WeightSuccess,
    actionUpdatePipeProperty_WeightError
} from './pipe-property-weight.actions';

@Injectable()
export class PipeProperty_WeightEffects {

  constructor(
      private actions$: Actions,
      private pipePropertiesService: PipePropertiesService,
  ) {}

  loadWeights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGetWeights),
      switchMap(() =>
        this.pipePropertiesService.getWeights(null).pipe(
          map(weights => actionGetWeightsSuccess({ weights })),
          catchError(errorLoadingWeights => of(actionGetWeightsError({ errorLoadingWeights })))
        )
      )
    )
  );

  createWeight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCreatePipeProperty_Weight),
      switchMap(({ weightCreate }) =>
        this.pipePropertiesService.createWeight(weightCreate).pipe(
          map(weight => actionCreatePipeProperty_WeightSuccess({ weight })),
          catchError(errorCreatingWeight => of(actionCreatePipeProperty_WeightError({ errorCreatingWeight })))
        )
      )
    )
  );

  updateWeight$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionUpdatePipeProperty_Weight),
      switchMap(({ id, weight }) =>
        this.pipePropertiesService.updateWeight(id, weight).pipe(
          map(() => actionUpdatePipeProperty_WeightSuccess({ id, weight })),
          catchError(errorUpdatingWeight => of(actionUpdatePipeProperty_WeightError({ errorUpdatingWeight: errorUpdatingWeight })))
        )
      )
    )
  );
  
}
