import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Tally, TallyCreate, TallySearchParams } from '../../models/tally.model';

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

  addTally(tally: TallyCreate): Observable<Tally> {
    return this.http.post<Tally>(this.baseUrl, tally);
  }

  updateTally(tally: TallyCreate): Observable<void> {
    return this.http.post<void>(this.baseUrl, tally);
  }

  // http://localhost:5000/odata/People?$filter=Date ge 2022-01-01T00:00:00Z and Date le 2022-12-31T23:59:59Z

  private generateOdataParams(searchParams: TallySearchParams | null): string {
    if (!searchParams) {
      return '';
    }

    let odataParams = '';

    if (searchParams.tallyType) {
      odataParams += (odataParams ? ' and ' : '') + `TallyType eq '${searchParams.tallyType}'`;
    }
    
    if (searchParams.tallyNumber) {
      odataParams += (odataParams ? ' and ' : '') + `TallyNumber eq '${searchParams.tallyNumber}'`;
    }
    
    if (searchParams.customerId) {
      odataParams += (odataParams ? ' and ' : '') + `CustomerId eq '${searchParams.customerId}'`;
    }
    
    if (searchParams.dateStart) {
      odataParams += (odataParams ? ' and ' : '') + `Date ge '${searchParams.dateStart}'`;
    }
    
    if (searchParams.dateEnd) {
      odataParams += (odataParams ? ' and ' : '') + `Date le '${searchParams.dateEnd}'`;
    }

    return odataParams ? '?$filter=' + odataParams : '';

  }

}
