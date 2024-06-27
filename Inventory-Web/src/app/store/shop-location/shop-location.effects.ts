import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { Store, select } from "@ngrx/store";
import { of } from 'rxjs';

import { ShopLocationService } from "src/app/core/services/shop-location-service/shop-location.service";

import { 
    actionGetShopLocations,
    actionGetShopLocationsSuccess,
    actionGetShopLocationsError,
    actionGetShopLocation,
    actionGetShopLocationSuccess,
    actionGetShopLocationError,
    actionCreateShopLocation,
    actionCreateShopLocationSuccess,
    actionCreateShopLocationError,
    actionUpdateShopLocation,
    actionUpdateShopLocationSuccess,
    actionUpdateShopLocationError
  } from './shop-location.actions';
import { AppState } from "../core.state";
import { LocalStorageService } from "src/app/core/local-storage/local-storage.service";
import { LocalStorageCacheService } from "src/app/core/services/local-storage-cache/local-storage-cache.service";

@Injectable()
export class ShopLocationEffects {

  constructor(
      private actions$: Actions,
      private shopLocationService: ShopLocationService,
      private store: Store<AppState>,
      private localStorageCacheService: LocalStorageCacheService
  ) {}


  
  loadShopLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGetShopLocations),
      switchMap(() => {
        const shopLocations = this.localStorageCacheService.getFromLocalStorage('shopLocations', 3600000);
        if (shopLocations) {
          console.log('Using cached shop locations');
          return of(actionGetShopLocationsSuccess({ shopLocations }));
        } else {
          console.log('Fetching shop locations from API');
          return this.shopLocationService.getShopLocations(null).pipe(
            tap(shopLocations => {
              if (shopLocations && shopLocations.length) {
                this.localStorageCacheService.saveToLocalStorage('shopLocations', shopLocations);
                console.log('Shop locations cached');
              }
            }),
            map(shopLocations => actionGetShopLocationsSuccess({ shopLocations })),
            catchError(errorLoadingShopLocations => of(actionGetShopLocationsError({ errorLoadingShopLocations })))
          );
        }
      })
    )
  );
  

  loadShopLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGetShopLocation),
      switchMap(({ id }) =>
        this.shopLocationService.getShopLocation(id).pipe(
          map(shopLocation => actionGetShopLocationSuccess({ shopLocation })),
          catchError(errorLoadingShopLocation => of(actionGetShopLocationError({ errorLoadingShopLocation })))
        )
      )
    )
  );

  createShopLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionCreateShopLocation),
      switchMap(data =>
        this.shopLocationService.createShopLocation(data.shopLocationCreate).pipe(
          map(shopLocation => actionCreateShopLocationSuccess({ shopLocation })),
          catchError(errorCreatingShopLocation => of(actionCreateShopLocationError({ errorCreatingShopLocation })))
        )
      )
    )
  );

  updateShopLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionUpdateShopLocation),
      switchMap(({ id: shopLocationId, shopLocation: shopLocationUpdate }) =>
        this.shopLocationService.updateShopLocation(shopLocationId, shopLocationUpdate).pipe(
          map(() => actionUpdateShopLocationSuccess({ id: shopLocationId, shopLocation: shopLocationUpdate})),
          catchError(errorUpdatingShopLocation => of(actionUpdateShopLocationError({ errorUpdatingShopLocation })))
        )
      )
    )
  );
}
