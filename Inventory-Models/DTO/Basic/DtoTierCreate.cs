using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoTierCreate
    {
        public Guid RackId { get; set; }
        public int? Number { get; set; }
        public Guid CustomerId { get; set; }

    }
}
