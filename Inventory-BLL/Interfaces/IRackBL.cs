using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface IRackBL
    {
        public Task<IQueryable<DtoRack>> GetRackList();
        public IQueryable<DtoRack?> GetRackById(Guid guid);
        public IQueryable<DtoRack_WithPipe> GetRackListWithPipeAndCustomerByRackId(Guid rackId);

        public IQueryable<DtoRack_WithPipe> GetRackListWithPipeAndCustomer();

        public Task<IQueryable<DtoRack_WithTier>> GetRackListWithTiers();

        public Task<DtoRack> CreateRack(DtoRackCreate rack);
        public Task UpdateRack(DtoRackUpdate dtoRack, Guid guid);
        public void DeleteRack(Guid guid);
    }
}
