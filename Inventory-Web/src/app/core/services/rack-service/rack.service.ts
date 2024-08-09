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

  getEquipmentRacks(): Observable<Rack[]> {
    return this.http.get<Rack[]>(`${this.baseUrl}/Equipment`);
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

    const odataParams: string[] = [];

    // Use the `contains` function for substring search on rackName
    if (searchParams.name) {
        odataParams.push(`contains(name, '${encodeURIComponent(searchParams.name)}')`);
    }

    // Use the `eq` operator for exact matching on rackType
    if (searchParams.rackType) {
        odataParams.push(`rackType eq '${encodeURIComponent(searchParams.rackType)}'`);
    }

    // Use the `eq` operator for exact matching on shop location id
    if (searchParams.shopId) {
        odataParams.push(`ShopLocationId eq ${encodeURIComponent(searchParams.shopId)}`);
    }

    const odataQueryString = odataParams.length > 0 ? `?$filter=${odataParams.join(' and ')}` : '';

    return odataQueryString;}

}
