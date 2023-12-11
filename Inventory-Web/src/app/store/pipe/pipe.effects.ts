import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PipeService } from '../../core/services/pipe-service/pipe.service';
import { actionCreatePipe, actionCreatePipeError, actionCreatePipeSuccess, actionGetPipe, actionGetPipeById, actionGetPipeByIdError, actionGetPipeByIdSuccess, actionGetPipeDefinitionsList, actionGetPipeDefinitionsListError, actionGetPipeDefinitionsListSuccess, actionGetPipeError, actionGetPipeSuccess } from './pipe.actions';
import { PipeDefinitionService } from '../../core/services/pipe-definition-service/pipe-definition.service';


@Injectable()
export class PipeEffects {

  constructor(
      private actions$: Actions,
      private pipeService: PipeService,
      private pipeDefinitionService: PipeDefinitionService,
  ) {}


  retrievePipe = createEffect( () =>
    this.actions$.pipe(
      ofType(actionGetPipe),
      switchMap(actionData =>
        this.pipeService.getPipe(actionData.searchParams).pipe(
          map(pipe => actionGetPipeSuccess({ pipe })),
          catchError(errorLoadingPipe => of(actionGetPipeError({ errorLoadingPipe })))
        )
      )
    )
  );

  createPipe = createEffect( () =>
    this.actions$.pipe(
      ofType(actionCreatePipe),
      switchMap(data =>
        this.pipeService.addPipe(data.pipeCreate).pipe(
          map(pipe => actionCreatePipeSuccess({pipe})),
          catchError(errorCreatingPipe => of(actionCreatePipeError({ errorCreatingPipe })))
        )
      )
    )
  );

  retrievePipeById = createEffect( () =>
    this.actions$.pipe(
      ofType(actionGetPipeById),
      switchMap(actionData =>
        this.pipeService.getPipeById(actionData.pipeId).pipe(
          map(selectedPipe => actionGetPipeByIdSuccess({ selectedPipe: selectedPipe[0] })),
          catchError(errorLoadingSelectedPipe => of(actionGetPipeByIdError({ errorLoadingSelectedPipe })))
        )
      )
    )
  );

  retrievePipeDefinitionsList = createEffect( () =>
    this.actions$.pipe(
      ofType(actionGetPipeDefinitionsList),
      switchMap(actionData =>
        this.pipeDefinitionService.getPipeDefinitions(actionData.searchParams).pipe(
          map(pipeDefinitionsList => actionGetPipeDefinitionsListSuccess({ pipeDefinitionsList })),
          catchError(errorLoadingPipeDefinitionsList => of(actionGetPipeDefinitionsListError({ errorLoadingPipeDefinitionsList })))
        )
      )
    )
  );


}