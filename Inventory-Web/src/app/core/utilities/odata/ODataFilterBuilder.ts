import { PipeSearchParams } from "src/app/models/pipe.model";

export class ODataFilterBuilder {
    static generatePipeODataParams(searchParams: PipeSearchParams | null): string {
      if (!searchParams) {
        return '';
      }
  
      const odataParams: string[] = [];
  
      if (searchParams.categoryId) {
        odataParams.push(`pipeDefinition/categoryId eq ${searchParams.categoryId}`);
      }
      if (searchParams.coatingId) {
        odataParams.push(`pipeDefinition/coatingId eq ${searchParams.coatingId}`);
      }
      if (searchParams.conditionId) {
        odataParams.push(`pipeDefinition/conditionId eq ${searchParams.conditionId}`);
      }
      if (searchParams.gradeId) {
        odataParams.push(`pipeDefinition/gradeId eq ${searchParams.gradeId}`);
      }
      if (searchParams.rangeId) {
        odataParams.push(`pipeDefinition/rangeId eq ${searchParams.rangeId}`);
      }
      if (searchParams.sizeId) {
        odataParams.push(`pipeDefinition/sizeId eq ${searchParams.sizeId}`);
      }
      if (searchParams.threadId) {
        odataParams.push(`pipeDefinition/threadId eq ${searchParams.threadId}`);
      }
      if (searchParams.wallId) {
        odataParams.push(`pipeDefinition/wallId eq ${searchParams.wallId}`);
      }
      if (searchParams.weightId) {
        odataParams.push(`pipeDefinition/weightId eq ${searchParams.weightId}`);
      }
      if (searchParams.isActive !== null) {
        odataParams.push(`pipeDefinition/isActive eq ${searchParams.isActive}`);
      }
  
      const filterQuery = odataParams.join(' and ');
  
      // Add the '$filter=' prefix if there are any filter parameters
      return filterQuery ? `?$filter=${filterQuery}` : '';
    }
  }