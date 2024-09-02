import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentGeneratorService {

  private apiUrl = environment.apiUrl + 'tally';

  constructor(private http: HttpClient) { }

  generateTallyPdf(tallyId: string): Observable<Blob> {
    const url = `${this.apiUrl}/${tallyId}/GenerateTallyPdf`;
    return this.http.get(url, { responseType: 'blob' });
  }
  generatePipeDocument(pipeData: any): void {
    // Implement document generation logic
  }

  generateEquipmentDocument(equipmentData: any): void {
    // Implement document generation logic
  }
}
