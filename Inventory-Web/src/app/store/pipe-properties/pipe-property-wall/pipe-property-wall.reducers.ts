import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { PipeProperty_WallState } from './pipe-property-wall.state';
import { PipeProperty_Wall } from 'src/app/models/pipe.model';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  actionCreatePipeProperty_Wall,
  actionCreatePipeProperty_WallSuccess,
  actionCreatePipeProperty_WallError,
  actionGetWalls,
  actionGetWallsError,
  actionGetWallsSuccess,
  actionUpdatePipeProperty_Wall,
  actionUpdatePipeProperty_WallSuccess,
  actionUpdatePipeProperty_WallError,
  resetWallNotifications,
} from './pipe-property-wall.actions';

export function sortByWallMetric(a: PipeProperty_Wall, b: PipeProperty_Wall): number {
    return a.wallMetric - b.wallMetric;
}

export const selectId: (wall: PipeProperty_Wall) => string = (wall: PipeProperty_Wall) => wall.pipeProperty_WallId;

export const pipeProperty_WallAdapter: EntityAdapter<PipeProperty_Wall> = createEntityAdapter<PipeProperty_Wall>({
    sortComparer: sortByWallMetric,
    selectId: selectId
});

export const initialState: PipeProperty_WallState = pipeProperty_WallAdapter.getInitialState({
    ids: [],
    entities: {},
    loadingWalls: false,
    errorLoadingWalls: null,
    creatingWall: false,
    createdWall: null,
    errorCreatingWall: null,
    updatingWall: false,
    updatedWall: null,
    errorUpdatingWall: null,
    selectedWall: null,
    errorLoadingSelectedWall: null
});

const reducer: ActionReducer<PipeProperty_WallState> = createReducer(
    initialState,
    // Get walls
    on(actionGetWalls, (state) => ({
        ...state,
        loadingWalls: true,
        errorLoadingWalls: null
    })),
    on(actionGetWallsSuccess, (state, { walls }) =>
        pipeProperty_WallAdapter.addMany(walls, {
            ...state,
            loadingWalls: false,
            errorLoadingWalls: null
        })),
    on(actionGetWallsError, (state, { errorLoadingWalls }) => ({
        ...state,
        loadingWalls: false,
        errorLoadingWalls
    })),

    // Create wall
    on(actionCreatePipeProperty_Wall, (state) => ({
        ...state,
        creatingWall: true,
        createdWall: null,
        errorCreatingWall: null
    })),
    on(actionCreatePipeProperty_WallSuccess, (state, { wall }) =>
        pipeProperty_WallAdapter.addOne(wall, {
            ...state,
            creatingWall: false,
            createdWall: wall,
            errorCreatingWall: null
        })),
    on(actionCreatePipeProperty_WallError, (state, { errorCreatingWall }) => ({
        ...state,
        creatingWall: false,
        errorCreatingWall
    })),

    // Update wall
    on(actionUpdatePipeProperty_Wall, (state) => ({
        ...state,
        updatingWall: true,
        errorUpdatingWall: null
    })),
    on(actionUpdatePipeProperty_WallSuccess, (state, { id, wall }) =>
        pipeProperty_WallAdapter.updateOne({
            id,
            changes: wall
        }, {
            ...state,
            updatingWall: false,
            updatedWall: wall,
            errorUpdatingWall: null
        })),
    on(actionUpdatePipeProperty_WallError, (state, { errorUpdatingWall }) => ({
        ...state,
        updatingWall: false,
        errorUpdatingWall
    })),

    // Reset notifications
    on(resetWallNotifications, (state) => ({
        ...state,
        createdWall: null,
        updatedWall: null,
        errorLoadingWalls: null,
        errorCreatingWall: null,
        errorUpdatingWall: null
    }))
);

export function pipeProperty_WallReducers(state: PipeProperty_WallState | undefined, action: Action) {
    return reducer(state, action);
}
