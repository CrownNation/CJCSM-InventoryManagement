using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
   public class DtoTier
   {
      public Guid TierId { get; set; }
      public string RackId { get; set; }
      public int? Number { get; set; }
   }
}
