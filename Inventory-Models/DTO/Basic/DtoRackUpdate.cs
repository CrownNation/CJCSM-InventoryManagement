using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoRackUpdate
    {
        [Required(ErrorMessage = "A Name is required")]
        [StringLength(50)]
        public string Name { get; set; }
        public Guid ShopLocationId { get; set; }
        public string Description { get; set; } = String.Empty;

        public int JointsPerRack { get; set; } = 0;

    }
}
