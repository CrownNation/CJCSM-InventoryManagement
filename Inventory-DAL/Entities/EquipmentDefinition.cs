using Inventory_DAL.Entities.PipeProperties;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_DAL.Entities
{
    public class EquipmentDefinition
    {
        [Key]
        public Guid EquipmentDefinitionId { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;

        [Required]
        [StringLength(60)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [StringLength(25)]
        public string Category { get; set; } = string.Empty;

        [Required]
        [ForeignKey("PipeProperty_Grade")]
        public Guid GradeId { get; set; }

        [Required]
        [ForeignKey("PipeProperty_GradeSize")]
        public Guid SizeId { get; set; }
        public string? Notes { get; set; }

        // Navigation properties
        public virtual PipeProperty_Grade Grade { get; set; }
        public virtual PipeProperty_Size Size { get; set; }

    }
}
