using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
   public interface IPipeDefinitionBL
   {
      public IQueryable<DtoPipeDefinition> GetPipeDefinitions();
      public IQueryable<DtoPipeDefinition>? GetPipeDefinitionById(Guid guid);

      public bool CheckIfPipeDefinitionExists(DtoPipeDefinitionSearchParams pipeDefinition);
      public Task<DtoPipeDefinition> CreatePipeDefinition(DtoPipeDefinitionCreate pipedefinition);
      public void UpdatePipeDefinition(DtoPipeDefinitionUpdate pipeDefinition, Guid guid);
      public void DisablePipeDefinition(Guid guid);
   }
}
