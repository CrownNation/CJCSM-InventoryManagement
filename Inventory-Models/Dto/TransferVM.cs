using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.ViewModels
{
    public class TransferVM
    {
        [Key]
        public Guid TransferId { get; set; }
        [ForeignKey("SellCustomer")]
        public string SellCustomerId { get; set; }
        [ForeignKey("BuyerCustomer")]
        public string BuyerCustomerId { get; set; }
        [ForeignKey("Tally")]
        public string TallyId { get; set; }
    }
}
