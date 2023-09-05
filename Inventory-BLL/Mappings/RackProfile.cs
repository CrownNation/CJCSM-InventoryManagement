using AutoMapper;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Mappings
{
    public class RackProfile : Profile
    {
        public RackProfile()
        {
            // Map between the entity and the DTO
            CreateMap<Rack, DtoRack>();
            CreateMap<DtoRack, Rack>();

            // Map between the entity and the creation DTO
            CreateMap<Rack, DtoRackCreate>();
            CreateMap<DtoRackCreate, Rack>();

            // Map between the entity and the update DTO
            CreateMap<Rack, DtoRackUpdate>();  

            // Ignore RackId since it is passed as a parameter and we don't want to ever update the RackId
            CreateMap<DtoRackUpdate, Rack>()
                .ForMember(dest => dest.RackId, opt => opt.Ignore());

        }
    }
}
