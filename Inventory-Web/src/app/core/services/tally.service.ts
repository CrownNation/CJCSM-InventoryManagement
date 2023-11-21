import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Tally, TallyCreate } from '../../models/tally.model';

@Injectable({
  providedIn: 'root'
})
export class TallyService {

  private baseUrl = environment.apiUrl + 'tally';

  constructor(private readonly http: HttpClient) { }

  getTallies(): Observable<Tally[]> {
    return this.http.get<Tally[]>(`${this.baseUrl}`);
    // return this.http.get<RackBasic[]>(`${this.baseUrl}/dummy`);
  }

  getTallyById(id: string): Observable<Tally> {
    return this.http.get<Tally>(`${this.baseUrl}/${id}`);
    // return this.http.get<RackBasic>(`${this.baseUrl}/dummy/${id}`);
  }

  addTally(tally: TallyCreate): Observable<Tally> {
    return this.http.post<Tally>(this.baseUrl, tally);
  }

  updateTally(tally: TallyCreate): Observable<void> {
    return this.http.post<void>(this.baseUrl, tally);
  }
}
