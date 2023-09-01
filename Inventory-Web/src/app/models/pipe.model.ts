import { Rack } from "./rack.model";

export interface PipeDefinition {
    pipeDefinitionId: string;
    pipeSize: PipeSize;
    pipeCondition: PipeCondition;
    pipeThread: PipeThread;
    pipeGrade: PipeGrade;
    pipeCoating: PipeCoating;
    weight: number;
    wallSize: number;
}

export interface Pipe {
    pipeId: string
    pipeDefintion: PipeDefinition;
    length: number;
    quantity: number;
    rack: Rack;
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



// Questions?
// WHhat is PipeDefinition?
// Is it specifi to the the pipe or is it a generic definition?
// Why does pipe have length but not weight? Especially if weight is on the definition.
