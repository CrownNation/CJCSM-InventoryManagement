import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Rack, RackCreate, RackSearchParams, RackWithStock, RackWithTier } from 'src/app/models/rack.model';
import { environment } from '../../../../environments/environment';
import { ShopLocation } from '../../../models/shop.model';

@Injectable({
  providedIn: 'root'
})
export class RackService {

  private readonly http: HttpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'rack';

  constructor() { }

  getRacks(searchParams: RackSearchParams | null): Observable<Rack[]> {
    const queryParams = this.generateOdataParams(searchParams);
    return this.http.get<Rack[]>(`${this.baseUrl}${queryParams}`);
  }

  getRacksWithTiers(): Observable<RackWithTier[]> {
    return this.http.get<RackWithTier[]>(`${this.baseUrl}/WithTier`);
  }

  getRackById(id: string): Observable<RackWithStock[]> {
    return this.http.get<RackWithStock[]>(`${this.baseUrl}/${id}/WithStock`);
  }

  // Todo: Create and move to shop-location service
  getShopLocations(): Observable<ShopLocation[]> {
    return this.http.get<ShopLocation[]>(`${environment.apiUrl}ShopLocation`);
  }

  addRack(rack: RackCreate): Observable<Rack> {
    return this.http.post<Rack>(this.baseUrl, rack);
  }

  updateRack(rack: RackCreate): Observable<void> {
    return this.http.post<void>(this.baseUrl, rack);
  }

  private generateOdataParams(searchParams: RackSearchParams | null): string {
    if (!searchParams) {
      return '';
    }

    let odataParams = '';

    if (searchParams.name) {
      odataParams += (odataParams ? ' and ' : '') + `rackId eq ${searchParams.name}`;
    }

    if (searchParams.shopId) {
      odataParams += (odataParams ? ' and ' : '') + `shopLocationId eq ${searchParams.shopId}`;
    }

    return odataParams ? '?$filter=' + odataParams : '';
  }


}
