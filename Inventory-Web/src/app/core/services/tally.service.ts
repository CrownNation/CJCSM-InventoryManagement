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

    console.log('getTallies');

    return this.http.get<Tally[]>(`${this.baseUrl}?filter=TallyNumber eq 'TN0002'`);
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
}
