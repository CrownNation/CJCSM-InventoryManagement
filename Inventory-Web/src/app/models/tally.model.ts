export enum TallyTypes {
    TallyIn = 'TallyIn',
    TallyOut = 'TallyOut'
}
  
export interface Tally {
    tallyId: string;
    tallyName: string;
    customerId: string;
    customerName: string;
    shopLocationId: string;
    shopName: string;
    tallyType: TallyTypes;
    dateOfCreation: Date;
    notes?: string;
}

export interface TallyCreate {
    shopLocationId: string;
    tallyType: TallyTypes;
    notes?: string;
}
