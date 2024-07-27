import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from "@angular/common/http";

import { EquipmentDefinitionService } from '../../core/services/equipment-definition-service/equipment-definition.service';
import {
    actionGetEquipmentDefinitions,
    actionGetEquipmentDefinitionsSuccess,
    actionGetEquipmentDefinitionsError,
    actionCreateEquipmentDefinition,
    actionCreateEquipmentDefinitionSuccess,
    actionCreateEquipmentDefinitionError,
    actionUpdateEquipmentDefinition,
    actionUpdateEquipmentDefinitionSuccess,
    actionUpdateEquipmentDefinitionError
} from './equipment-definition.actions';

@Injectable()
export class EquipmentDefinitionEffects {

    constructor(
        private actions$: Actions,
        private equipmentDefinitionService: EquipmentDefinitionService,
    ) { }

    // Load Equipment Definitions
    loadEquipmentDefinitions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actionGetEquipmentDefinitions),
            tap(() => console.log('Action received to get equipment definitions')),
            switchMap(action =>
                this.equipmentDefinitionService.getEquipmentDefinitions(action.searchParams).pipe(
                    tap(equipmentDefinitions => console.log('Received equipment definitions:', equipmentDefinitions)),
                    map(equipmentDefinitions => actionGetEquipmentDefinitionsSuccess({ equipmentDefinitions })),
                    catchError((errorLoadingEquipmentDefinitions: HttpErrorResponse) => {
                        console.error('Error loading equipment definitions:', errorLoadingEquipmentDefinitions);
                        return of(actionGetEquipmentDefinitionsError({ errorLoadingEquipmentDefinitions }));
                    })
                )
            )
        )
    );

    // Create Equipment Definition
    createEquipmentDefinition$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actionCreateEquipmentDefinition),
            switchMap(action =>
                this.equipmentDefinitionService.createEquipmentDefinition(action.equipmentDefinitionCreate).pipe(
                    map(equipmentDefinition => actionCreateEquipmentDefinitionSuccess({ equipmentDefinition })),
                    catchError((errorCreatingEquipmentDefinition: HttpErrorResponse) => of(actionCreateEquipmentDefinitionError({ errorCreatingEquipmentDefinition })))
                )
            )
        )
    );

    // Update Equipment Definition
    updateEquipmentDefinition$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actionUpdateEquipmentDefinition),
            switchMap(({ id, equipmentDefinition }) =>
                this.equipmentDefinitionService.updateEquipmentDefinition(id, equipmentDefinition).pipe(
                    map(() => actionUpdateEquipmentDefinitionSuccess({ id, equipmentDefinition })),
                    catchError((errorUpdatingEquipmentDefinition: HttpErrorResponse) => of(actionUpdateEquipmentDefinitionError({ errorUpdatingEquipmentDefinition })))
                )
            )
        )
    );
}
