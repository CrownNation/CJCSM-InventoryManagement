using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
   public interface IRackBL
   {
      public IQueryable<DtoRack> GetRacks();
      public Task<DtoRack?> GetRackById(Guid guid);
      public Task<DtoRack> CreateRack(DtoRackCreate rack);
      public void UpdateRack(DtoRackUpdate rack, Guid guid);
      public void DeleteRack(Guid guid);
   }
}
