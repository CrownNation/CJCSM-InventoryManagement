using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inventory_DAL.Entities.PipeProperties;
using CJCSM_Common;

namespace Inventory_Dto.Dto
{
    public class DtoEquipmentDefinition
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
        public String Category { get; set; } = string.Empty;

        [Required]
        [ForeignKey("PipeProperty_Grade")]
        public Guid PipeProperty_GradeId { get; set; }

        [Required]
        [ForeignKey("PipeProperty_Size")]
        public Guid PipeProperty_SizeId { get; set; }
        public string? Notes { get; set; }

        public PipeProperty_Grade Grade { get; set; }
        public PipeProperty_Size Size { get; set; }

    }
}
