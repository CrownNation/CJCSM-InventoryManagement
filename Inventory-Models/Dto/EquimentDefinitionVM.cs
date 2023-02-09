using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.ViewModels
{
    public class EquipmentDefinitionVM
    {
        [Key]
        public Guid EquipmentDefinitionId { get; set; }
        public string Name { get; set; }
        public string? Notes { get; set; }
    }
}
