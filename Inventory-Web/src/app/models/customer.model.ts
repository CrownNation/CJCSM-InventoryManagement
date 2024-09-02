import { Pipe } from "./pipe.model";

export interface Customer {
    customerId: string;
    name: string;
    address1?: string;
    address2?: string;
    city?: string;
    provinceState?: string;
    country?: string;
    postalCode?: string;
    email?: string;
    isActive: boolean;
    dateOfCreation: string;
    dateOfLastUpdate: string;
  }

export interface CustomerCreate {
    name: string;
    address1?: string;
    address2?: string;
    city?: string;
    provinceState?: string;
    country?: string;
    postalCode?: string;
    email?: string;
}

export interface CustomerUpdate {
  name: string;
  address1?: string;
  address2?: string;
  city?: string;
  provinceState?: string;
  postalCode?: string;
  email?: string;
}

export interface CustomerWithPipe {
    customerId: string;
    customer: Customer;
    pipeList: Pipe[];
  }


export interface CustomerSearchParams {
    customerName: string | null;
}