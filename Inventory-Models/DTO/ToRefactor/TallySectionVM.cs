using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.DTO.ToRefactor
{
    public class TallySectionVM
    {
        [Key]
        public Guid TallySectionId { get; set; }
        [ForeignKey("Section")]
        public string SectionId { get; set; }
    }
}
