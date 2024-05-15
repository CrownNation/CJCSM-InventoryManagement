using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoEquipment
    {
        public Guid EquipmentId { get; set; }

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
