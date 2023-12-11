import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeCreate, PipeDefinitionSearchParams, PipeSearchParams, PipeUpdate } from '../../../models/pipe.model';
import { Observable } from 'rxjs';

type NewType = PipeSearchParams;

@Injectable({
  providedIn: 'root'
})
export class PipeService {

  private baseUrl = environment.apiUrl + 'pipe';

  constructor(private readonly http: HttpClient) { }

  getPipe(searchParams: PipeSearchParams | null): Observable<Pipe[]> {
    const queryParams = this.generateOdataParams(searchParams);
    return this.http.get<Pipe[]>(`${this.baseUrl}/WithDefinition${queryParams}`);
  }

  getPipeById(id: string): Observable<Pipe[]> {
    console.log('service');
    return this.http.get<Pipe[]>(`${this.baseUrl}/WithDefinition?$filter=pipeId eq ${id}`);
  }

  addPipe(pipe: PipeCreate): Observable<Pipe> {
    return this.http.post<Pipe>(this.baseUrl, pipe);
  }

  updatepipe(pipe: PipeUpdate): Observable<void> {
    return this.http.post<void>(this.baseUrl, pipe);
  }

  private generateOdataParams(searchParams: PipeSearchParams | null): string {
    if (!searchParams) {
      return '';
    }

    console.log('hit');
    console.log(searchParams);

    let odataParams = '';

    if (searchParams.pipeId) {
      odataParams += (odataParams ? ' and ' : '') + `customerId eq ${searchParams.pipeId}`;
    }

    if (searchParams.pipeDefinitionId) {
      odataParams += (odataParams ? ' and ' : '') + `pipeDefinitionId eq ${searchParams.pipeDefinitionId}`;
    }

    if (searchParams.lengthInMeters) {
      odataParams += (odataParams ? ' and ' : '') + `lengthInMeters eq ${searchParams.lengthInMeters}`;
    }

    if (searchParams.lengthInFeet) {
      odataParams += (odataParams ? ' and ' : '') + `lengthInFeet eq ${searchParams.lengthInFeet}`;
    }

    console.log(odataParams);

    return odataParams ? '?$filter=' + odataParams : '';
  }
}
