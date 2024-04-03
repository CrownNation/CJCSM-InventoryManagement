using AutoMapper;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Mappings
{
    public class PipeProperty_SizeProfile : Profile
    {
        public PipeProperty_SizeProfile()
        {
            CreateMap<DtoPipeProperty_Size, PipeProperty_Size>().ReverseMap();
            CreateMap<DtoPipeProperty_SizeUpdate, PipeProperty_Size>()
                .ForMember(dest => dest.PipeProperty_SizeId, opt => opt.Ignore());

        }

    }
}
