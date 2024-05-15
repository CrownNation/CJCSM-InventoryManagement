using Inventory_Dto.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoRack_WithStock
    {
        public Guid RackId { get; set; }
        public string Name { get; set; } = string.Empty;
        public Guid ShopLocationId { get; set; }
        public string ShopLocationName { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public string Description { get; set; } = String.Empty;

        public int JointsPerTier { get; set; } = 0;

        public string RackType { get; set; } = String.Empty;

        public List<DtoPipe> PipeList { get; set; } = new List<DtoPipe>();

        public List<DtoEquipment> EquipmentList { get; set; } = new List<DtoEquipment>();

    }
}
