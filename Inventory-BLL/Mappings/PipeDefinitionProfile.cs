using AutoMapper;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Mappings
{
    public class PipeDefinitionProfile : Profile
    {
        public PipeDefinitionProfile()
        {
            // Mapping between PipeDefinition entity and DTOs
            CreateMap<PipeDefinition, DtoPipeDefinition>();
            CreateMap<DtoPipeDefinition, PipeDefinition>();

            CreateMap<PipeDefinition, DtoPipeDefinitionCreate>();
            CreateMap<DtoPipeDefinitionCreate, PipeDefinition>();

            CreateMap<PipeDefinition, DtoPipeDefinitionUpdate>();

            // Ignore PipeDefinitionId since it is passed as a parameter and we don't want to ever update the PipeDefinitionId
            CreateMap<DtoPipeDefinitionUpdate, PipeDefinition>()
               .ForMember(dest => dest.PipeDefinitionId, opt => opt.Ignore());
        }
    }
}
