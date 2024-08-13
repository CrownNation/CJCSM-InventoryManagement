import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Tally, DtoTallyCreate, TallySearchParams } from '../../../models/tally.model';
import { TallyTypes } from 'src/app/enums/tally-types.enum';

@Injectable({
  providedIn: 'root'
})
export class TallyService {

  private baseUrl = environment.apiUrl + 'tally';

  constructor(private readonly http: HttpClient) { }

  getTallies(searchParams: TallySearchParams | null): Observable<Tally[]> {
    const queryParams = this.generateOdataParams(searchParams);
    return this.http.get<Tally[]>(`${this.baseUrl}${queryParams}`);
  }

  getTallyById(id: string): Observable<Tally> {
    return this.http.get<Tally>(`${this.baseUrl}/${id}`);
  }

  addTally(tally: DtoTallyCreate): Observable<Tally> {
    return this.http.post<Tally>(this.baseUrl, tally);
  }

  updateTally(tally: DtoTallyCreate): Observable<void> {
    return this.http.put<void>(this.baseUrl, tally);
  }


  private generateOdataParams(searchParams: TallySearchParams | null): string {
    if (!searchParams) {
      return '';
    }

    let odataParams = '';

    if (searchParams.tallyType !== undefined && searchParams.tallyType !== null && TallyTypes[searchParams.tallyType]) {
      odataParams += (odataParams ? ' and ' : '') + `TallyType eq '${TallyTypes[searchParams.tallyType]}'`;
    }

    if (searchParams.tallyNumber) {
      odataParams += (odataParams ? ' and ' : '') + `TallyNumber eq '${searchParams.tallyNumber}'`;
    }

    if (searchParams.customerId) {
      odataParams += (odataParams ? ' and ' : '') + `CustomerId eq ${searchParams.customerId}`;
    }

    if (searchParams.dateStart) {
      odataParams += (odataParams ? ' and ' : '') + `DateOfCreation ge ${searchParams.dateStart}`;
    }

    if (searchParams.dateEnd) {
      odataParams += (odataParams ? ' and ' : '') + `DateOfCreation le ${searchParams.dateEnd}`;
    }

    return odataParams ? '?$filter=' + odataParams : '';
  }


}
