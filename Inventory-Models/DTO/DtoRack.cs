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
        public string Name { get; set; } = string.Empty;
        public Guid ShopLocationId { get; set; }

        public string ShopLocationName { get; set; } = string.Empty;
        public bool IsActive { get; set; }

    }
}
