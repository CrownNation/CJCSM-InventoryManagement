using CJCSM_Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static CJCSM_Common.ApplicationEnums;

namespace Inventory_DAL.Entities
{
    public class Tally
    {
        [Key]
        public Guid TallyId { get; set; }
        [Required]
        [ForeignKey("Customer")]

        public Guid CustomerId { get; set; }
        [Required]
        public Guid ShopLocationId { get; set; }
        [Required]
        public TallyTypes TallyType { get; set; }
        [Required]
        public DateTimeOffset DateOfCreation { get; set; }
        public string? Notes { get; set; }

        [Required]
        public string TallyNumber { get; set; } = string.Empty;

        public string? InvoiceNumber { get; set; }

        [Required]
        public Guid TalliedByUserId { get; set; }

        public string? CarrierName { get; set; }

    }
}
