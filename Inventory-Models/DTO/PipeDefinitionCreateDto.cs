using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class PipeDefinitionCreateDto
    {
        public Guid PipeDefinitionId { get; set; }
        [StringLength(30)]
        public string SectionId { get; set; }
        [StringLength(30)]
        public string PidpeSizeId { get; set; }
        [StringLength(30)]
        public string PipeConditionId { get; set; }
        [StringLength(30)]
        public string PipeThreadId { get; set; }
        [StringLength(30)]
        public string PipeGradeId { get; set; }
        [StringLength(30)]
        public string PipeCoatingId { get; set; }
        [StringLength(30)]
        public float Weight { get; set; }
        public float WallSize { get; set; }
    }
}
