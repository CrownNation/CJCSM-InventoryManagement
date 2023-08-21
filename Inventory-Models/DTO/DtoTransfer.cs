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
        public string ShopLocationId { get; set; }
        public string? Notes { get; set; }
   }
}
