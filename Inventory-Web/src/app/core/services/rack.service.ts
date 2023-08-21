import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Rack } from 'src/app/models/rack.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RackService {

  private readonly http: HttpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'rack';

  constructor() { }

  // Todo: Update the url to the correct one
  addRack(rack: Rack): Observable<void> {
    return this.http.post<void>(this.baseUrl, rack);
  }

  getRacks(): Observable<Rack[]> {

    console.log('getRacks');
    console.log(this.baseUrl)

    return this.http.get<Rack[]>(`${this.baseUrl}/dummy`);
  }

  getRackById(id: string): Observable<Rack> {
    return this.http.get<Rack>(`${this.baseUrl}/dummy/${id}`);
  }


}
