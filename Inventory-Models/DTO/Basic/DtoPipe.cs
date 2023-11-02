using Inventory_DAL.Entities.PipeProperties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoPipe
    {
        public Guid PipeId { get; set; }
        public Guid PipeDefinitionId { get; set; }
        public Guid TierId { get; set; }
        public Guid CustomerId { get; set; }

        public int TierNumber { get; set; }

        public Guid RackId { get; set; }
        public string RackName { get; set; } = String.Empty;
        public Decimal LengthInMeters { get; set; }
        public Decimal LengthInFeet { get; set; }
        public int Quantity { get; set; }

        public DtoPipeDefinition PipeDefinition { get; set; }

    }
}
