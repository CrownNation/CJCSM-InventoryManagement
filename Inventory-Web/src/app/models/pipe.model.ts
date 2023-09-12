import { Rack } from "./rack.model";

export interface Pipe {
    pipeId: string
    pipeDefintion: PipeDefinition;
    length: number;
    quantity: number;
    rack: Rack;
}

export interface PipeCreate {
    pipeDefinitionId: string;
    length: number;
    quantity: number;
    rackId: string;
}

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