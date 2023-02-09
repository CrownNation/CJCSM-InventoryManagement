using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.ViewModels
{
    public class PipeDefinitionVM
    {
        [Key]
        public Guid PipeDefinitionId { get; set; }
        [ForeignKey("Section")]
        public string SectionId { get; set; }
        [ForeignKey("PipeSize")]
        public string PidpeSizeId { get; set; }
        [ForeignKey("PipeCondition")]
        public string PipeConditionId { get; set; }
        [ForeignKey("PipeThread")]
        public string PipeThreadId { get; set; }
        [ForeignKey("PipeGrade")]
        public string PipeGradeId { get; set; }
        [ForeignKey("PipeCoating")]
        public string PipeCoatingId { get; set; }
        public float Weight { get; set; }
        public float WallSize { get; set; }
    }
}
