import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RackService } from "../../core/services/rack.service";
import { actionCreateRack, actionCreateRackError, actionCreateRackSuccess, actionGetRacks, actionGetRacksError, actionGetRacksSuccess } from "./rack.actions";

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
        this.rackService.getRacks().pipe(
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


}