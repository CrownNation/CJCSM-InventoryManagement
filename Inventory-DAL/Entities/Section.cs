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
        [Key]
        public Guid SectionId { get; set; }
        [Required]
        public Guid TierId { get; set; }
        [Required]
        public Guid CustomerId { get; set; }
    }
}
