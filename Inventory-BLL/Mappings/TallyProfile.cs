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
            CreateMap<Tally, DtoTally_WithPipeAndCustomer>()
                .ForMember(dest => dest.TallyType, opt => opt.MapFrom(src => (TallyTypes)src.TallyType));

            CreateMap<DtoTally_WithPipeAndCustomer, Tally>()
                .ForMember(dest => dest.TallyType, opt => opt.MapFrom(src => (int)src.TallyType));


            CreateMap<Tally, DtoTallyCreate>()
                .ForMember(dest => dest.TallyType, opt => opt.MapFrom(src => (TallyTypes)src.TallyType));

            CreateMap<DtoTallyCreate, Tally>();

            CreateMap<Tally, DtoTally_WithPipeAndCustomer>()
                .ForMember(dest => dest.TallyType, opt => opt.MapFrom(src => (TallyTypes)src.TallyType))
                .ForMember(dest => dest.TallyPipes, opt => opt.MapFrom(src => src.TallyPipes));


            // Ignore TallyId since it is passed as a parameter and we don't want to ever update the TallyId
            CreateMap<DtoTallyUpdate, Tally>()
               .ForMember(dest => dest.TallyId, opt => opt.Ignore())
               .ForMember(dest => dest.TallyType, opt => opt.MapFrom(src => (int)src.TallyType));

            CreateMap<TallyPipe, DtoTallyPipe>();
            CreateMap<DtoTallyPipe, TallyPipe>();

        }
    }
}
