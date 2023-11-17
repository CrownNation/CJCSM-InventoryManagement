using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoPipeUpdate
    {
        public Guid PipeDefinitionId { get; set; }
        public Guid TierId { get; set; }
        public Guid CustomerId { get; set; }

        public Decimal LengthInMeters { get; set; }
        public Decimal LengthInFeet { get; set; }

        public int Quantity { get; set; }
        public int IndexOfPipe { get; set; }
    }
}
