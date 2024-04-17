import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { PipeProperty_WallState } from './pipe-property-wall.state';
import { PipeProperty_Wall } from 'src/app/models/pipe.model';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  actionCreatePipeProperty_WallSuccess,
  actionGetWalls,
  actionGetWallsError,
  actionGetWallsSuccess,
  actionUpdatePipeProperty_Wall,
  actionUpdatePipeProperty_WallSuccess,
  resetWallNotifications,
} from './pipe-property-wall.actions';

export function sortByWallMetric(a: PipeProperty_Wall, b: PipeProperty_Wall): number {
    return a.wallThicknessMetric - b.wallThicknessMetric;
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
    on(actionGetWalls, (state: PipeProperty_WallState) => ({
        ...state,
        loadingWalls: true,
        errorLoadingWalls: null
    })),
    on(actionCreatePipeProperty_WallSuccess, (state, { wall }) => 
        pipeProperty_WallAdapter.addOne(wall, {
            ...state,
            loadingWalls: false,
            errorCreatingWall: null, 
            createdWall: wall
        })),
    on(actionUpdatePipeProperty_Wall, (state) => ({
        ...state,
        updatingWall: true,
        errorUpdatingWall: null
    })),
    on(actionUpdatePipeProperty_WallSuccess, (state, { id, wall }) => 
        pipeProperty_WallAdapter.updateOne({
            id: id,
            changes: wall
        }, {
            ...state,
            updatingWall: false,
            updatedWall: wall
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
