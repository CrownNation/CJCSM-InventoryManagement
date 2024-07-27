import { PipeProperty_Grade, PipeProperty_Size } from "./pipe.model";

// --- Equipment ---
export interface Equipment{
    equipmentId: string;
    equipmentDefintionId: string;
    rackId: string;
    rackName: string;
    customerId: string;
    quantity: number;
    lengthInMeters: number;
    lengthInFeet: number;
    equipmentDefinition: EquipmentDefinition;
}

export interface DtoEquipmentCreate{
    equipmentId: string;
    rackId: string;
    equipmentDefintionId: string;
    customerId: string;
    shopLocationId: string;
    quantity: number;
    lengthInMeters: number;
    lengthInFeet: number;
}


export interface EquipmentDefinition {
    equipmentDefinitionId: string;
    isActive: boolean;
    category: string;
    description: string | null;
    notes: string | null;
    gradeId: string | null;
    sizeId: string | null;
    grade: PipeProperty_Grade | null;
    size: PipeProperty_Size | null;
}

export interface EquipmentDefinitionCreate {
    isActive: boolean;
    category: string;
    description: string | null;
    notes: string | null;
    gradeId: string | null;
    sizeId: string | null;
}

export interface EquipmentDefinitionSearchParams {
    category: string | null;
    description: string | null;
    gradeId: string | null;
    sizeId: string | null;
    isActive: boolean;
}