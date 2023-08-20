using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Inventory_Models.ViewModels;
using Microsoft.AspNetCore.OData.Query;

namespace Inventory_BLL.Interfaces
{
   public interface IPipeDefinitionBL
   {
      public IQueryable<DtoPipeDefinition> GetPipeDefintions();
      public IQueryable<DtoPipeDefinition>? GetPipeDefinitionById(Guid guid);
      public Task<DtoPipeDefinition> CreatePipeDefinition(DtoPipeDefinitionCreate pipedefinition);
      public void UpdatePipeDefinition(DtoPipeDefinitionUpdate pipeDefinition, Guid guid);
      public void DeletePipeDefinition(Guid guid);
   }
}
