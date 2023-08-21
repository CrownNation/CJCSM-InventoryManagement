using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
   public class DtoTally
   {
        public Guid TallyId { get; set; }
        public string CustomerId { get; set; }
        public string ShopLocationId { get; set; }
        public string TallyType { get; set; }
        public string DateOfTally { get; set; }
        public string? Notes { get; set; }
    }
}
