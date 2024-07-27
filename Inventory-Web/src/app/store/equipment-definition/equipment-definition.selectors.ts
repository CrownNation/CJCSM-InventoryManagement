import { equipmentDefinitionAdapter } from "./equipment-definition.reducers";
import { EquipmentDefinitionState } from "./equipment-definition.state";
import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../core.state";

// getSelectors returns four default selectors: selectIds, selectEntities, selectAll, and selectTotal.
const { selectEntities, selectAll } = equipmentDefinitionAdapter.getSelectors();

export const selectEquipmentDefinitionFeature: MemoizedSelector<AppState, EquipmentDefinitionState> =
  createFeatureSelector<EquipmentDefinitionState>('equipmentDefinition');

export const selectEquipmentDefinitionState = createSelector(
    selectEquipmentDefinitionFeature,
    (state: EquipmentDefinitionState) => state
);

// Gets array of all data objects
export const selectAllEquipmentDefinitions = createSelector(selectEquipmentDefinitionFeature, selectAll);

// Gets dictionary of all data objects
export const selectAllEquipmentDefinitionEntities = createSelector(selectEquipmentDefinitionFeature, selectEntities);

// Retrieve flag for if data is being loaded
export const selectLoadingEquipmentDefinitions = createSelector(
    selectEquipmentDefinitionFeature,
    (state: EquipmentDefinitionState) => state.loadingEquipmentDefinitions
);

// Retrieve error message for if data fails to load
export const selectErrorLoadingEquipmentDefinitions = createSelector(
    selectEquipmentDefinitionFeature,
    (state: EquipmentDefinitionState) => state.errorLoadingEquipmentDefinitions
);

// Retrieve flag for if data is currently being created
export const selectCreatingEquipmentDefinition = createSelector(
  selectEquipmentDefinitionFeature,
  (state: EquipmentDefinitionState) => state.creatingEquipmentDefinition
);

// Retrieve created data object
export const selectCreatedEquipmentDefinition = createSelector(
  selectEquipmentDefinitionFeature,
  (state: EquipmentDefinitionState) => state.createdEquipmentDefinition
);

// Retrieve error message for if data fails to create
export const selectCreatingEquipmentDefinitionError = createSelector(
  selectEquipmentDefinitionFeature,
  (state: EquipmentDefinitionState) => state.errorCreatingEquipmentDefinition
);

// Retrieve selected object
export const selectSelectedEquipmentDefinition = createSelector(
    selectEquipmentDefinitionFeature,
    (state: EquipmentDefinitionState) => state.selectedEquipmentDefinition
);

// Error message for if selected object fails to load
export const selectSelectedEquipmentDefinitionError = createSelector(
    selectEquipmentDefinitionFeature,
    (state: EquipmentDefinitionState) => state.errorLoadingSelectedEquipmentDefinition
);

// Additional selectors for the update process
export const selectUpdatingEquipmentDefinition = createSelector(
  selectEquipmentDefinitionFeature,
  (state: EquipmentDefinitionState) => state.updatingEquipmentDefinition
);

export const selectUpdatedEquipmentDefinition = createSelector(
  selectEquipmentDefinitionFeature,
  (state: EquipmentDefinitionState) => state.updatedEquipmentDefinition
);

export const selectUpdatingEquipmentDefinitionError = createSelector(
  selectEquipmentDefinitionFeature,
  (state: EquipmentDefinitionState) => state.errorUpdatingEquipmentDefinition
);
