import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PipeProperty_Category, PipeProperty_CategoryCreate, PipeProperty_CategorySearchParams, PipeProperty_Coating, PipeProperty_CoatingCreate, PipeProperty_CoatingSearchParams } from 'src/app/models/pipe.model';
import { tap  } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PipePropertiesService {

  private baseUrl = environment.apiUrl;
  constructor(private readonly http: HttpClient) { }


  // --- Category ---
  // getCategory(searchParams: PipeProperty_CategorySearchParams | null): Observable<PipeProperty_Category[]> {

  //   return this.http.get<PipeProperty_Category[]>(`${this.baseUrl}`);

  // }
  getCategory(searchParams: PipeProperty_CategorySearchParams | null): Observable<PipeProperty_Category[]> {
    return this.http.get<PipeProperty_Category[]>(`${this.baseUrl}PipeProperty_Category`).pipe(
      tap(categories => console.log('Categories retrieved:', categories))
    );
  }

  createCategory(category: PipeProperty_CategoryCreate): Observable<PipeProperty_Category> {
    return this.http.post<PipeProperty_Category>('{this.baseUrl}PipeProperty_Category', category);
  }
  updateCategory(id: string, category: PipeProperty_Category): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}PipeProperty_Category/${id}`, category);
  }

  // --- Coating ---
  getGetCoating(searchParams: PipeProperty_CoatingSearchParams | null): Observable<PipeProperty_Coating[]> {
    return this.http.get<PipeProperty_Coating[]>(`${this.baseUrl}PipeProperty_Coating`);
  }

  createCoating(coating: PipeProperty_CoatingCreate): Observable<PipeProperty_Coating> {
    return this.http.post<PipeProperty_Coating>(`${this.baseUrl}PipeProperty_Coating`, coating);
  }
  updateCoating(id: string, coating: PipeProperty_Coating): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}PipeProperty_Coating/${id}`, coating);
  }




  // --- Generic Getter ---
  getProperties<T>(propertyType: string, searchParams: any | null): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${propertyType}`, { params: searchParams });
  }

  // -- Generic Create and Update, but won't work for this reason:
  /*The effect for the create specifies the CategoryCreate, but the success, which requires the Category,
  * isn't getting that back from the generic method and so the error is saying that it needs the ID,
  * but it's not provided since the Create doesn't have an id. I can't specify two types in the <T> easily.
  * The only fix would be to somehow specify two different types when you create it, but that is clumsy.
  * So, the solution is to follow Angular standard practice and generate a different creaate and update method
  * for each property. But leaving these here since there may be a way to do this if given more thought. */
  createNumberProperty(propertyType: string, valueMetric: number, valueImperial: number): Observable<any> {
    const payload = { valueMetric, valueImperial }; // Construct the payload based on the method's inputs
    return this.http.post<any>(`${this.baseUrl}/${propertyType}`, payload);
  }
  createProperty<T>(propertyType: string, property: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${propertyType}`, property);
  }
  updateProperty<T>(propertyType: string, id: string , property: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${propertyType}/${id}`, property);
  }

}
