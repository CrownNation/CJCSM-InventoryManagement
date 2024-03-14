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
            CreateMap<Equipment, DtoEquipment>();
            CreateMap<DtoEquipment, Equipment>();

            // Map between the entity and the creation DTO for creating new equipment s
            CreateMap<Equipment, DtoEquipmentCreate>();
            CreateMap<DtoEquipmentCreate, Equipment>();

            // Map between the entity and the update DTO for updating existing equipment s
            CreateMap<Equipment, DtoEquipmentUpdate>();

            // When mapping from update DTO to the entity, ignore the EquipmentId property
            // This ensures that the ID from the request URL is used, not the one possibly passed in the DTO
            CreateMap<DtoEquipmentUpdate, Equipment>()
                .ForMember(dest => dest.EquipmentId, opt => opt.Ignore());
        }
    }
}
