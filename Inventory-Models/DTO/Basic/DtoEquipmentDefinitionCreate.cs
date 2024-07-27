using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoEquipmentDefinitionCreate
    {
        public string Description { get; set; } = string.Empty;

        public string Category { get; set; } 

        public Guid? GradeId { get; set; }

        public Guid? SizeId { get; set; }

        public string Notes { get; set; } = string.Empty;
        public bool IsActive { get; set; }

    }
}
