using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using AutoMapper;
using Inventory_Models.DTO.Basic;

namespace Inventory_BLL.Mappings
{
    public class TallyEquipmentProfile : Profile
    {
        public TallyEquipmentProfile()
        {
            CreateMap<TallyEquipment, DtoTallyEquipment>();
            CreateMap<DtoTallyEquipment, TallyEquipment>();
        }

    }
}   
