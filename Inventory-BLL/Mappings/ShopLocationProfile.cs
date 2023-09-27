using AutoMapper;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Inventory_Models.DTO;

namespace Inventory_BLL.Mappings
{
    public class ShopLocationProfile : Profile
    {
        public ShopLocationProfile()
        {
            CreateMap<ShopLocation, DtoShopLocation>();
            CreateMap<DtoShopLocation, ShopLocation>();

            CreateMap<ShopLocation, DtoShopLocationCreateAndUpdate>();

            // Ignore ShopLocationId since it is passed as a parameter and we don't want to ever update the ShopLocationId
            CreateMap<DtoShopLocationCreateAndUpdate, ShopLocation>()
               .ForMember(dest => dest.ShopLocationId, opt => opt.Ignore());
        }
    }
}
