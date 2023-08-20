using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Inventory_Models.ViewModels;
using Microsoft.AspNetCore.OData.Query;

namespace Inventory_BLL.Interfaces
{
   public interface IRackBL
   {
      public IQueryable<RackDto> GetRacks();
      public IQueryable<RackDto>? GetRackById(Guid guid);
      public Task<RackDto> CreateRack(DtoRackCreate rack);
      public void UpdateRack(DtoRackUpdate rack, Guid guid);
      public void DeleteRack(Guid guid);
   }
}
