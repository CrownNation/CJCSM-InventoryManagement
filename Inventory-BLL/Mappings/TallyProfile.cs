using AutoMapper;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Mappings
{
    public class TallyProfile : Profile
    {
        public TallyProfile()
        {
            CreateMap<Tally, DtoTally>();
            CreateMap<DtoTally, Tally>();

            CreateMap<Tally, DtoTallyCreate>();
            CreateMap<DtoTallyCreate, Tally>();

            CreateMap<Tally, DtoTallyUpdate>();

            // Ignore TallyId since it is passed as a parameter and we don't want to ever update the TallyId
            CreateMap<DtoTallyUpdate, Tally>()
               .ForMember(dest => dest.TallyId, opt => opt.Ignore());
        }
    }
}
