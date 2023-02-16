using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Inventory_Models.ViewModels;
using Microsoft.AspNetCore.OData.Query;

namespace Inventory_BLL.Interfaces
{
   public interface ISectionBL
   {
      public IQueryable<SectionDto> GetSections();
      public IQueryable<SectionDto>? GetSectionById(Guid guid);
      public Task<SectionDto> CreateSection(SectionCreateDto section);
      public void UpdateSection(SectionUpdateDto section, Guid guid);
      public void DeleteSection(Guid guid);
   }
}
