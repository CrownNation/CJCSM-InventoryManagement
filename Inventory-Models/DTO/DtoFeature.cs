using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
   public class DtoFeature
   {
      public Guid FeatureId { get; set; }
      public string Name { get; set; }
      public string? Description { get; set; }
   }
}
