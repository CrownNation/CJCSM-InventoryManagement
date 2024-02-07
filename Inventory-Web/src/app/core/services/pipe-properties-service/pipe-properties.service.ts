import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PipeProperty_Category, PipeProperty_CategoryCreate, PipeProperty_CategorySearchParams } from 'src/app/models/pipe.model';

@Injectable({
  providedIn: 'root'
})
export class PipePropertiesService {

  private baseUrl = environment.apiUrl + 'pipe-property';

  constructor(private readonly http: HttpClient) { }

  getCategory(searchParams: PipeProperty_CategorySearchParams | null): Observable<PipeProperty_Category[]> {
    return this.http.get<PipeProperty_Category[]>(`${this.baseUrl}`);
  }

  addCategory(category: PipeProperty_CategoryCreate): Observable<PipeProperty_Category> {
    return this.http.post<PipeProperty_Category>(this.baseUrl, category);
  }

  updateCategory(category: PipeProperty_Category): Observable<void> {
    return this.http.put<void>(this.baseUrl, category);
  }


  // Generic method to fetch properties by type 
  getProperties<T>(propertyType: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${propertyType}`);
  }
  
  // Specific method for complex creation case, e.g., sizes with two integers
  createNumberProperty(propertyType: string, valueMetric: number, valueImperial: number): Observable<any> {
    const payload = { valueMetric, valueImperial }; // Construct the payload based on the method's inputs
    return this.http.post<any>(`${this.baseUrl}/${propertyType}`, payload);
  }

  // Generic method for simpler cases, such as creating a category with a single string
  createProperty<T>(propertyType: string, property: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${propertyType}`, property);
  }

  /**
   * Updates a property of a given type with the provided data.
   * @param propertyType The type of the property to update, e.g., 'categories', 'sizes'.
   * @param id The identifier of the property to be updated.
   * @param property The updated data for the property.
   * @returns An Observable of the updated property.
   */
  updateProperty<T>(propertyType: string, id: string , property: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${propertyType}/${id}`, property);
  }

}
