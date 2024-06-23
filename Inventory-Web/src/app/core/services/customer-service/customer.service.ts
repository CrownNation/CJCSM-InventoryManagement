import { Injectable } from '@angular/core';
import { Customer, CustomerCreate, CustomerSearchParams, CustomerUpdate, CustomerWithPipe } from '../../../models/customer.model';
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

  addCustomer(customer: CustomerCreate): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, customer);
  }

  updateCustomer(pipe: CustomerUpdate): Observable<void> {
    return this.http.post<void>(this.baseUrl, pipe);
  }

  private generateOdataParams(searchParams: CustomerSearchParams | null): string {
    if (!searchParams) {
      return '';
    }


    const odataParams: string[] = [];

    if (searchParams.customerName) {
      console.log("name: " + searchParams.customerName);

      odataParams.push(`contains(name, '${encodeURIComponent(searchParams.customerName)}')`);
    }else{
      console.log("NO NAME");
    }

    const odataQueryString = odataParams.length > 0 ? `?$filter=${odataParams.join(' and ')}` : '';
    console.log("FILTER: " + odataQueryString);

    return odataQueryString;

  }





}
