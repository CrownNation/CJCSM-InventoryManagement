using AutoMapper;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using static CJCSM_Common.ApplicationEnums;

namespace Inventory_BLL.Mappings
{
    public class TallyProfile : Profile
    {
        public TallyProfile()
        {
            CreateMap<Tally, DtoTally>()
                .ForMember(dest => dest.TallyType, opt => opt.MapFrom(src => (TallyTypes)src.TallyType));

            CreateMap<DtoTally, Tally>()
                .ForMember(dest => dest.TallyType, opt => opt.MapFrom(src => (int)src.TallyType));


            CreateMap<Tally, DtoTallyCreate>()
                .ForMember(dest => dest.TallyType, opt => opt.MapFrom(src => (TallyTypes)src.TallyType));

            CreateMap<DtoTallyCreate, Tally>();

            CreateMap<Tally, DtoTallyUpdate>()
               .ForMember(dest => dest.TallyType, opt => opt.MapFrom(src => (TallyTypes)src.TallyType));


            // Ignore TallyId since it is passed as a parameter and we don't want to ever update the TallyId
            CreateMap<DtoTallyUpdate, Tally>()
               .ForMember(dest => dest.TallyId, opt => opt.Ignore())
               .ForMember(dest => dest.TallyType, opt => opt.MapFrom(src => (int)src.TallyType));
        }
    }
}
