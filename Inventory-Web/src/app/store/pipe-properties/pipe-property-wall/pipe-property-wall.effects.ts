import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { HttpErrorResponse } from "@angular/common/http";
import { PipePropertiesService } from "src/app/core/services/pipe-properties-service/pipe-properties.service";
import {
    actionGetWalls,
    actionGetWallsSuccess,
    actionGetWallsError,
    actionCreatePipeProperty_Wall,
    actionCreatePipeProperty_WallSuccess,
    actionCreatePipeProperty_WallError,
    actionUpdatePipeProperty_Wall,
    actionUpdatePipeProperty_WallSuccess,
    actionUpdatePipeProperty_WallError
} from './pipe-property-wall.actions';

@Injectable()
export class PipeProperty_WallEffects {

  constructor(
      private actions$: Actions,
      private pipePropertiesService: PipePropertiesService,
  ) {}

  loadWalls$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGetWalls),
      switchMap(({ searchParams }) =>
        this.pipePropertiesService.getWall(searchParams).pipe(
          map(walls => actionGetWallsSuccess({ walls })),
          catchError(errorLoadingWalls => of(actionGetWallsError({ errorLoadingWalls })))
        )
      )
    )
  );

  createWall$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCreatePipeProperty_Wall),
      switchMap(({ wallCreate }) =>
        this.pipePropertiesService.createWall(wallCreate).pipe(
          map(wall => actionCreatePipeProperty_WallSuccess({ wall })),
          catchError(errorCreatingWall => of(actionCreatePipeProperty_WallError({ errorCreatingWall })))
        )
      )
    )
  );

  updateWall$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionUpdatePipeProperty_Wall),
      switchMap(({ id, wall }) =>
        this.pipePropertiesService.updateWall(id, wall).pipe(
          map(() => actionUpdatePipeProperty_WallSuccess({ id, wall })),
          catchError(errorUpdatingWall => of(actionUpdatePipeProperty_WallError({ error: errorUpdatingWall })))
        )
      )
    )
  );
  
}
