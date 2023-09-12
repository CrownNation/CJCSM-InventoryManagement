import { Customer } from "./customer.model";
import { Pipe, PipeCreate } from "./pipe.model";

export enum TallyType {
    TallyIn = 'In',
    TallyOut = 'Out'
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
    tallyType: TallyType;
    consultantName: string; // type in field, just the name of the consultant
    landLocation: string; // the well the pipe came from
    via: string; // the trucking company
    dateOfCreation: Date;
    notes?: string;
}

export interface TallyCreate {
    tallyType: TallyType;
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
