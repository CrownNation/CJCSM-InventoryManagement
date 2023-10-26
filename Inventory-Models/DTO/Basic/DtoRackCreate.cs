using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
   public class DtoRackCreate
   {
        [Required(ErrorMessage = "A Name is required")]
        [StringLength(50)]
        public string Name { get; set; } = String.Empty;
        [Required(ErrorMessage = "A shop location is required")]
        public Guid ShopLocationId { get; set; }

        public bool IsActive { get; set; }

    }
}
