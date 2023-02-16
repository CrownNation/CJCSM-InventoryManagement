using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Inventory_Models.ViewModels;
using Microsoft.AspNetCore.OData.Query;

namespace Inventory_BLL.Interfaces
{
   public interface IPipeDefinitionBL
   {
      public IQueryable<PipeDefinitionDto> GetPipeDefintions();
      public IQueryable<PipeDefinitionDto>? GetPipeDefinitionById(Guid guid);
      public Task<PipeDefinitionDto> CreatePipeDefinition(PipeDefinitionCreateDto pipedefinition);
      public void UpdatePipeDefinition(PipeDefinitionUpdateDto pipeDefinition, Guid guid);
      public void DeletePipeDefinition(Guid guid);
   }
}
