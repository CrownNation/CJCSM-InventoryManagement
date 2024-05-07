import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of } from 'rxjs';

import { PipePropertiesService } from "src/app/core/services/pipe-properties-service/pipe-properties.service";

import {
    actionGetConditions,
    actionGetConditionsSuccess,
    actionGetConditionsError,
    actionCreatePipeProperty_Condition,
    actionCreatePipeProperty_ConditionSuccess,
    actionCreatePipeProperty_ConditionError,
    actionUpdatePipeProperty_Condition,
    actionUpdatePipeProperty_ConditionSuccess,
    actionUpdatePipeProperty_ConditionError
} from './pipe-property-condition.actions';

@Injectable()
export class PipeProperty_ConditionEffects {

  constructor(
      private actions$: Actions,
      private pipePropertiesService: PipePropertiesService,
  ) {}

  loadConditions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGetConditions),
      switchMap(() =>
        this.pipePropertiesService.getConditions(null).pipe(
          map(conditions => actionGetConditionsSuccess({ conditions })),
          catchError(errorLoadingConditions => of(actionGetConditionsError({ errorLoadingConditions })))
        )
      )
    )
  );
  
  createCondition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCreatePipeProperty_Condition),
      switchMap(data =>
        this.pipePropertiesService.createCondition(data.conditionCreate).pipe(
          map(condition => actionCreatePipeProperty_ConditionSuccess({ condition })),
          catchError(errorCreatingCondition => of(actionCreatePipeProperty_ConditionError({ errorCreatingCondition })))
        )
      )
    )
  );

  updateCondition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionUpdatePipeProperty_Condition),
      switchMap(({ id, condition }) =>
        this.pipePropertiesService.updateCondition(id, condition).pipe(
          map(() => actionUpdatePipeProperty_ConditionSuccess({ id, condition })),
          catchError(errorUpdatingCondition => of(actionUpdatePipeProperty_ConditionError({ errorUpdatingCondition: errorUpdatingCondition })))
        )
      )
    )
  );
  
}
