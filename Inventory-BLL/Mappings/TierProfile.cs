using AutoMapper;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Mappings
{
    public class TierProfile : Profile
    {
        public TierProfile()
        {
            CreateMap<Tier, DtoTier>();
            CreateMap<DtoTier, Tier>();

            CreateMap<Tier, DtoTierCreate>();
            CreateMap<DtoTierCreate, Tier>();

            CreateMap<Tier, DtoTierUpdate>();

            // Ignore TierId since it is passed as a parameter and we don't want to ever update the TierId
            CreateMap<DtoTierUpdate, Tier>()
               .ForMember(dest => dest.TierId, opt => opt.Ignore());

        }
    }
}
