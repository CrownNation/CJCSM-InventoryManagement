using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Inventory_Models.ViewModels;
using Microsoft.AspNetCore.OData.Query;

namespace Inventory_BLL.Interfaces
{
   public interface ISectionBL
   {
      public IQueryable<DtoSection> GetSections();
      public IQueryable<DtoSection>? GetSectionById(Guid guid);
      public Task<DtoSection> CreateSection(DtoSectionCreate section);
      public void UpdateSection(DtoSectionUpdate section, Guid guid);
      public void DeleteSection(Guid guid);
   }
}
