using AutoMapper;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Mappings
{
    public class EquipmentDefinitionProfile : Profile
    {
        public EquipmentDefinitionProfile()
        {
            // Map between the entity and the DTO for general queries
            CreateMap<EquipmentDefinition, DtoEquipmentDefinition>().ReverseMap();

            // Map between the entity and the creation DTO for creating new equipment definitions
            // Assuming DtoEquipmentDefinitionCreate is specifically designed for creation and might not contain an ID
            CreateMap<DtoEquipmentDefinitionCreate, EquipmentDefinition>();
            CreateMap<EquipmentDefinition, DtoEquipmentDefinitionCreate>();

            // Map between the entity and the update DTO for updating existing equipment definitions
            CreateMap<DtoEquipmentDefinitionUpdate, EquipmentDefinition>()
                .ForMember(dest => dest.EquipmentDefinitionId, opt => opt.Ignore()); // Ensure the ID is not overwritten during an update
            CreateMap<EquipmentDefinition, DtoEquipmentDefinitionUpdate>();

        }
    }
}
