using CJCSM_Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_DAL.Entities
{
    public class Tally
    {
        [Key]
        public Guid TallyId { get; set; }
        [Required]
        public Guid CustomerId { get; set; }
        [Required]
        public Guid ShopLocationId { get; set; }
        [Required]
        public int TallyType { get; set; }
        [Required]
        public DateTimeOffset DateOfCreation { get; set; }
        public string? Notes { get; set; }
    }
}
