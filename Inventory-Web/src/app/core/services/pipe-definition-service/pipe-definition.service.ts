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

  addPipeDefinition(pipe: PipeDefinitionCreate): Observable<PipeDefinition> {
    return this.http.post<PipeDefinition>(this.baseUrl, pipe);
  }

  updatepipeDefinition(pipe: PipeDefinitionUpdate): Observable<void> {
    return this.http.post<void>(this.baseUrl, pipe);
  }

  private generateOdataParams(searchParams: PipeDefinitionSearchParams | null): string {
    if (!searchParams) {
      return '';
    }

    let odataParams = '';

    // if (searchParams.pipeId) {
    //   odataParams += (odataParams ? ' and ' : '') + `customerId eq ${searchParams.customerId}`;
    // }

    return odataParams ? '?$filter=' + odataParams : '';
  }
}

