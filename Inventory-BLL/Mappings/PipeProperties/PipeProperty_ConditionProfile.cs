using AutoMapper;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Models.DTO.PipeProperties;

namespace Inventory_BLL.Mappings.PipeProperties
{
    public class PipeProperty_ConditionProfile : Profile
    {    
        public PipeProperty_ConditionProfile() {
            CreateMap<DtoPipeProperty_Condition, PipeProperty_Condition>().ReverseMap();

            CreateMap<DtoPipeProperty_ConditionUpdate, PipeProperty_Condition>()
                .ForMember(dest => dest.PipeProperty_ConditionId, opt => opt.Ignore());
        }

    }
}
