using CJCSM_Common;
using Inventory_DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoTallyCreate
    {
        public string TallyNumber { get; set; } = string.Empty;

        public Guid RackId { get; set; }
        public Guid CustomerId { get; set; }
        public Guid ShopLocationId { get; set; }
        public ApplicationEnums.TallyTypes TallyType { get; set; }
        public DateTimeOffset DateOfCreation { get; set; }
        public string? Notes { get; set; }

        public string? InvoiceNumber { get; set; }

        public Guid TalliedByUserId { get; set; }

        public string CarrierName { get; set; } = string.Empty;

        public List<DtoPipeCreate> PipeList { get; set; } = new List<DtoPipeCreate>();
    }
}
