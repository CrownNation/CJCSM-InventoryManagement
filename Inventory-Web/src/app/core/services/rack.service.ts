import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RackBasic } from 'src/app/models/rack.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RackService {

  private readonly http: HttpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'rack';

  constructor() { }

  // Todo: Update the url to the correct one
  addRack(rack: RackBasic): Observable<void> {
    return this.http.post<void>(this.baseUrl, rack);
  }

  getRacks(): Observable<RackBasic[]> {

    console.log('getRacks');
    console.log(this.baseUrl)

    return this.http.get<RackBasic[]>(`${this.baseUrl}/dummy`);
  }

  getRackById(id: string): Observable<RackBasic> {
    return this.http.get<RackBasic>(`${this.baseUrl}/dummy/${id}`);
  }


}
