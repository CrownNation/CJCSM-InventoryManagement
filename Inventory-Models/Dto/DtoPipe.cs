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
        public float Length { get; set; }
        public int Quantity { get; set; }
    }
}
