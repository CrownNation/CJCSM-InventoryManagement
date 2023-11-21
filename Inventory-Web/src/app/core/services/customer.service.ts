import { Injectable } from '@angular/core';
import { Customer, CustomerCreate } from '../../models/customer.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = environment.apiUrl + 'customer';

  constructor(private readonly http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}`);
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  addCustomer(rack: CustomerCreate): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, rack);
  }

  updateCustomer(rack: CustomerCreate): Observable<void> {
    return this.http.post<void>(this.baseUrl, rack);
  }
}
