import { Pipe } from "./pipe.model";

export interface Rack {
    rackId: string;
    name: string;
    shopLocationId: string;
    shopLocationName: string;
    isActive: boolean;
    description: string;
    jointsPerTier: number;
}


export interface RackWithPipe {
  rackId: string;
  name: string;
  shopLocationId: string;
  shopLocationName: string;
  isActive: boolean;
  description: string;
  jointsPerTier: number;
  pipeList: Pipe[];
}

export interface RackCreate {
    name: string;
    shopLocationId: string;
    isActive: boolean;
    description: string;
    jointsPerTier: number;
}

export interface RackUpdate {
  name: string;
  shopLocationId: string;
  description: string;
  jointsPerTier: number;
}

export interface RackSearchParams {
  name: string | null;
  shopId: string | null;
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
}
