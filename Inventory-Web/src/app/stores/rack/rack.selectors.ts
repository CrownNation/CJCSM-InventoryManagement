// import { AppState } from '../index';
// import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
// import { RackState } from './rack.state';
// import { Rack } from '../../models/rack.model';

// export const selectRackFeature: MemoizedSelector<AppState, RackState> =
//   createFeatureSelector<RackState>('rack');

// export const selectRacks: MemoizedSelector<AppState, Rack[]> = 
// createSelector(
//   selectRackFeature,
//   ({ entities }: RackState): Rack[] => 
//     Object.values(entities) as Rack[]
// );