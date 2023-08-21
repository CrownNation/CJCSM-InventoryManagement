using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
   public class DtoRack
   {
      public Guid RackId { get; set; }
        [Required(ErrorMessage = "A Name is required")]
        [StringLength(50)]
        public string Name { get; set; }
   }
}
