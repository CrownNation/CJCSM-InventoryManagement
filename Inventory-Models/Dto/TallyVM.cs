using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.ViewModels
{
    public class TallyVM
    {
        [Key]
        public Guid TallyId { get; set; }
        [ForeignKey("Customer")]
        public string CustomerId { get; set; }
        public string? Notes { get; set; }
    }
}
