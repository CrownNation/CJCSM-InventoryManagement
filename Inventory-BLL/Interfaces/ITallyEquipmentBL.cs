using Inventory_Models.DTO.Basic;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory_BLL.Interfaces
{
    public interface ITallyEquipmentBL
    {
        // Gets all TallyEquipment entities as an IQueryable
        IQueryable<DtoTallyEquipment> GetTallyEquipmentList();

        // Gets a single TallyEquipment entity by its composite key (TallyId and EquipmentId)
        IQueryable<DtoTallyEquipment>? GetTallyEquipmentByCompositeKey(Guid tallyId, Guid equipmentId);

        // Creates a new TallyEquipment entity
        Task<DtoTallyEquipment> CreateTallyEquipment(DtoTallyEquipment dtoTallyEquipment);

        // Updates an existing TallyEquipment entity identified by its composite key (TallyId and EquipmentId)
        void UpdateTallyEquipment(DtoTallyEquipment dtoTallyEquipment, Guid tallyId, Guid equipmentId);

        // Deletes (or deactivates) a TallyEquipment entity identified by its composite key (TallyId and EquipmentId)
        void DeleteTallyEquipment(Guid tallyId, Guid equipmentId);
    }
}
