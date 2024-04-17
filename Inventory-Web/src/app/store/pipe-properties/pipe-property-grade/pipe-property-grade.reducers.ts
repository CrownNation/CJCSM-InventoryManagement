import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { PipeProperty_GradeState } from './pipe-property-grade.state';
import { PipeProperty_Grade } from 'src/app/models/pipe.model';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  actionCreatePipeProperty_GradeSuccess,
  actionGetGrades,
  actionGetGradesError,
  actionGetGradesSuccess,
  actionUpdatePipeProperty_Grade,
  actionUpdatePipeProperty_GradeSuccess,
  resetGradeNotifications,
} from './pipe-property-grade.actions';

export function sortByGradeName(a: PipeProperty_Grade, b: PipeProperty_Grade): number {
    return a.name.localeCompare(b.name);
}

export const selectId: (grade: PipeProperty_Grade) => string = (grade: PipeProperty_Grade) => grade.pipeProperty_GradeId;

export const pipeProperty_GradeAdapter: EntityAdapter<PipeProperty_Grade> = createEntityAdapter<PipeProperty_Grade>({
    sortComparer: sortByGradeName,
    selectId: selectId
});

export const initialState: PipeProperty_GradeState = pipeProperty_GradeAdapter.getInitialState({
    ids: [],
    entities: {},
    loadingGrades: false,
    errorLoadingGrades: null,
    creatingGrade: false,
    createdGrade: null,
    errorCreatingGrade: null,
    updatingGrade: false,
    updatedGrade: null,
    errorUpdatingGrade: null,
    selectedGrade: null,
    errorLoadingSelectedGrade: null
});

const reducer: ActionReducer<PipeProperty_GradeState> = createReducer(
    initialState,
    on(actionGetGrades, (state: PipeProperty_GradeState) => ({
        ...state,
        loadingGrades: true,
        errorLoadingGrades: null
    })),
    on(actionCreatePipeProperty_GradeSuccess, (state, { grade }) => 
        pipeProperty_GradeAdapter.addOne(grade, {
            ...state,
            loadingGrades: false,
            errorCreatingGrade: null, 
            createdGrade: grade
        })),
    on(actionUpdatePipeProperty_Grade, (state) => ({
        ...state,
        updatingGrade: true,
        errorUpdatingGrade: null
    })),
    on(actionUpdatePipeProperty_GradeSuccess, (state, { id, grade }) => 
        pipeProperty_GradeAdapter.updateOne({
            id: id,
            changes: grade
        }, {
            ...state,
            updatingGrade: false,
            updatedGrade: grade
        })),
    on(actionGetGradesSuccess, (state, { grades }) => 
        pipeProperty_GradeAdapter.addMany(grades, {
            ...state,
            loadingGrades: false,
            errorLoadingGrades: null
        })),
    on(actionGetGradesError, (state, { errorLoadingGrades }) => ({
        ...state,
        loadingGrades: false,
        errorLoadingGrades
    })),  
    on(resetGradeNotifications, (state) => ({
        ...state,
        createdGrade: null,
        updatedGrade: null,
        errorLoadingGrades: null,
        errorCreatingGrade: null,
        errorUpdatingGrade: null
      }))
    );

export function pipeProperty_GradeReducers(state: PipeProperty_GradeState | undefined, action: Action) {
    return reducer(state, action);
}