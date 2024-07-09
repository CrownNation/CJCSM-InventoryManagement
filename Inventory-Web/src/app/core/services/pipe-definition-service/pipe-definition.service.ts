import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PipeDefinition, PipeDefinitionCreate, PipeDefinitionSearchParams, PipeDefinitionUpdate } from '../../../models/pipe.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PipeDefinitionService {

  private baseUrl = environment.apiUrl + 'pipeDefinition';

  constructor(private readonly http: HttpClient) { }

  getPipeDefinitions(searchParams: PipeDefinitionSearchParams | null): Observable<PipeDefinition[]> {
    const queryParams = this.generateOdataParams(searchParams);
    return this.http.get<PipeDefinition[]>(`${this.baseUrl}${queryParams}`);
  }

  getPipeDefinitionById(id: string): Observable<PipeDefinition> {
    return this.http.get<PipeDefinition>(`${this.baseUrl}/${id}`);
  }

  createPipeDefinition(pipe: PipeDefinitionCreate): Observable<PipeDefinition> {
    return this.http.post<PipeDefinition>(this.baseUrl, pipe);
  }

  updatePipeDefinition(id: string, pipe: PipeDefinition): Observable<void> {
    return this.http.post<void>(this.baseUrl, pipe);
  }

  checkPipeDefinitionExists(params: PipeDefinitionSearchParams): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + '/check-exists', params);
  }


  private generateOdataParams(searchParams: PipeDefinitionSearchParams | null): string {
    if (!searchParams) {
      return '';
    }

    const odataParams: string[] = [];

    // Iterate over each parameter in PipeDefinitionSearchParams and append condition if not null
    if (searchParams.categoryId) {
      odataParams.push(`CategoryId eq ${encodeURIComponent(searchParams.categoryId)}`);
    }
    if (searchParams.coatingId) {
      odataParams.push(`CoatingId eq ${encodeURIComponent(searchParams.coatingId)}`);
    }
    if (searchParams.conditionId) {
      odataParams.push(`ConditionId eq ${encodeURIComponent(searchParams.conditionId)}`);
    }
    if (searchParams.gradeId) {
      odataParams.push(`GradeId eq ${encodeURIComponent(searchParams.gradeId)}`);
    }
    if (searchParams.rangeId) {
      odataParams.push(`RangeId eq ${encodeURIComponent(searchParams.rangeId)}`);
    }
    if (searchParams.sizeId) {
      odataParams.push(`SizeId eq ${encodeURIComponent(searchParams.sizeId)}`);
    }
    if (searchParams.threadId) {
      odataParams.push(`ThreadId eq ${encodeURIComponent(searchParams.threadId)}`);
    }
    if (searchParams.wallId) {
      odataParams.push(`WallId eq ${encodeURIComponent(searchParams.wallId)}`);
    }
    if (searchParams.weightId) {
      odataParams.push(`WeightId eq ${encodeURIComponent(searchParams.weightId)}`);
    }

    // Generate the full OData filter string
    const odataFilterString = odataParams.length > 0 ? `?$filter=${odataParams.join(' and ')}` : '';

    // Return the OData filter string
    return odataFilterString;
  }


}

