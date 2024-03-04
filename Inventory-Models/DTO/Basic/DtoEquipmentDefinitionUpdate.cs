using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoEquipmentDefinitionUpdate
    {
        [Required]
        public bool IsActive { get; set; }

        [Required]
        [StringLength(60)]
        public string Description { get; set; } 

        [Required]
        [StringLength(25)]
        public string Category { get; set; }

        [Required]
        public Guid PipeProperty_GradeId { get; set; }

        [Required]
        public Guid PipeProperty_SizeId { get; set; }

        public string? Notes { get; set; }
    }
}
