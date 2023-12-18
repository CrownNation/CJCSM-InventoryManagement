import { Pipe } from "./pipe.model";

export interface Tier {
    tierId: string;
    rackId: string;
    number: number;
    pipe: Pipe[];    
}

export interface TierCreate {
    rackId: string;
    number: number;    
}