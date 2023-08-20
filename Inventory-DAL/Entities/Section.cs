using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_DAL.Entities
{
    public class Section
    {
        public Guid SectionId { get; set; }
        [StringLength(30)]
        public string TierId { get; set; }
        [StringLength(30)]
        public string CustomerId { get; set; }
        public string? Quantity { get; set; }
    }
}
