using AutoMapper;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Mappings
{
    public class PipeProperty_GradeProfile : Profile
    {
        public PipeProperty_GradeProfile()
        {
            
            CreateMap<DtoPipeProperty_Grade, PipeProperty_Grade>().ReverseMap();

            CreateMap<DtoPipeProperty_GradeUpdate, PipeProperty_Grade>()
                    .ForMember(dest => dest.PipeProperty_GradeId, opt => opt.Ignore());
            
        }
    }
}
