import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable , throwError} from 'rxjs';
import { Rack, RackCreate, RackSearchParams, RackWithStock, RackWithTier } from 'src/app/models/rack.model';
import { environment } from '../../../../environments/environment';
import { ShopLocation } from '../../../models/shop-location.model';

import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RackService {

  private readonly http: HttpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'rack';

  constructor() { }

  getRacks(searchParams: RackSearchParams | null): Observable<Rack[]> {
    const queryParams = this.generateOdataParams(searchParams);
    return this.http.get<Rack[]>(`${this.baseUrl}${queryParams}`).pipe(
      catchError(error => {
        return throwError(() => new Error('Failed to fetch racks'));
      })
    );
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

    const conditions: string[] = [];

    // Use the `contains` function for substring search on rackName
    if (searchParams.name) {
        conditions.push(`contains(name, '${encodeURIComponent(searchParams.name)}')`);
    }

    // Use the `eq` operator for exact matching on rackType
    if (searchParams.rackType) {
        conditions.push(`rackType eq '${encodeURIComponent(searchParams.rackType)}'`);
    }

    // Use the `eq` operator for exact matching on shop location id
    if (searchParams.shopId) {
        conditions.push(`ShopLocationId eq ${encodeURIComponent(searchParams.shopId)}`);
    }

    const odataQueryString = conditions.length > 0 ? `?$filter=${conditions.join(' and ')}` : '';

    // Log the constructed OData query string for debugging
    console.log("generateOdataParams: Constructed OData query string:", odataQueryString);

    return odataQueryString;}

}
