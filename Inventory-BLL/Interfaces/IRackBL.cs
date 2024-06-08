using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface IRackBL
    {
        public Task<IQueryable<DtoRack>> GetRackList();
        public IQueryable<DtoRack?> GetRackById(Guid guid);
        public IQueryable<DtoRack_WithStock> GetRackWithPipeAndCustomerByRackId(Guid rackId);

        public IQueryable<DtoRack_WithStock> GetRackListWithStockAndCustomerByRackId(Guid rackId);

        public IQueryable<DtoRack_WithStock> GetRackListWithPipeAndCustomer();

        public Task<IQueryable<DtoRack_WithTier>> GetRackListWithTiers();

        public Task<DtoRack> CreateRack(DtoRackCreate rack);
        public Task UpdateRack(DtoRackUpdate dtoRack, Guid guid);
        public void DeleteRack(Guid guid);
    }
}
