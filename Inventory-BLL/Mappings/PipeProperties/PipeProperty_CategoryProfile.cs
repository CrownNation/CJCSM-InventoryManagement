using AutoMapper;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;
using Inventory_Models.DTO;

namespace Inventory_BLL.Mappings
{
    public class PipeProperty_CategoryProfile : Profile
    {
        public PipeProperty_CategoryProfile()
        {
            CreateMap<DtoPipeProperty_Category, PipeProperty_Category>().ReverseMap();
            CreateMap<DtoPipeProperty_CategoryUpdate, PipeProperty_Category>()
                .ForMember(dest => dest.PipeProperty_CategoryId, opt => opt.Ignore());

        }

    }
}
