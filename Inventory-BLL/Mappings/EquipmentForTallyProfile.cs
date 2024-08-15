using AutoMapper;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Mappings
{
   public class EquipmentForTallyProfile : Profile
   {
      public EquipmentForTallyProfile()
      {
         // Map between the entity and the DTO for general queries
         CreateMap<EquipmentForTally, DtoEquipmentForTally>();
         CreateMap<DtoEquipmentForTally, EquipmentForTally>();

         // Map between the entity and the creation DTO for creating new equipment for tally
         CreateMap<EquipmentForTally, DtoEquipmentForTallyCreate>();
         CreateMap<DtoEquipmentForTallyCreate, EquipmentForTally>();

      }
   }
}
