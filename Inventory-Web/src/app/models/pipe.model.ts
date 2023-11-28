
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
}

export interface PipeProperty_Condition {
    pipeProperty_ConditionId: string;
    name: string;
}

export interface PipeProperty_Grade {
    pipeProperty_GradeId: string;
    name: string;
}

export interface PipeProperty_Range {
    pipeProperty_RangeId: string;
    name: string;
}

export interface PipeProperty_Size {
    pipeProperty_SizeId: string;
    sizeMetric: number;
    sizeImperial: number;
}

export interface PipeProperty_Thread {
    pipeProperty_ThreadId: string;
    name: string;
}

export interface PipeProperty_Wall {
    pipeProperty_WallId: string;
    wallMetric: number;
    wallImperial: number;
}

export interface PipeProperty_Weight {
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