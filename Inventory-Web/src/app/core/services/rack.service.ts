import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Rack } from 'src/app/models/rack.model';

@Injectable({
  providedIn: 'root'
})
export class RackService {

  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }

  // Todo: Update the url to the correct one
  addRack(rack: Rack): Observable<void> {
    return this.http.post<void>('api/racks', rack);
  }
}
