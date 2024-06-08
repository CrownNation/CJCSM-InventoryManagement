import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from '@ngrx/entity';
import { Rack, RackWithStock, RackWithTier } from '../../models/rack.model';
import { ShopLocation } from '../../models/shop-location.model';


export interface RackState extends EntityState<any> {
    loadingRacks: boolean;
    errorLoadingRacks: HttpErrorResponse | null;

    creatingRack: boolean,
    createdRack: Rack | null,
    errorCreatingRack: HttpErrorResponse | null,

    selectedRack: RackWithStock | null,
    errorLoadingSelectedRack: HttpErrorResponse | null,

    racksFullList: Rack[] | null;
    errorLoadingRacksList: HttpErrorResponse | null;

    racksWithTiers: RackWithTier[] | null;
    errorLoadingRacksWithTiers: HttpErrorResponse | null;

    shopLocations: ShopLocation[] | null;
    errorLoadingShopLocations: HttpErrorResponse | null;
}


