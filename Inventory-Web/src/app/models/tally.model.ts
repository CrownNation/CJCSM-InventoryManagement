import { Customer } from "./customer.model";
import { Pipe, PipeCreate } from "./pipe.model";

export enum TallyTypes {
    TallyIn = 0,
    TallyOut = 1
}

export interface Tally {
    tallyId: string;
    tallyNumber: string;
    customerId: string;
    customerName: string;
    shopLocationId: string;
    shopLocationName: string;
    tallyType: TallyTypes;
    dateOfCreation: Date;
    notes?: string;
    pipeList: Pipe[];
    invoiceNumber?: string;
    talliedByUserId: string;
    talliedByUserName: string;
    carrierName?: string;
    weightInKg: number;
    weightInLbs: number;
}

export interface DtoTallyCreate {
  tallyNumber: string;
  customerId: string;
  shopLocationId: string;
  tallyType: TallyTypes;
  dateOfCreation: string;
  notes?: string;
  invoiceNumber?: string;
  talliedByUserId: string;
  carrierName: string;
  pipeList: Pipe[];
}

export interface DtoTally_WithPipeAndCustomer {
    tallyId: string;
    tallyNumber: string;
    customerId: string;
    customerName: string;
    shopLocationId: string;
    shopLocationName: string;
    tallyType: TallyTypes;
    dateOfCreation: Date;
    notes?: string;
    pipeList: Pipe[];
    invoiceNumber?: string;
    talliedByUserId: string;
    talliedByUserName: string;
    carrierName?: string;
    weightInKg: number;
    weightInLbs: number;
  }

export interface TallySearchParams {
    tallyType: TallyTypes | null;
    tallyNumber: string | null;
    customerId: string | null;
    dateStart: string | null;
    dateEnd: string | null;
}