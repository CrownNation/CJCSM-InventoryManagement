using CJCSM_Common;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Inventory_Dto.Dto
{
    public class DtoTallyUpdate
    {
        public Guid ShopLocationId { get; set; }
        public int TallyType { get; set; }
        public string? Notes { get; set; }

        public Guid CustomerId { get; set; }

        public string TallyNumber { get; set; } = string.Empty;

        public string? InvoiceNumber { get; set; }

        public string? CarrierName { get; set; }

    }
}
