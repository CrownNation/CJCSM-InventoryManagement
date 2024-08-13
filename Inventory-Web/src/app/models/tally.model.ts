import { TallyTypes } from "../enums/tally-types.enum";
import { EquipmentCreate } from "./equipment.model";
import { Pipe, PipeCreate } from "./pipe.model";


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
  tierWithPipeList?: DtoTierWithPipe[];
  equipmentList?: EquipmentCreate[];
}

export interface DtoTierWithPipe {
  tierId: string;
  pipeList: PipeCreate[];
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