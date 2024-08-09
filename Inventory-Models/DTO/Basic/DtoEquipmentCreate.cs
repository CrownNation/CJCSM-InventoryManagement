using CJCSM_Common;
using System.ComponentModel.DataAnnotations;

public class DtoEquipmentCreate
{
   public Guid EquipmentId { get; set; }

   [Required]
   public Guid RackId { get; set; }

   // This isn't actually used in the equipment create, but since it is used to display the rack name on the front end,
   // it is included here for the json mapping.
   public string RackName { get; set; } = string.Empty;

   [Required]
   public Guid EquipmentDefinitionId { get; set; }

   [Required]
   public Guid CustomerId { get; set; }

   [Required]
   public Guid ShopLocationId { get; set; }

   [Required]
   public int Quantity { get; set; }

   [Required]
   public Decimal LengthInMeters { get; set; }
   [Required]
   public Decimal LengthInFeet { get; set; }
}