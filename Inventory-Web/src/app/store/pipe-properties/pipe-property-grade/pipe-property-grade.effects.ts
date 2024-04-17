import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { PipePropertiesService } from "src/app/core/services/pipe-properties-service/pipe-properties.service";

import {
    actionGetGrades,
    actionGetGradesSuccess,
    actionGetGradesError,
    actionCreatePipeProperty_Grade,
    actionCreatePipeProperty_GradeSuccess,
    actionCreatePipeProperty_GradeError,
    actionUpdatePipeProperty_Grade,
    actionUpdatePipeProperty_GradeSuccess,
    actionUpdatePipeProperty_GradeError
} from './pipe-property-grade.actions';

@Injectable()
export class PipeProperty_GradeEffects {

  constructor(
      private actions$: Actions,
      private pipePropertiesService: PipePropertiesService,
  ) {}

  loadGrades$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGetGrades),
      switchMap(() =>
        this.pipePropertiesService.getGrade(null).pipe(
          map(grades => actionGetGradesSuccess({ grades })),
          catchError(errorLoadingGrades => of(actionGetGradesError({ errorLoadingGrades })))
        )
      )
    )
  );

  createGrade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCreatePipeProperty_Grade),
      switchMap(data =>
        this.pipePropertiesService.createGrade(data.gradeCreate).pipe(
          map(grade => actionCreatePipeProperty_GradeSuccess({ grade })),
          catchError(errorCreatingGrade => of(actionCreatePipeProperty_GradeError({ errorCreatingGrade })))
        )
      )
    )
  );

  updateGrade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionUpdatePipeProperty_Grade),
      switchMap(({ id, grade }) =>
        this.pipePropertiesService.updateGrade(id, grade).pipe(
          map(() => actionUpdatePipeProperty_GradeSuccess({ id, grade })),
          catchError(errorUpdatingGrade => of(actionUpdatePipeProperty_GradeError({ error: errorUpdatingGrade })))
        )
      )
    )
  );
  
}
