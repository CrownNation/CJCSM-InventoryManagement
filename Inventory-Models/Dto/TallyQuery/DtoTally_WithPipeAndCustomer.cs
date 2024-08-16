using CJCSM_Common;
using Inventory_DAL.Entities;
using Inventory_DAL.Entities.PipeProperties;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoTally_WithPipeAndCustomer
   {
        public Guid TallyId { get; set; }

        public string TallyNumber { get; set; } = string.Empty;

        public Guid CustomerId { get; set; }

        public string CustomerName { get; set; }
        public Guid ShopLocationId { get; set; }

        public String ShopLocationName { get; set; } = String.Empty;
        public ApplicationEnums.TallyTypes TallyType { get; set; }
        public DateTimeOffset DateOfCreation { get; set; }
        public string? Notes { get; set; }

        public List<DtoPipeForTally> PipeList { get; set; }
        public List<DtoEquipmentForTally> EquipmentList {  get; set; }
        public string? InvoiceNumber { get; set; }

        public Guid TalliedByUserId { get; set; }

        public String TalliedByUserName { get; set; } = String.Empty;

        public string? CarrierName {  get; set; }

        //Calculated Fields
        public Decimal WeightInKg { get; set; }
        public Decimal WeightInLbs { get; set; }

    }
}
