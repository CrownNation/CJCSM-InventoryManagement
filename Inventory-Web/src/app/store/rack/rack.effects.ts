import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RackService } from "../../core/services/rack-service/rack.service";
import { actionCreateRack, actionCreateRackError, actionCreateRackSuccess, actionGetEquipmentRacks, actionGetEquipmentRacksError, actionGetEquipmentRacksSuccess, actionGetRackById, actionGetRackByIdError, actionGetRackByIdSuccess, actionGetRacks, actionGetRacksError, actionGetRacksSuccess, actionGetRacksWithTiers, actionGetRacksWithTiersError, actionGetRacksWithTiersSuccess} from "./rack.actions";
import { AppState } from "../core.state";
import { Store } from "@ngrx/store";
import { addNotification, clearNotifications } from "../notification-hub/notification-hub.actions";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class RackEffects {

  constructor(
      private actions$: Actions,
      private rackService: RackService,
      private store: Store<AppState>
  ) {}

 

  retrieveRacks = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGetRacks),
      tap(() => this.store.dispatch(clearNotifications())),
      switchMap(actionData =>
        this.rackService.getRacks(actionData.searchParams).pipe(
          map(racks => {
            /* Uncomment to display success message
            this.store.dispatch(addNotification({
              notification: { message: 'Racks loaded successfully', type: 'success' }
            }));
            this.store.dispatch(addNotification({
              notification: { message: 'Another test message', type: 'info' }
            })); */
            return actionGetRacksSuccess({ racks });
          }),
          catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An unknown error occurred. If the problem persists, recall the actions and data that lead to the error and contact the administrator with the details.';
            if (error.error instanceof ErrorEvent) {
              // Client-side error
              errorMessage = `Client-side error: ${error.status}. Message: ${error.message}.`;
            } else {
              // Server-side error
              errorMessage = `Server-side error: ${error.status}. Message: ${error.message}. The server may be down, try again later or contact admin.`;
            }
            this.store.dispatch(addNotification({
              notification: { message: errorMessage, type: 'error' }
            }));
            return of(actionGetRacksError({ errorLoadingRacks: error }));
          })
        )
      )
    )
  );

  createRack = createEffect( () =>
    this.actions$.pipe(
      ofType(actionCreateRack),
      switchMap(data =>
        this.rackService.addRack(data.rackCreate).pipe(
          map(rack => actionCreateRackSuccess({rack})),
          catchError(errorCreatingRack => of(actionCreateRackError({ errorCreatingRack })))
        )
      )
    )
  );

  retrieveRackById = createEffect( () =>
    this.actions$.pipe(
      ofType(actionGetRackById),
      switchMap(actionData =>
        this.rackService.getRackById(actionData.rackId).pipe(
          map(selectedRack => actionGetRackByIdSuccess({ selectedRack: selectedRack[0] })),
          catchError(errorLoadingSelectedRack => of(actionGetRackByIdError({ errorLoadingSelectedRack })))
        )
      )
    )
  );


  retrieveRacksWithTiers = createEffect( () =>
    this.actions$.pipe(
      ofType(actionGetRacksWithTiers),
      switchMap(actionData =>
        this.rackService.getRacksWithTiers().pipe(
          map(racksWithTiers => actionGetRacksWithTiersSuccess({ racksWithTiers })),
          catchError(errorLoadingRacksWithTiers => of(actionGetRacksWithTiersError({ errorLoadingRacksWithTiers })))
        )
      )
    )
  );

  // Racks for Equipment
  retrieveRacksWithEquipment = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGetEquipmentRacks),
      switchMap(() =>
        this.rackService.getEquipmentRacks().pipe(
          map(equipmentRacks => actionGetEquipmentRacksSuccess({ equipmentRacks })),
          catchError(errorLoadingEquipmentRacks => of(actionGetEquipmentRacksError({ errorLoadingEquipmentRacks })))
        )
      )
    )
  );


}