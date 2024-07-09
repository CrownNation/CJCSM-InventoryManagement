import { HttpErrorResponse } from "@angular/common/http";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { PipeDefinition } from "src/app/models/pipe.model";

// Adapter for managing collections of PipeDefinition entities
export const pipeDefinitionAdapter: EntityAdapter<PipeDefinition> = createEntityAdapter<PipeDefinition>();

// Define the state structure for PipeDefinition entities
export interface PipeDefinitionState extends EntityState<PipeDefinition> {
    loadingPipeDefinitions: boolean;
    errorLoadingPipeDefinitions: HttpErrorResponse | null;

    creatingPipeDefinition: boolean;
    createdPipeDefinition: PipeDefinition | null;
    errorCreatingPipeDefinition: HttpErrorResponse | null;

    updatingPipeDefinition: boolean; // Tracks whether an update operation is in progress
    updatedPipeDefinition: PipeDefinition | null; // Holds the last updated PipeDefinition
    errorUpdatingPipeDefinition: HttpErrorResponse | null; // Holds any error that occurred during updating

    selectedPipeDefinition: PipeDefinition | null;
    errorLoadingSelectedPipeDefinition: HttpErrorResponse | null;
}