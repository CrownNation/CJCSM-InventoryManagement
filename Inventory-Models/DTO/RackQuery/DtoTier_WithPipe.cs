using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public  class DtoTier_WithPipe
    {
        public Guid TierId { get; set; }    
        public List<DtoPipeCreate> PipeList { get; set; } = new List<DtoPipeCreate>();

    }
}
