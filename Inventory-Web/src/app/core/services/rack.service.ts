import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Rack, RackCreate } from 'src/app/models/rack.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RackService {

  private readonly http: HttpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'rack';

  constructor() { }

  getRacks(): Observable<Rack[]> {
    return this.http.get<Rack[]>(`${this.baseUrl}`);
    // return this.http.get<RackBasic[]>(`${this.baseUrl}/dummy`);
  }

  getRackById(id: string): Observable<Rack> {
    return this.http.get<Rack>(`${this.baseUrl}/${id}`);
    // return this.http.get<RackBasic>(`${this.baseUrl}/dummy/${id}`);
  }

  addRack(rack: RackCreate): Observable<void> {
    return this.http.post<void>(this.baseUrl, rack);
  }

  updateRack(rack: RackCreate): Observable<void> {
    return this.http.post<void>(this.baseUrl, rack);
  }


}
