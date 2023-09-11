using CJCSM_Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoTally
   {
        public Guid TallyId { get; set; }
        public Guid CustomerId { get; set; }
        public Guid ShopLocationId { get; set; }
        public ApplicationEnums.TallyTypes TallyType { get; set; }
        public DateTimeOffset DateOfCreation { get; set; }
        public string? Notes { get; set; }
    }
}
