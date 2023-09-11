using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoSection
    {
        public Guid SectionId { get; set; }
        public Guid TierId { get; set; }
        public Guid CustomerId { get; set; }
    }
}
