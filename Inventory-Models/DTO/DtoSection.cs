using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
   public class DtoSection
   {
      public Guid SectionId { get; set; }
      public string TierId { get; set; }
      public string CustomerId { get; set; }
      public string? Quantity { get; set; }
   }
}
