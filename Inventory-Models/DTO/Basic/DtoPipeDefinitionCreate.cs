using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoPipeDefinitionCreate
    {
        public Guid PipeSizeId { get; set; }
        public Guid PipeConditionId { get; set; }
        public Guid PipeThreadId { get; set; }
        public Guid PipeGradeId { get; set; }
        public Guid PipeCoatingId { get; set; }
        public float Weight { get; set; }
        public float WallSizeMetric { get; set; }
        public bool IsActive { get; set; }

    }
}
