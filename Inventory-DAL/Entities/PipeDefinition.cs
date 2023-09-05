using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_DAL.Entities
{
    public class PipeDefinition
    {
        [Key]
        public Guid PipeDefinitionId { get; set; }
        [Required]
        public Guid PipeSizeId { get; set; }
        [Required]
        public Guid PipeConditionId { get; set; }
        [Required]
        public Guid PipeThreadId { get; set; }
        [Required]
        public Guid PipeGradeId { get; set; }
        [Required]
        public Guid PipeCoatingId { get; set; }
        [Required]
        public float Weight { get; set; }
        [Required]
        public float WallSizeMetric { get; set; }
        [Required]
        public bool IsActive { get; set; } = true;

    }
}
