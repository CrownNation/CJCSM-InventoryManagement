using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.DTO.ToRefactor
{
    public class DtoEquipmentDefinition
    {
        public Guid EquipmentDefinitionId { get; set; }
        public string Name { get; set; }
        public string? Notes { get; set; }
    }
}
