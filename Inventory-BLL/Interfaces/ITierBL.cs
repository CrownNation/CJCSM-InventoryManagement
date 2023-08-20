using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Inventory_Models.ViewModels;
using Microsoft.AspNetCore.OData.Query;

namespace Inventory_BLL.Interfaces
{
   public interface ITierBL
   {
      public IQueryable<DtoTier> GetTiers();
      public IQueryable<DtoTier>? GetTierById(Guid guid);
      public Task<DtoTier> CreateTier(DtoTierCreate tier);
      public void UpdateTier(DtoTierUpdate tier, Guid guid);
      public void DeleteTier(Guid guid);
   }
}
