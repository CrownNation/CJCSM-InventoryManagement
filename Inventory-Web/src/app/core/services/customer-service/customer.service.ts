import { Injectable } from '@angular/core';
import { Customer, CustomerCreate, CustomerSearchParams, CustomerWithPipe } from '../../../models/customer.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = environment.apiUrl + 'customer';

  constructor(private readonly http: HttpClient) { }

  getCustomers(searchParams: CustomerSearchParams | null): Observable<Customer[]> {
    const queryParams = this.generateOdataParams(searchParams);
    return this.http.get<Customer[]>(`${this.baseUrl}${queryParams}`);
  }

  getCustomerById(id: string): Observable<CustomerWithPipe> {
    return this.http.get<CustomerWithPipe>(`${this.baseUrl}/WithPipe/${id}`);
  }

  addCustomer(rack: CustomerCreate): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, rack);
  }

  updateCustomer(rack: CustomerCreate): Observable<void> {
    return this.http.post<void>(this.baseUrl, rack);
  }


  private generateOdataParams(searchParams: CustomerSearchParams | null): string {
    if (!searchParams) {
      return '';
    }

    let odataParams = '';

    if (searchParams.customerId) {
      odataParams += (odataParams ? ' and ' : '') + `customerId eq ${searchParams.customerId}`;
    }    

    return odataParams ? '?$filter=' + odataParams : '';
  }





}
