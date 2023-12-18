// import { inject } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, map, mergeMap } from 'rxjs';
// import { addRack, addRackSuccess, getRackById, getRacks, getRacksSuccess } from './rack.actions';
// import { RackService } from '../../core/services/rack.service';

// export const addRack$ = createEffect(
//   (actions$: Actions = inject(Actions), rackService: RackService = inject(RackService)) => {
//     return actions$.pipe(
//       ofType(addRack),
//       mergeMap(({ rack }) =>
//       rackService.addRack(rack).pipe(
//           map(() => addRackSuccess()),
//           catchError(() => [addRackError()])
//         )
//       )
//     );
//   },
//   { functional: true }
// );

// function addRackError(): any {
//     throw new Error('Function not implemented.');
// }

// export const getRacks$ = createEffect(
//   (actions$: Actions = inject(Actions), rackService: RackService = inject(RackService)) => {
//     return actions$.pipe(
//       ofType(getRacks),
//       mergeMap(() =>
//       rackService.getRacks().pipe(
//           map((racks) => getRacksSuccess({racks})),
//           catchError(() => [errorHandler()])
//         )
//       )
//     );
//   },
//   { functional: true }
// );

// function errorHandler(): any {
//     throw new Error('Error handler not implemented.');
// }
