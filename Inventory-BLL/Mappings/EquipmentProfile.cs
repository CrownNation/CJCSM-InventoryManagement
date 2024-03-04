using AutoMapper;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Mappings
{
    public class EquipmentProfile : Profile
    {
        public EquipmentProfile()
        {
            // Map between the entity and the DTO for general queries
            CreateMap<EquipmentDefinition, DtoEquipmentDefinition>();
            CreateMap<DtoEquipmentDefinition, EquipmentDefinition>();

            // Map between the entity and the creation DTO for creating new equipment definitions
            CreateMap<EquipmentDefinition, DtoEquipmentDefinitionCreate>();
            CreateMap<DtoEquipmentDefinitionCreate, EquipmentDefinition>();

            // Map between the entity and the update DTO for updating existing equipment definitions
            CreateMap<EquipmentDefinition, DtoEquipmentDefinitionUpdate>();

            // When mapping from update DTO to the entity, ignore the EquipmentDefinitionId property
            // This ensures that the ID from the request URL is used, not the one possibly passed in the DTO
            CreateMap<DtoEquipmentDefinitionUpdate, EquipmentDefinition>()
                .ForMember(dest => dest.EquipmentDefinitionId, opt => opt.Ignore());
        }
    }
}
