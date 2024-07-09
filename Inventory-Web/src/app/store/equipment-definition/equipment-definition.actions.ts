import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { EquipmentDefinition, EquipmentDefinitionCreate, EquipmentDefinitionSearchParams } from "src/app/models/equipment.model";

export const equipmentDefinitionsKey = '[Equipment Definitions]';

// Get actions
export const actionGetEquipmentDefinitions = createAction(
    `${equipmentDefinitionsKey} Get Equipment Definitions`,
    props<{ searchParams: EquipmentDefinitionSearchParams | null }>()
);
export const actionGetEquipmentDefinitionsSuccess = createAction(
    `${equipmentDefinitionsKey} Get Equipment Definitions Success`,
    props<{ equipmentDefinitions: EquipmentDefinition[] }>()
);
export const actionGetEquipmentDefinitionsError = createAction(
    `${equipmentDefinitionsKey} Get Equipment Definitions Failure`,
    props<{ errorLoadingEquipmentDefinitions: HttpErrorResponse }>()
);

// Create actions
export const actionCreateEquipmentDefinition = createAction(
    `${equipmentDefinitionsKey} Create Equipment Definition`,
    props<{ equipmentDefinitionCreate: EquipmentDefinitionCreate }>()
);
export const actionCreateEquipmentDefinitionSuccess = createAction(
    `${equipmentDefinitionsKey} Create Equipment Definition Success`,
    props<{ equipmentDefinition: EquipmentDefinition }>()
);
export const actionCreateEquipmentDefinitionError = createAction(
    `${equipmentDefinitionsKey} Create Equipment Definition Error`,
    props<{ errorCreatingEquipmentDefinition: HttpErrorResponse }>()
);

// Update actions
export const actionUpdateEquipmentDefinition = createAction(
    `${equipmentDefinitionsKey} Update Equipment Definition`,
    props<{ id: string; equipmentDefinition: EquipmentDefinition }>()
);
export const actionUpdateEquipmentDefinitionSuccess = createAction(
    `${equipmentDefinitionsKey} Update Equipment Definition Success`,
    props<{ id: string; equipmentDefinition: EquipmentDefinition }>()
);
export const actionUpdateEquipmentDefinitionError = createAction(
    `${equipmentDefinitionsKey} Update Equipment Definition Error`,
    props<{ errorUpdatingEquipmentDefinition: HttpErrorResponse }>()
);

// Reset notifications
export const resetEquipmentDefinitionNotifications = createAction(
    `${equipmentDefinitionsKey} Reset Equipment Definition Notifications`
);
