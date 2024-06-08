import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from '@ngrx/entity';
import { ShopLocation } from '../../models/shop-location.model';

export interface ShopLocationState extends EntityState<any> {
    loadingShopLocations: boolean;
    errorLoadingShopLocations: HttpErrorResponse | null;

    creatingShopLocation: boolean,
    errorCreatingShopLocation: HttpErrorResponse | null,

    selectedShopLocation: ShopLocation | null;
    errorLoadingSelectedShopLocation: HttpErrorResponse | null;

    shopLocationsList: ShopLocation[] | null,
    errorLoadingShopLocationsList: HttpErrorResponse | null;
}
