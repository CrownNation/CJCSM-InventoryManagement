import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TallyService } from "../../core/services/tally.service";
import { actionCreateTally, actionCreateTallyError, actionCreateTallySuccess, 
  actionGetTallies, actionGetTalliesError, actionGetTalliesSuccess } from "./tally.actions";

@Injectable()
export class TallyEffects {

  constructor(
      private actions$: Actions,
      private tallyService: TallyService,
  ) {}


  // retrieveTallies = createEffect( () =>
  //   this.actions$.pipe(
  //     ofType(actionGetTallies),
  //     switchMap(actionData =>
  //       this.tallyService.getTallies(actionData.searchParams).pipe(
  //         map(tallies => actionGetTalliesSuccess({ tallies })),
  //         catchError(errorLoadingTallies => of(actionGetTalliesError({ errorLoadingTallies })))
  //       )
  //     )
  //   )
  // );
  retrieveTallies = createEffect( () =>
    this.actions$.pipe(
      ofType(actionGetTallies),
      tap(() => console.log('actionGetTallies triggered')),
      switchMap(actionData =>
        this.tallyService.getTallies(actionData.searchParams).pipe(
          map(tallies => actionGetTalliesSuccess({ tallies })),
          catchError(errorLoadingTallies => of(actionGetTalliesError({ errorLoadingTallies })))
        )
      )
    )
  );

  createRack = createEffect( () =>
  this.actions$.pipe(
    ofType(actionCreateTally),
    switchMap(data =>
      this.tallyService.addTally(data.tallyCreate).pipe(
        map(tally => actionCreateTallySuccess({tally})),
        catchError(errorCreatingTally => of(actionCreateTallyError({ errorCreatingTally })))
      )
    )
  )
);


}