using CJCSM_Common;
using Inventory_Dto.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.Dto
{
    public class DtoTally
    {
        public Guid TallyId { get; set; }

        public string TallyNumber { get; set; } = string.Empty;

        public Guid CustomerId { get; set; }

        public string CustomerName { get; set; }
        public Guid ShopLocationId { get; set; }
        public ApplicationEnums.TallyTypes TallyType { get; set; }
        public DateTimeOffset DateOfCreation { get; set; }
        public string? Notes { get; set; }

        public string? InvoiceNumber { get; set; }

        public Guid TalliedByUserId { get; set; }

        public String TalliedByUserName { get; set; } = String.Empty;

        public string? CarrierName { get; set; }

        //Calculated Fields
        public float WeightInKg { get; set; }
        public float WeightInLbs { get; set; }

    }
}
