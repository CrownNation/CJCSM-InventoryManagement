import { Pipe } from "./pipe.model";

export interface Rack {
    rackId: string;
    name: string;
    shopLocationId: string;
    shopLocationName: string;
    isActive: boolean;
    description: string;
    jointsPerRack: number;
}


export interface RackWithPipe {
  rackId: string;
  name: string;
  shopLocationId: string;
  shopLocationName: string;
  isActive: boolean;
  description: string;
  jointsPerRack: number;
  pipeList: Pipe[];
}

export interface RackCreate {
    name: string;
    shopLocationId: string;
    isActive: boolean;
    description: string;
    jointsPerRack: number;
}

export interface RackUpdate {
    name: string;
    shopLocationId: string;
    description: string;
    jointsPerRack: number;
  }

export interface RackSearchParams {
    name: string | null;
    shopId: string | null;
}
