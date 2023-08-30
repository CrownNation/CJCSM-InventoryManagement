// import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
// import { Rack } from '../../models/rack.model';


// export interface RackState extends EntityState<Rack> {
//   loading: [];
// }

// export const selectId = ({ rackId }: Rack) => rackId;

// export const sortComparer = (a: Rack, b: Rack): number => {
//     if (a.name < b.name) {
//         return -1;
//     } else if (a.name > b.name) {
//         return 1;
//     } else {
//         return 0;
//     }
// };

// export const adapter: EntityAdapter<Rack> = createEntityAdapter(
// { selectId, sortComparer }
// );

// export const initialState: RackState = adapter.getInitialState(
// {
//     loading: [],
//     selectedRack: null 
// });