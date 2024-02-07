using System;
using System.Linq;
using System.Threading.Tasks;
using Inventory_Dto.Dto;
using Inventory_Models.DTO;

namespace Inventory_BLL.Interfaces
{
    public interface IShopLocationBL
    {
        public IQueryable<DtoShopLocation> GetShopLocations();
        public IQueryable<DtoShopLocation>? GetShopLocationById(Guid guid);

        public Task<DtoShopLocation> CreateShopLocation(DtoShopLocationCreateAndUpdate shopLocation);
        public void UpdateShopLocation(DtoShopLocationCreateAndUpdate shopLocation, Guid guid);
        public void DeleteShopLocation(Guid guid);
    }
}
