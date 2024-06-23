using System.Collections.Generic;

namespace Inventory_Dto.Dto
{
   public class DtoPipePropertiesAll
   {
      public List<DtoPipeProperty_Category> Categories { get; set; }
      public List<DtoPipeProperty_Coating> Coatings { get; set; }
      public List<DtoPipeProperty_Condition> Conditions { get; set; }
      public List<DtoPipeProperty_Grade> Grades { get; set; }
      public List<DtoPipeProperty_Range> Ranges { get; set; }
      public List<DtoPipeProperty_Size> Sizes { get; set; }
      public List<DtoPipeProperty_Thread> Threads { get; set; }
      public List<DtoPipeProperty_Wall> Walls { get; set; }
      public List<DtoPipeProperty_Weight> Weights { get; set; }
   }
}
