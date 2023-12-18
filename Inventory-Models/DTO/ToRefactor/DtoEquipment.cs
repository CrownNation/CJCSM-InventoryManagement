using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.DTO.ToRefactor
{
    public class DtoEquipment
    {
        public Guid EquipmentId { get; set; }
        public string CustomerId { get; set; }
        public int? Quantity { get; set; }
    }
}
