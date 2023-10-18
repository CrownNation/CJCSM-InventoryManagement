using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_DAL.Entities
{
    public class Rack
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid RackId { get; set; }
        [StringLength(50)]
        public string Name { get; set; } = String.Empty;
        [ForeignKey("ShopLocation")]
        public Guid ShopLocationId { get; set; }
        public bool IsActive { get; set; }

        public ShopLocation ShopLocation { get; set; }  // Navigation property to get ShopLocationName
    }
}
