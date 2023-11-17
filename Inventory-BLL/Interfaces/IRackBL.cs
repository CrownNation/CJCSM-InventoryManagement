using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface IRackBL
    {
        public Task<IQueryable<DtoRack>> GetRackList();
        public Task<DtoRack?> GetRackById(Guid guid);
        public Task<IQueryable<DtoRack_WithPipe>> GetRackListWithPipeAndCustomerByLocation(Guid locationId);
        public Task<DtoRack> CreateRack(DtoRackCreate rack);
        public Task UpdateRack(DtoRackUpdate dtoRack, Guid guid);
        public void DeleteRack(Guid guid);
    }
}
