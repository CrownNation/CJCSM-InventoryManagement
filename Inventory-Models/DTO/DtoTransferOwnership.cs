using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
   public class DtoTransferOwnership
   {
      public Guid TransferOwnershipId { get; set; }
      public string CustomerIdSeller { get; set; }
      public string CustomerIdBuyer { get; set; }
      public string TransferId { get; set; }
   }
}
