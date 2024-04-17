
export interface Pipe {
    pipeId: string;
    pipeDefinitionId: string;
    tierId: string;
    customerId: string;
    tierNumber: number;
    rackId: string;
    rackName: string;
    lengthInMeters: number;
    lengthInFeet: number;
    quantity: number;
    indexOfPipe: number;
    pipeDefinition: PipeDefinition;
}

export interface PipeDefinition {
    pipeDefinitionId: string;
    isActive: boolean;
    categoryId: string | null;
    conditionId: string | null;
    gradeId: string | null;
    rangeId: string | null;
    sizeId: string | null;
    threadId: string | null;
    wallId: string | null;
    weightId: string | null;
    category: PipeProperty_Category | null;
    coating: PipeProperty_Coating | null;
    condition: PipeProperty_Condition | null;
    grade: PipeProperty_Grade | null;
    range: PipeProperty_Range | null;
    size: PipeProperty_Size | null;
    thread: PipeProperty_Thread | null;
    wall: PipeProperty_Wall | null;
    weight: PipeProperty_Weight | null;
}

export interface PipeProperty_Category {
    pipeProperty_CategoryId: string;
    name: string;
    isActive: boolean;
}
export interface PipeProperty_CategoryCreate {
    name: string;
    isActive: boolean;
}
export interface PipeProperty_CategoryUpdate {
    name: string;
    isActive: boolean;
}
export interface PipeProperty_CategorySearchParams {
    isActive: boolean | null;
    name: string | null;
  }
  
export interface PipeProperty_Coating {
    pipeProperty_CoatingId: string;
    name: string;
    isActive: boolean;
  }
export interface PipeProperty_CoatingCreate {
    name: string;
    isActive: boolean;
}
export interface PipeProperty_CoatingUpdate {
    name: string;
    isActive: boolean;
}
export interface PipeProperty_CoatingSearchParams {
    name: string | null;
    isActive: boolean | null;
}

export interface PipeProperty_Condition {
    pipeProperty_ConditionId: string;
    name: string;
    isActive: boolean;
}
export interface PipeProperty_ConditionCreate {
    name: string;
    isActive: boolean;
}
export interface PipeProperty_ConditionUpdate {
    name: string;
    isActive: boolean;
}
export interface PipeProperty_ConditionSearchParams {
    isActive: boolean | null;
    name: string | null;
}

// --- Grade ---
export interface PipeProperty_Grade {
    pipeProperty_GradeId: string;
    name: string;
    isActive: boolean;
}
export interface PipeProperty_GradeCreate {
    name: string;
    isActive: boolean;
}
export interface PipeProperty_GradeUpdate {
    name: string;
    isActive: boolean;
}
export interface PipeProperty_GradeSearchParams {
    isActive: boolean | null;
    name: string | null;
  }

// --- Range ---
export interface PipeProperty_Range {
    pipeProperty_RangeId: string;
    name: string;
    isActive: boolean;
}
export interface PipeProperty_RangeCreate {
    name: string;
    isActive: boolean;
}
export interface PipeProperty_RangeUpdate {
    name: string;
    isActive: boolean;
}
export interface PipeProperty_RangeSearchParams {
    isActive: boolean | null;
    name: string | null;
  }

// --- Size ---
export interface PipeProperty_Size {
    pipeProperty_SizeId: string;
    sizeMetric: number; // Decimal value for metric size with precision up to three decimal places
    sizeImperial: number; // Decimal value for imperial size with precision up to three decimal places
    isActive: boolean;
}

export interface PipeProperty_SizeCreate {
    sizeMetric: number; // Metric size to create
    sizeImperial: number; // Imperial size to create
    isActive: boolean;
}

export interface PipeProperty_SizeUpdate {
    sizeMetric: number; // New metric size
    sizeImperial: number; // New imperial size
    isActive: boolean;
}

export interface PipeProperty_SizeSearchParams {
    isActive: boolean | null;
    sizeMetric: number | null;
    sizeImperial: number | null;
}

// --- Thread ---
export interface PipeProperty_Thread {
    pipeProperty_ThreadId: string; // Unique identifier for the thread
    name: string;
    isActive: boolean; // Status to indicate if the thread is active
}

export interface PipeProperty_ThreadCreate {
    name: string;
    isActive: boolean;
}

export interface PipeProperty_ThreadUpdate {
    name: string;
    isActive: boolean;
}

export interface PipeProperty_ThreadSearchParams {
    isActive: boolean | null;
    name: string;
}

// --- Wall ---
export interface PipeProperty_Wall {
    pipeProperty_WallId: string;
    wallThicknessMetric: number; // Decimal value for wall thickness in metric units with precision up to three decimal places
    wallThicknessImperial: number; // Decimal value for wall thickness in imperial units with precision up to three decimal places
    isActive: boolean;
}
export interface PipeProperty_WallCreate {
    wallThicknessMetric: number; // Wall thickness in metric units to create
    wallThicknessImperial: number; // Wall thickness in imperial units to create
    isActive: boolean;
}
export interface PipeProperty_WallUpdate {
    wallThicknessMetric: number; // New metric wall thickness
    wallThicknessImperial: number; // New imperial wall thickness
    isActive: boolean;
}
export interface PipeProperty_WallSearchParams {
    isActive: boolean | null;
    wallThicknessMetric: number | null;
    wallThicknessImperial: number | null;
}

// --- Weight ---


// --- Weight ---
export interface PipeProperty_Weight {
    pipeProperty_WeightId: string;
    weightInKgPerMeter: number; // Decimal value for metric weight with precision up to three decimal places
    weightInLbsPerFoot: number; // Decimal value for imperial weight with precision up to three decimal places
    isActive: boolean;
}
export interface PipeProperty_WeightCreate {
    weightInKgPerMeter: number; // Metric weight to create
    weightInLbsPerFoot: number; // Imperial weight to create
    isActive: boolean;
}
export interface PipeProperty_WeightUpdate {
    weightInKgPerMeter: number; // New metric weight
    weightInLbsPerFoot: number; // New imperial weight
    isActive: boolean;
}
export interface PipeProperty_WeightSearchParams {
    isActive: boolean | null;
    weightInKgPerMeter: number | null;
    weightInLbsPerFoot: number | null;
}


// --- Pipe ---
export interface PipeSearchParams {
    pipeId: string | null;
    pipeDefinitionId: string | null;
    lengthInMeters: number | null;
    lengthInFeet: number | null;
    categoryId: string | null;
    conditionId: string | null;
    rackId: string | null;
}

export interface PipeDefinitionSearchParams {
    pipeProperty_WeightId: string;
    weightInKgPerMeter: number;
    weightInLbsPerFoot: number;
}

export interface PipeCreate {
    pipeProperty_WeightId: string;
    weightInKgPerMeter: number;
    weightInLbsPerFoot: number;
}

export interface PipeUpdate {
    pipeProperty_WeightId: string;
    weightInKgPerMeter: number;
    weightInLbsPerFoot: number;
}

export interface PipeDefinitionCreate {
    pipeProperty_WeightId: string;
    weightInKgPerMeter: number;
    weightInLbsPerFoot: number;
}

export interface PipeDefinitionUpdate {
    pipeProperty_WeightId: string;
    weightInKgPerMeter: number;
    weightInLbsPerFoot: number;
}



// ---------- Todo: remove these once they are not used on the pipe forms

export interface PipeCreate {
    pipeDefinitionId: string;
    length: number;
    quantity: number;
    rackId: string;
}



export interface PipeSize {
    pipeSizeId: string;
    measurementUnit: MeasurementUnit;
}

export interface PipeCondition {
    pipeConditionId: string;
    pipeCondition: string;
}

export interface PipeThread {
    pipeThreadId: string;
    pipeThread: string;
}

export interface PipeGrade {
    pipeGradeId: string;
    pipeGrade: string;
}

export interface PipeCoating {
    pipeCoatingId: string;
    pipeCoating: string;
}

export enum MeasurementUnit {
    metric = 'metric',
    imperial = 'imperial'
}