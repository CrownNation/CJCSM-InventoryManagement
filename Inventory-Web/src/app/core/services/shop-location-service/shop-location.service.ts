import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShopLocation, ShopLocationCreate } from 'src/app/models/shop-location.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopLocationService {
    
  private baseUrl = environment.apiUrl + 'shoplocation';

  constructor(private http: HttpClient) { }

  // Get all shop locations
  // getShopLocations(params: any): Observable<ShopLocation[]> {
  //   return this.http.get<ShopLocation[]>(`${this.baseUrl}`, { params });
  // }

  getShopLocations(params: any): Observable<ShopLocation[]> {
    const url = `${this.baseUrl}/shop-locations`; // Assuming 'shop-locations' is the endpoint
    console.log('Requesting shop locations from URL:', url, 'with params:', params);
    return this.http.get<ShopLocation[]>(url, { params });
  }

  // Get a single shop location by ID
  getShopLocation(id: string): Observable<ShopLocation> {
    return this.http.get<ShopLocation>(`${this.baseUrl}/${id}`);
  }

  // Create a new shop location
  createShopLocation(shopLocationCreate: ShopLocationCreate): Observable<ShopLocation> {
    return this.http.post<ShopLocation>(`${this.baseUrl}`, shopLocationCreate);
  }

  // Update an existing shop location
  updateShopLocation(id: string, shopLocationUpdate: ShopLocation): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, shopLocationUpdate);
  }
}
