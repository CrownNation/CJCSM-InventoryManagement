import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../core.state';
import { PipePropertiesState } from './pipe-properties.state';
import { PipeProperties, PipeProperty_Category, PipeProperty_Coating, PipeProperty_Condition, PipeProperty_Grade, PipeProperty_Range, PipeProperty_Size, PipeProperty_Thread, PipeProperty_Wall, PipeProperty_Weight } from 'src/app/models/pipe.model';

// Feature Selector
export const selectPipePropertiesState = createFeatureSelector<AppState, PipePropertiesState>('pipeProperties');


// Selector to retrieve the entire properties object
export const selectAllPipeProperties = createSelector(
    selectPipePropertiesState,
    (state: PipePropertiesState) => state.pipeProperties
);

// Selector to check if properties are currently being loaded
export const selectLoadingPipeProperties = createSelector(
    selectPipePropertiesState,
    (state: PipePropertiesState) => state.loadingProperties
);

// Selector to retrieve any error that might have occurred during loading
export const selectErrorLoadingPipeProperties = createSelector(
    selectPipePropertiesState,
    (state: PipePropertiesState) => state.errorLoadingProperties
);

// Specific property selectors
export const selectCategories = createSelector(
    selectAllPipeProperties,
    (properties: PipeProperties | null): PipeProperty_Category[] => properties?.categories ?? []
);

export const selectCoatings = createSelector(
    selectAllPipeProperties,
    (properties: PipeProperties | null): PipeProperty_Coating[] => properties?.coatings ?? []
);

export const selectConditions = createSelector(
    selectAllPipeProperties,
    (properties: PipeProperties | null): PipeProperty_Condition[] => properties?.conditions ?? []
);

export const selectGrades = createSelector(
    selectAllPipeProperties,
    (properties: PipeProperties | null): PipeProperty_Grade[] => properties?.grades ?? []
);

export const selectRanges = createSelector(
    selectAllPipeProperties,
    (properties: PipeProperties | null): PipeProperty_Range[] => properties?.ranges ?? []
);

export const selectSizes = createSelector(
    selectAllPipeProperties,
    (properties: PipeProperties | null): PipeProperty_Size[] => properties?.sizes ?? []
);

export const selectThreads = createSelector(
    selectAllPipeProperties,
    (properties: PipeProperties | null): PipeProperty_Thread[] => properties?.threads ?? []
);

export const selectWalls = createSelector(
    selectAllPipeProperties,
    (properties: PipeProperties | null): PipeProperty_Wall[] => properties?.walls ?? []
);

export const selectWeights = createSelector(
    selectAllPipeProperties,
    (properties: PipeProperties | null): PipeProperty_Weight[] => properties?.weights ?? []
);

