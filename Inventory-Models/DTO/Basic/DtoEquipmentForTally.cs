using System.ComponentModel.DataAnnotations;

namespace Inventory_Dto.Dto
{
   // This object is to capture a snapshot of the equipment at the time of the tally. It represents equipment coming in or going out of the inventory.
   public class DtoEquipmentForTally
   {
      public Guid EquipmentForTallyId { get; set; }

      [Required]
      public Guid TallyId { get; set; }

      [Required]
      public Guid RackId { get; set; }

      public String RackName { get; set; }


      [Required]
      public Guid EquipmentDefinitionId { get; set; }

      [Required]
      public Guid CustomerId { get; set; }


      [Required]
      public int Quantity { get; set; }

      [Required]
      public Decimal LengthInMeters { get; set; }
      [Required]
      public Decimal LengthInFeet { get; set; }

      public DtoEquipmentDefinition EquipmentDefinition { get; set; }
   }
}
