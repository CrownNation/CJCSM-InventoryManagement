using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.ViewModels
{
    public class SectionVM
    {
        [Key]
        public Guid SectionId { get; set; }
        [ForeignKey("Tier")]
        public string TierId { get; set; }
        [ForeignKey("Customer")]
        public string CustomerId { get; set; }
        public string? Quantity { get; set; }
    }
}
