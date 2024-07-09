using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
   public class DtoPipeDefinitionSearchParams
   {
      public Guid? CategoryId { get; set; }
      public Guid? CoatingId { get; set; }
      public Guid? ConditionId { get; set; }
      public Guid? GradeId { get; set; }
      public Guid? RangeId { get; set; }
      public Guid? SizeId { get; set; }
      public Guid? ThreadId { get; set; }
      public Guid? WallId { get; set; }
      public Guid? WeightId { get; set; }

      public bool IsActive { get; set; }

   }
}
