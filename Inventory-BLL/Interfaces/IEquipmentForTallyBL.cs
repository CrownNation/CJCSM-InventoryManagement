using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using System;
using System.Linq;

namespace Inventory_BLL.Interfaces
{
   public interface IEquipmentForTallyBL
   {
      IQueryable<DtoEquipmentForTally> GetEquipmentForTallyByTallyId(Guid tallyId);
      IQueryable<DtoEquipmentForTally> GetEquipmentForTallyWithDefinitionByTallyId(Guid tallyId);
      EquipmentForTally CreateEquipmentForTally(DtoEquipmentForTallyCreate dto);
      void DeactivateEquipmentForTally(Guid id);
   }
}
