using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_DAL.Entities
{
    public class Equipment
    {
        [Key]
        public Guid EquipmentId { get; set; }

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
        [ForeignKey("ShopLocation")]
        public Guid ShopLocationId { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public Decimal LengthInMeters { get; set; }
        [Required]
        public Decimal LengthInFeet { get; set; }

    }
}
