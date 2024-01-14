import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from '@ngrx/entity';
import { Rack, RackWithPipe, RackWithTier } from '../../models/rack.model';
import { ShopLocation } from '../../models/shop.model';


export interface RackState extends EntityState<any> {
    loadingRacks: boolean;
    errorLoadingRacks: HttpErrorResponse | null;

    creatingRack: boolean,
    createdRack: Rack | null,
    errorCreatingRack: HttpErrorResponse | null,

    selectedRack: RackWithPipe | null,
    errorLoadingSelectedRack: HttpErrorResponse | null,

    racksFullList: Rack[] | null;
    errorLoadingRacksList: HttpErrorResponse | null;

    racksWithTiers: RackWithTier[] | null;
    errorLoadingRacksWithTiers: HttpErrorResponse | null;

    shopLocations: ShopLocation[] | null;
    errorLoadingShopLocations: HttpErrorResponse | null;
}


