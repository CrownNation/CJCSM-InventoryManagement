import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { EquipmentDefinition } from 'src/app/models/equipment.model';
import {
  actionGetEquipmentDefinitions,
  actionGetEquipmentDefinitionsSuccess,
  actionGetEquipmentDefinitionsError,
  actionCreateEquipmentDefinition,
  actionCreateEquipmentDefinitionSuccess,
  actionCreateEquipmentDefinitionError,
  actionUpdateEquipmentDefinition,
  actionUpdateEquipmentDefinitionSuccess,
  actionUpdateEquipmentDefinitionError,
  resetEquipmentDefinitionNotifications
} from './equipment-definition.actions';
import { EquipmentDefinitionState } from './equipment-definition.state';

export const equipmentDefinitionAdapter: EntityAdapter<EquipmentDefinition> = createEntityAdapter<EquipmentDefinition>({
  selectId: (equipmentDefinition: EquipmentDefinition) => equipmentDefinition.equipmentDefinitionId
});

const initialState: EquipmentDefinitionState = equipmentDefinitionAdapter.getInitialState({
  loadingEquipmentDefinitions: false,
  errorLoadingEquipmentDefinitions: null,
  creatingEquipmentDefinition: false,
  createdEquipmentDefinition: null,
  errorCreatingEquipmentDefinition: null,
  updatingEquipmentDefinition: false,
  updatedEquipmentDefinition: null,
  errorUpdatingEquipmentDefinition: null,
  selectedEquipmentDefinition: null,
  errorLoadingSelectedEquipmentDefinition: null
});

export const equipmentDefinitionReducer = createReducer(
  initialState,
  on(actionGetEquipmentDefinitions, (state) => ({
    ...state,
    loadingEquipmentDefinitions: true
  })),
  on(actionGetEquipmentDefinitionsSuccess, (state, { equipmentDefinitions }) =>
    equipmentDefinitionAdapter.setAll(equipmentDefinitions, {
      ...state,
      loadingEquipmentDefinitions: false
    })
  ),
  on(actionGetEquipmentDefinitionsError, (state, { errorLoadingEquipmentDefinitions }) => ({
    ...state,
    loadingEquipmentDefinitions: false,
    errorLoadingEquipmentDefinitions: errorLoadingEquipmentDefinitions
  })),
  on(actionCreateEquipmentDefinition, (state) => ({
    ...state,
    creatingEquipmentDefinition: true
  })),
  on(actionCreateEquipmentDefinitionSuccess, (state, { equipmentDefinition }) =>
    equipmentDefinitionAdapter.addOne(equipmentDefinition, {
      ...state,
      creatingEquipmentDefinition: false,
      createdEquipmentDefinition: equipmentDefinition
    })
  ),
  on(actionCreateEquipmentDefinitionError, (state, { errorCreatingEquipmentDefinition }) => ({
    ...state,
    creatingEquipmentDefinition: false,
    errorCreatingEquipmentDefinition: errorCreatingEquipmentDefinition
  })),
  on(actionUpdateEquipmentDefinition, (state) => ({
    ...state,
    updatingEquipmentDefinition: true
  })),
  on(actionUpdateEquipmentDefinitionSuccess, (state, { id, equipmentDefinition }) =>
    equipmentDefinitionAdapter.updateOne(
      { id: id, changes: equipmentDefinition },
      {
        ...state,
        updatingEquipmentDefinition: false,
        updatedEquipmentDefinition: equipmentDefinition
      }
    )
  ),
  on(actionUpdateEquipmentDefinitionError, (state, { errorUpdatingEquipmentDefinition }) => ({
    ...state,
    updatingEquipmentDefinition: false,
    errorUpdatingEquipmentDefinition: errorUpdatingEquipmentDefinition
  })),
  on(resetEquipmentDefinitionNotifications, (state) => ({
    ...state,
    errorLoadingEquipmentDefinitions: null,
    errorCreatingEquipmentDefinition: null,
    errorUpdatingEquipmentDefinition: null
  }))
);

// Export the reducer function to be included in the Store Module
export function reducer(state: EquipmentDefinitionState | undefined, action: any): EquipmentDefinitionState {
  return equipmentDefinitionReducer(state, action);
}
