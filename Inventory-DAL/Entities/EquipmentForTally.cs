using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory_DAL.Entities
{
   // This is the object that represents equipment coming in or going out of the inventory.
   public class EquipmentForTally
   {
      [Key]
      public Guid EquipmentForTallyId { get; set; }

      [Required]
      public Guid TallyId { get; set; }

      [Required]
      [ForeignKey("Rack")]
      public Guid RackId { get; set; }

      [Required]
      [ForeignKey("EquipmentDefinition")]
      public Guid EquipmentDefinitionId { get; set; }

      [Required]
      [ForeignKey("Customer")]
      public Guid CustomerId { get; set; }

      [Required]
      public int Quantity { get; set; }

      [Required]
      public Decimal LengthInMeters { get; set; }

   }
}
