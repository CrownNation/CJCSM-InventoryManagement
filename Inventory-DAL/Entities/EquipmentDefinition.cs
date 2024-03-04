﻿using System;
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
        public string Cateogry { get; set; } = string.Empty;

        [Required]
        [ForeignKey("PipeProperty_Grade")]
        public Guid PipeProperty_GradeId { get; set; }

        [Required]
        [ForeignKey("PipeProperty_GradeSize")]
        public Guid PipeProperty_SizeId { get; set; }
        public string? Notes { get; set; }
    }
}
