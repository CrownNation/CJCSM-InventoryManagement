import { HttpErrorResponse } from "@angular/common/http";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { EquipmentDefinition } from "src/app/models/equipment.model";

// Adapter for managing collections of EquipmentDefinition entities
export const equipmentDefinitionAdapter: EntityAdapter<EquipmentDefinition> = createEntityAdapter<EquipmentDefinition>();

// Define the state structure for EquipmentDefinition entities
export interface EquipmentDefinitionState extends EntityState<EquipmentDefinition> {
    loadingEquipmentDefinitions: boolean; // Tracks the loading state of Equipment Definitions
    errorLoadingEquipmentDefinitions: HttpErrorResponse | null; // Stores errors related to loading Equipment Definitions

    creatingEquipmentDefinition: boolean; // Tracks whether a creation operation is in progress
    createdEquipmentDefinition: EquipmentDefinition | null; // Holds the newly created Equipment Definition, if any
    errorCreatingEquipmentDefinition: HttpErrorResponse | null; // Stores errors related to creating Equipment Definitions

    updatingEquipmentDefinition: boolean; // Tracks whether an update operation is in progress
    updatedEquipmentDefinition: EquipmentDefinition | null; // Holds the last updated Equipment Definition, if any
    errorUpdatingEquipmentDefinition: HttpErrorResponse | null; // Stores errors related to updating Equipment Definitions

    selectedEquipmentDefinition: EquipmentDefinition | null; // Optionally holds the selected Equipment Definition
    errorLoadingSelectedEquipmentDefinition: HttpErrorResponse | null; // Stores errors related to loading a selected Equipment Definition
}
