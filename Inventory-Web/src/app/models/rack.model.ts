import { Equipment } from "./equipment.model";
import { Pipe } from "./pipe.model";

export interface Rack {
    rackId: string;
    name: string;
    shopLocationId: string;
    shopLocationName: string;
    rackType: string;
    isActive: boolean;
    description: string;
    jointsPerTier: number;
}


export interface RackWithStock {
  rackId: string;
  name: string;
  shopLocationId: string;
  shopLocationName: string;
  rackType: string;
  isActive: boolean;
  description: string;
  jointsPerTier: number;
  pipeList: Pipe[];
  equipmentList: Equipment[];
}

export interface RackCreate {
    name: string;
    shopLocationId: string;
    isActive: boolean;
    description: string;
    jointsPerTier: number;
    rackType: string;
}

export interface RackUpdate {
  name: string;
  shopLocationId: string;
  description: string;
  jointsPerTier: number;
  rackType: string;
}

export interface RackSearchParams {
  name: string | null;
  shopId: string | null;
  rackType: string | null;
}

export interface TierWithPipeInfo {
  tierId: string;
  rackId: string;
  number: number;
  pipeCount: number;
}

export interface RackWithTier {
  rackId: string;
  name: string;
  shopLocationId: string;
  shopLocationName: string;
  isActive: boolean;
  description: string;
  jointsPerTier: number;
  tierList: TierWithPipeInfo[];
  rackType: string;
}
