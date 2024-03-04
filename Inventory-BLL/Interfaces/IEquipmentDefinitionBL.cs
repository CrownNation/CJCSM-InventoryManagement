using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface IEquipmentDefinitionBL
    {
        // Gets all EquipmentDefinition entities as an IQueryable
        IQueryable<EquipmentDefinition> GetEquipmentDefinitions();

        // Gets a single EquipmentDefinition entity by its ID
        EquipmentDefinition? GetEquipmentDefinitionById(Guid id);

        // Creates a new EquipmentDefinition entity using a DTO
        EquipmentDefinition CreateEquipmentDefinition(DtoEquipmentDefinitionCreate equipmentDefinitionCreateDto);

        // Updates an existing EquipmentDefinition entity identified by its ID using a DTO
        void UpdateEquipmentDefinition(Guid id, DtoEquipmentDefinitionUpdate equipmentDefinitionUpdateDto);

        // Deletes (or deactivates) an EquipmentDefinition entity identified by its ID
        void DeactivateEquipmentDefinition(Guid id);
    }
}
