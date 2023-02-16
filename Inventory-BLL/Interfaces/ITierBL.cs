using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Inventory_Models.ViewModels;
using Microsoft.AspNetCore.OData.Query;

namespace Inventory_BLL.Interfaces
{
   public interface ITierBL
   {
      public IQueryable<TierDto> GetTiers();
      public IQueryable<TierDto>? GetTierById(Guid guid);
      public Task<TierDto> CreateTier(TierCreateDto tier);
      public void UpdateTier(TierUpdateDto tier, Guid guid);
      public void DeleteTier(Guid guid);
   }
}
