using Inventory_DAL.Entities.PipeProperties;
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

        public bool IsActive { get; set; } = true;

        // Foreign keys
        public Guid? CategoryId { get; set; }
        public Guid? CoatingId { get; set; }
        public Guid? ConditionId { get; set; }
        public Guid? GradeId { get; set; }
        public Guid? RangeId { get; set; }
        public Guid? SizeId { get; set; }
        public Guid? ThreadId { get; set; }
        public Guid? WallId { get; set; }
        public Guid? WeightId { get; set; }


        // Navigation properties
        public virtual PipeProperty_Category Category { get; set; }
        public virtual PipeProperty_Coating Coating { get; set; }
        public virtual PipeProperty_Condition Condition { get; set; }
        public virtual PipeProperty_Grade Grade { get; set; }
        public virtual PipeProperty_Range Range { get; set; }
        public virtual PipeProperty_Size Size { get; set; }
        public virtual PipeProperty_Thread Thread { get; set; }
        public virtual PipeProperty_Wall Wall { get; set; }
        public virtual PipeProperty_Weight Weight { get; set; }

    }

}
