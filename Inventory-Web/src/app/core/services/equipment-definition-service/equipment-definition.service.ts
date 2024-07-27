import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EquipmentDefinition, EquipmentDefinitionCreate, EquipmentDefinitionSearchParams } from '../../../models/equipment.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentDefinitionService {

  private baseUrl = environment.apiUrl + 'equipmentDefinition';

  constructor(private readonly http: HttpClient) { }

  getEquipmentDefinitions(searchParams: EquipmentDefinitionSearchParams | null): Observable<EquipmentDefinition[]> {
    const queryParams = this.generateOdataParams(searchParams);
    return this.http.get<EquipmentDefinition[]>(`${this.baseUrl}${queryParams}`);
  }

  getEquipmentDefinitionById(id: string): Observable<EquipmentDefinition> {
    return this.http.get<EquipmentDefinition>(`${this.baseUrl}/${id}`);
  }

  // createEquipmentDefinition(equipment: EquipmentDefinitionCreate): Observable<EquipmentDefinition> {
  //   return this.http.post<EquipmentDefinition>(this.baseUrl, equipment);
  // }

  createEquipmentDefinition(equipment: EquipmentDefinitionCreate): Observable<EquipmentDefinition> {
    console.log('Sending request to create equipment definition with data:', equipment);
    return this.http.post<EquipmentDefinition>(this.baseUrl, equipment);
  }

  updateEquipmentDefinition(id: string, equipment: EquipmentDefinition): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, equipment);
  }

  // checkEquipmentDefinitionExists(params: EquipmentDefinitionSearchParams): Observable<boolean> {
  //   return this.http.post<boolean>(this.baseUrl + '/check-exists', params);
  // }

  checkEquipmentDefinitionExists(params: EquipmentDefinitionSearchParams): Observable<boolean> {
    return this.http.post<{ exists: boolean }>(this.baseUrl + '/check-exists', params).pipe(
      map(response => response.exists)  // Extracting the boolean value from the object
      // the service will always return a response. But in this context,
      // since I define the exists:boolean in the post call,
      // the response will have that variable embedded. So in the scope of this function,
      // I can map to that variable from the response and return that.
      // I'm a bit confused about this still, but it appears as though this will return a 'response' object
      // even though I declare the return typ eas Observable<boolean>. I guess this is
      // more an expection of server return than an actual enforced type.
    );
  }
  private generateOdataParams(searchParams: EquipmentDefinitionSearchParams | null): string {
    if (!searchParams) {
      return '';
    }

    const odataParams: string[] = [];

    if (searchParams.description) {
      odataParams.push(`contains(description, '${encodeURIComponent(searchParams.description)}')`);
    }
    if (searchParams.gradeId) {
      odataParams.push(`GradeId eq ${encodeURIComponent(searchParams.gradeId)}`);
    }
    if (searchParams.sizeId) {
      odataParams.push(`SizeId eq ${encodeURIComponent(searchParams.sizeId)}`);
    }
    if (searchParams.isActive) {
      odataParams.push(`IsActive eq ${encodeURIComponent(searchParams.isActive)}`);
    }
    if (searchParams.category) {
      odataParams.push(`Category eq '${encodeURIComponent(searchParams.category)}'`);
    }

    const odataFilterString = odataParams.length > 0 ? `?$filter=${odataParams.join(' and ')}` : '';
    console.log(odataFilterString);

    return odataFilterString;
  }
}
