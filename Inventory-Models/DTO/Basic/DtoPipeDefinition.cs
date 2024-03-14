using Inventory_DAL.Entities.PipeProperties;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoPipeDefinition
    {
        public Guid PipeDefinitionId { get; set; }

        public bool IsActive { get; set; } = true;

        // Foreign keys
        public Guid? CategoryId { get; set; }
        public Guid? ConditionId { get; set; }
        public Guid? GradeId { get; set; }
        public Guid? RangeId { get; set; }
        public Guid? SizeId { get; set; }
        public Guid? ThreadId { get; set; }
        public Guid? WallId { get; set; }
        public Guid? WeightId { get; set; }


        // Navigation properties
        public  PipeProperty_Category Category { get; set; }
        public PipeProperty_Condition Condition { get; set; }
        public PipeProperty_Grade Grade { get; set; }
        public PipeProperty_Range Range { get; set; }
        public PipeProperty_Size Size { get; set; }
        public PipeProperty_Thread Thread { get; set; }
        public PipeProperty_Wall Wall { get; set; }
        public PipeProperty_Weight Weight { get; set; }


    }
}
