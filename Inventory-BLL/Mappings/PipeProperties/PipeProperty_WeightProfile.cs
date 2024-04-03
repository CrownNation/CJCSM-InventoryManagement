using AutoMapper;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Mappings
{
    internal class PipeProperty_WeightProfile : Profile
    {
        public PipeProperty_WeightProfile()
        {
            CreateMap<DtoPipeProperty_Weight, PipeProperty_Weight>().ReverseMap();
            CreateMap<DtoPipeProperty_WeightUpdate, PipeProperty_Weight>()
                .ForMember(dest => dest.PipeProperty_WeightId, opt => opt.Ignore());
        }

    }
}
