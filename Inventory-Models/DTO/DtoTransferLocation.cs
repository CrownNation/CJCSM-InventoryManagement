using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
   public class DtoTransferLocation
   {
      public Guid TransferId { get; set; }
      public string RackNameStart { get; set; }
      public string TierNumberStart { get; set; }
      public string RackNameDestination { get; set; }
      public string TierNumberDestination { get; set; }
      public string RackId { get; set; }
   }
}
