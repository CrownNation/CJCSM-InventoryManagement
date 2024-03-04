using CJCSM_Common;
using System.ComponentModel.DataAnnotations;

public class DtoEquipmentCreate
{
    public Guid EquipmentId { get; set; }

    [Required]
    public Guid RackId { get; set; }

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