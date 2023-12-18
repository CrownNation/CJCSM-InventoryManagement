using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Inventory_Models.DTO;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory_BLL.BL
{
    public class ShopLocationBL : IShopLocationBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public ShopLocationBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoShopLocation> GetShopLocations()
        {
            IQueryable<ShopLocation> entity = _context.ShopLocation.AsQueryable();
            IQueryable<DtoShopLocation> shopLocations = _mapper.ProjectTo<DtoShopLocation>(entity);

            return shopLocations;
        }

        public IQueryable<DtoShopLocation>? GetShopLocationById(Guid guid)
        {
            IQueryable<ShopLocation>? shopLocation = _context.ShopLocation.Where(x => x.ShopLocationId == guid);
            if (shopLocation.Any())
            {
                IQueryable<DtoShopLocation> DtoShopLocation = _mapper.ProjectTo<DtoShopLocation>(shopLocation);
                return DtoShopLocation;
            }

            throw new KeyNotFoundException($"No shop location with guid {guid} can be found.");
        }

        public async Task<DtoShopLocation> CreateShopLocation(DtoShopLocationCreateAndUpdate DtoShopLocation)
        {
            if (DtoShopLocation == null)
                throw new ArgumentNullException("Create Shop Location failed. The shop location data is null");
            if (String.IsNullOrEmpty(DtoShopLocation.Name))
                throw new ArgumentNullException("Create Shop Location failed. The shop location name cannot be null or empty.");

            ShopLocation shopLocation = _mapper.Map<ShopLocation>(DtoShopLocation);

            shopLocation.ShopLocationId = Guid.NewGuid();
            _context.ShopLocation.Add(shopLocation);
            await _context.SaveChangesAsync();

            return _mapper.Map<DtoShopLocation>(shopLocation);
        }

        public void UpdateShopLocation(DtoShopLocationCreateAndUpdate DtoShopLocationUpdate, Guid guid)
        {
            ShopLocation? shopLocation = _context.ShopLocation.Find(guid);

            if (shopLocation == null)
                throw new KeyNotFoundException($"No shop location with guid {guid} can be found.");

            _mapper.Map(DtoShopLocationUpdate, shopLocation);
            _context.SaveChanges();
        }

        public void DeleteShopLocation(Guid guid)
        {
            ShopLocation? shopLocation = _context.ShopLocation.Find(guid);

            if (shopLocation == null)
                throw new KeyNotFoundException($"No shop location with guid {guid} can be found.");

            _context.ShopLocation.Remove(shopLocation);
            _context.SaveChanges();
        }
    }
}
