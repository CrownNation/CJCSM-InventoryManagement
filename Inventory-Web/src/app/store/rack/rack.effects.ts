import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RackService } from "../../core/services/rack-service/rack.service";
import { actionCreateRack, actionCreateRackError, actionCreateRackSuccess, actionGetRackById, actionGetRackByIdError, actionGetRackByIdSuccess, actionGetRacks, actionGetRacksError, actionGetRacksFullList, actionGetRacksFullListError, actionGetRacksFullListSuccess, actionGetRacksSuccess } from "./rack.actions";

@Injectable()
export class RackEffects {

  constructor(
      private actions$: Actions,
      private rackService: RackService,
  ) {}


  retrieveRacks = createEffect( () =>
    this.actions$.pipe(
      ofType(actionGetRacks),
      switchMap(actionData =>
        this.rackService.getRacks(actionData.searchParams).pipe(
          map(racks => actionGetRacksSuccess({ racks })),
          catchError(errorLoadingRacks => of(actionGetRacksError({ errorLoadingRacks })))
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


  retrieveRacksFullList = createEffect( () =>
    this.actions$.pipe(
      ofType(actionGetRacksFullList),
      switchMap(actionData =>
        this.rackService.getRacks(actionData.searchParams).pipe(
          map(racksFullList => actionGetRacksFullListSuccess({ racksFullList })),
          catchError(errorLoadingRacksList => of(actionGetRacksFullListError({ errorLoadingRacksList })))
        )
      )
    )
  );


}