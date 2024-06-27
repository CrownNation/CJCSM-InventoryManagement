import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { PipePropertiesService } from "src/app/core/services/pipe-properties-service/pipe-properties.service";
import { 
    actionGetAllPipeProperties,
    actionGetAllPipePropertiesSuccess,
    actionGetAllPipePropertiesError
} from './pipe-properties.actions';
import { LocalStorageCacheService } from "src/app/core/services/local-storage-cache/local-storage-cache.service";

@Injectable()
export class PipePropertiesEffects {

  constructor(
      private actions$: Actions,
      private pipePropertiesService: PipePropertiesService,
      private localStorageCacheService: LocalStorageCacheService
  ) {}

  // loadPipeProperties$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(actionGetAllPipeProperties),
  //     switchMap(() => {
  //       const pipeProperties = this.localStorageCacheService.getFromLocalStorage('pipeProperties');
  //       if (pipeProperties) {
  //         return of(actionGetAllPipePropertiesSuccess({ pipeProperties }));
  //       } else {
  //         return this.pipePropertiesService.getAllPipeProperties().pipe(
  //           tap(pipeProperties => {
  //             if (pipeProperties) {
  //               this.localStorageCacheService.saveToLocalStorage('pipeProperties', pipeProperties);
  //             }
  //           }),
  //           map(pipeProperties => actionGetAllPipePropertiesSuccess({ pipeProperties })),
  //           catchError(errorLoadingProperties => of(actionGetAllPipePropertiesError({ errorLoadingProperties })))
  //         );
  //       }
  //     })
  //   )
  // );

  loadPipeProperties$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGetAllPipeProperties),
      switchMap(() => {
        const pipeProperties = this.localStorageCacheService.getFromLocalStorage('pipeProperties', 3600000);
        if (pipeProperties) {
          console.log('Using cached pipe properties');
          return of(actionGetAllPipePropertiesSuccess({ pipeProperties }));
        } else {
          console.log('Fetching pipe properties from API');
          return this.pipePropertiesService.getAllPipeProperties().pipe(
            tap(pipeProperties => {
              if (pipeProperties) {
                this.localStorageCacheService.saveToLocalStorage('pipeProperties', pipeProperties);
                console.log('Pipe properties cached');
              }
            }),
            map(pipeProperties => actionGetAllPipePropertiesSuccess({ pipeProperties })),
            catchError(errorLoadingProperties => of(actionGetAllPipePropertiesError({ errorLoadingProperties })))
          );
        }
      })
    )
  );
}
