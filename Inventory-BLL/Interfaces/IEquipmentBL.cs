using Inventory_DAL.Entities;

namespace Inventory_BLL.Interfaces
{
    public interface IEquipmentBL
    {
        // Retrieves all equipment records as a queryable object.
        IQueryable<Equipment> GetEquipments();

        // Retrieves a single equipment record by its unique identifier.
        Equipment GetEquipmentById(Guid id);

        // Creates a new equipment record based on the provided DTO.
        Equipment CreateEquipment(DtoEquipmentCreate dto);

        // Updates an existing equipment record identified by its unique identifier with the data provided in the DTO.
        void UpdateEquipment(Guid id, DtoEquipmentUpdate dto);

        // Deactivates (logically deletes) an equipment record identified by its unique identifier.
        void DeactivateEquipment(Guid id);
    }
}
