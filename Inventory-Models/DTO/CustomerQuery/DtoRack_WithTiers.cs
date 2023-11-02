using Inventory_DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.DTO.CustomerQuery
{
    public class DtoRack_WithTiers
    {
        public Guid RackId { get; set; }
        public string RackName { get; set; } = String.Empty;

        public Guid ShopLocationId { get; set; }
        public string ShopLocationName { get; set; }  // Navigation property to get ShopLocationName

        public List<DtoTier_WithPipe> TierList { get; set; }
    }
}
