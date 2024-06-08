import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeCreate, PipeDefinitionSearchParams, PipeSearchParams, PipeUpdate } from '../../../models/pipe.model';
import { Observable } from 'rxjs';

import { catchError, tap, map } from 'rxjs/operators';

type NewType = PipeSearchParams;

@Injectable({
  providedIn: 'root'
})
export class PipeService {

  private baseUrl = environment.apiUrl + 'pipe';

  constructor(private readonly http: HttpClient) { }


  // {{baseUrl}}/Tally/?$filter=pipeList/any(pipe: pipe/pipeDefinition/gradeId eq e11bf57c-a56f-47a8-aba2-37b8b3b94370)

// let url = `${this.baseUrl}/pipe/WithDefinition?$filter=pipeDefinition/categoryId eq ${categoryId} and pipeDefinition/conditionId eq ${conditionId}`;

// {{baseUrl}}/Pipe/withDefinition?$filter=pipeDefinition/categoryId eq F20FD88E-A7E2-4920-8678-1D393C7DB2D4 and pipeDefinition/conditionId eq 1ACDA59F-9C05-4491-9FDC-F282E6022EC2

// getPipe(searchParams: PipeSearchParams | null): Observable<Pipe[]> {
//     const queryParams = this.generateOdataParams(searchParams);
//     return this.http.get<Pipe[]>(`${this.baseUrl}/WithDefinition${queryParams}`);
//   }

getPipe(searchParams: PipeSearchParams | null): Observable<Pipe[]> {
  const queryParams = this.generateOdataParams(searchParams);
  return this.http.get<Pipe[]>(`${this.baseUrl}/WithDefinition${queryParams}`).pipe(
    tap({
      next: pipes => console.log('Received pipes:', pipes),
      error: error => console.error('Error fetching pipes:', error)
    })
  );
}
  getPipeById(id: string): Observable<Pipe[]> {
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

    console.log()
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

    if (searchParams.categoryId) {
      odataParams += (odataParams ? ' and ' : '') + `pipeDefinition/categoryId eq ${searchParams.categoryId}`;
    }

    if (searchParams.conditionId) {
      odataParams += (odataParams ? ' and ' : '') + `pipeDefinition/conditionId eq ${searchParams.conditionId}`;
    }

    if (searchParams.rackId) {
      odataParams += (odataParams ? ' and ' : '') + `rackId eq ${searchParams.rackId}`;
    }

    console.log(odataParams);

    return odataParams ? '?$filter=' + odataParams : '';
  }
}
