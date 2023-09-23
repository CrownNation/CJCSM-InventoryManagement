using CJCSM_Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoTallyCreate
    {
        public Guid CustomerId { get; set; }
        public Guid ShopLocationId { get; set; }
        public ApplicationEnums.TallyTypes TallyType { get; set; }
        public string? Notes { get; set; }
    }
}
