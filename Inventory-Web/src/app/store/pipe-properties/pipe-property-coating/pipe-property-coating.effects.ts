import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of } from 'rxjs';

import { PipePropertiesService } from "src/app/core/services/pipe-properties-service/pipe-properties.service";

import {
    actionGetCoatings,
    actionGetCoatingsSuccess,
    actionGetCoatingsError,
    actionCreatePipeProperty_Coating,
    actionCreatePipeProperty_CoatingSuccess,
    actionCreatePipeProperty_CoatingError,
    actionUpdatePipeProperty_Coating,
    actionUpdatePipeProperty_CoatingSuccess,
    actionUpdatePipeProperty_CoatingError
} from './pipe-property-coating.actions';
import { PipeProperty_Coating } from "src/app/models/pipe.model";
import { selectErrorLoadingCoatings } from "./pipe-property-coating.selectors";

@Injectable()
export class PipeProperty_CoatingEffects {

  constructor(
      private actions$: Actions,
      private pipePropertiesService: PipePropertiesService,
  ) {}


  loadcoatings$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actionGetCoatings),
    switchMap(() =>
      this.pipePropertiesService.getGetCoating(null).pipe(
        map(coatings => actionGetCoatingsSuccess({ coatings })),
        catchError(errorLoadingCoatings => of(actionGetCoatingsError({ errorLoadingCoatings })))
      )
    )
  )
);
  
  createCoating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCreatePipeProperty_Coating),
      switchMap(data =>
        this.pipePropertiesService.createCoating(data.coatingCreate).pipe(
          map(coating => actionCreatePipeProperty_CoatingSuccess({ coating })),
          catchError(errorCreatingCoating => of(actionCreatePipeProperty_CoatingError({ errorCreatingCoating })))
        )
      )
    )
  );

  updateCoating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionUpdatePipeProperty_Coating),
      switchMap(({ id, coating }) =>
        this.pipePropertiesService.updateCoating(id, coating).pipe(
          map(() => actionUpdatePipeProperty_CoatingSuccess({ id, coating })),
          catchError(errorUpdatingCoating => of(actionUpdatePipeProperty_CoatingError({ error: errorUpdatingCoating })))
        )
      )
    )
  );
  
}
