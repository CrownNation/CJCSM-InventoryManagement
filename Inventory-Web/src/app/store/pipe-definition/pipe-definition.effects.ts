import { Injectable, Pipe } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from "@angular/common/http";

import { PipeDefinitionService } from '../../core/services/pipe-definition-service/pipe-definition.service';
import {
    actionGetPipeDefinitions,
    actionGetPipeDefinitionsSuccess,
    actionGetPipeDefinitionsError,
    actionCreatePipeDefinition,
    actionCreatePipeDefinitionSuccess,
    actionCreatePipeDefinitionError,
    actionUpdatePipeDefinition,
    actionUpdatePipeDefinitionSuccess,
    actionUpdatePipeDefinitionError
} from './pipe-definition.actions';
import { PipeDefinition, PipeDefinitionCreate, PipeDefinitionSearchParams, PipeDefinitionUpdate } from "src/app/models/pipe.model";

@Injectable()
export class PipeDefinitionEffects {

    constructor(
        private actions$: Actions,
        private pipeDefinitionService: PipeDefinitionService,
    ) { }

    // Load Pipe Definitions
    // loadPipeDefinitions$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(actionGetPipeDefinitions),
    //         switchMap(action =>
    //             this.pipeDefinitionService.getPipeDefinitions(action.searchParams).pipe(
    //                 map(pipeDefinitions => actionGetPipeDefinitionsSuccess({ pipeDefinitions })),
    //                 catchError((errorLoadingPipeDefinitions: HttpErrorResponse) => of(actionGetPipeDefinitionsError({ errorLoadingPipeDefinitions })))
    //             )
    //         )
    //     )
    // );
    loadPipeDefinitions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actionGetPipeDefinitions),
            tap(() => console.log('Action received to get pipe definitions')), // Log when action is received
            switchMap(action => {
                console.log('Fetching pipe definitions with params:', action.searchParams); // Log the parameters being used for the request
                return this.pipeDefinitionService.getPipeDefinitions(action.searchParams).pipe(
                    
                    tap(pipeDefinitions => console.log('Received pipe definitions:', pipeDefinitions)), // Log the received data
                    map(pipeDefinitions => {
                        console.log('Dispatching success action with data'); // Log before dispatching success action
                        return actionGetPipeDefinitionsSuccess({ pipeDefinitions })
                    }),
                    catchError((errorLoadingPipeDefinitions: HttpErrorResponse) => {
                        console.error('Error loading pipe definitions:', errorLoadingPipeDefinitions); // Log error received
                        return of(actionGetPipeDefinitionsError({ errorLoadingPipeDefinitions }));
                    })
                );
            })
        )
    );

    // Create Pipe Definition
    createPipeDefinition$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actionCreatePipeDefinition),
            switchMap(action =>
                this.pipeDefinitionService.createPipeDefinition(action.pipeDefinitionCreate).pipe(
                    map(pipeDefinition => actionCreatePipeDefinitionSuccess({ pipeDefinition })),
                    catchError((errorCreatingPipeDefinition: HttpErrorResponse) => of(actionCreatePipeDefinitionError({ errorCreatingPipeDefinition })))
                )
            )
        )
    );

    updatePipeDefinition$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actionUpdatePipeDefinition),
            switchMap(({id: pipeDefinitionId, pipeDefinition: updatedPipeDefinition}) =>
                this.pipeDefinitionService.updatePipeDefinition(pipeDefinitionId, updatedPipeDefinition).pipe(
                    map(() => actionUpdatePipeDefinitionSuccess({ id: pipeDefinitionId, pipeDefinition:updatedPipeDefinition })),
                    catchError((errorUpdatingPipeDefinition: HttpErrorResponse) => of(actionUpdatePipeDefinitionError({ errorUpdatingPipeDefinition })))
                )
            )
        )
    );

}
