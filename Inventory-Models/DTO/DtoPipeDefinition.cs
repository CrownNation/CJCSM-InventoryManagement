using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoPipeDefinition
    {
        public Guid PipeDefinitionId { get; set; }
        public string SectionId { get; set; }
        public string PidpeSizeId { get; set; }
        public string PipeConditionId { get; set; }
        public string PipeThreadId { get; set; }
        public string PipeGradeId { get; set; }
        public string PipeCoatingId { get; set; }
        public float Weight { get; set; }
        public float WallSize { get; set; }
    }
}
