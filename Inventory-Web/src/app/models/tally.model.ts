import { Customer } from "./customer.model";
import { Pipe, PipeCreate } from "./pipe.model";

export enum TallyTypes {
    TallyIn = 0,
    TallyOut = 1
}
  
export interface Tally {
    tallyId: string;
    tallyNumber: string;
    shipToId: string;
    shipToName: string;
    shipFromId: string;
    shipFromName: string;
    shopLocationId: string;
    shopName: string;
    tallyType: TallyTypes;
    consultantName: string; // type in field, just the name of the consultant
    landLocation: string; // the well the pipe came from
    via: string; // the trucking company
    dateOfCreation: Date;
    notes?: string;
}

export interface TallyCreate {
    tallyType: TallyTypes;
    tallyNumber: string;
    shopLocationId: string;
    shipToId: string; // customerId
    shipFromId: string; // customerId
    consultantName: string; // type in field, just the name of the consultant
    landLocation: string; // the well the pipe came from
    via: string; // the trucking company
    rackId: string;
    pipe: PipeCreate[];
    notes?: string;
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
