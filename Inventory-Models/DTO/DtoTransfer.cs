using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
   public class DtoTransfer
   {
      public Guid TransferId { get; set; }
      public string SellCustomerId { get; set; }
      public string BuyCustomerId { get; set; }
      public string TallyId { get; set; }
   }
}
