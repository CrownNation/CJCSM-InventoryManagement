﻿using Inventory_Dto.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public  class DtoRack_WithTier
    {
        public Guid RackId { get; set; }
        public string Name { get; set; } = string.Empty;
        public Guid ShopLocationId { get; set; }

        public string ShopLocationName { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public string Description { get; set; } = String.Empty;

        public int JointsPeTier { get; set; } = 0;

        public List<DtoTier_WithPipeInfo> TierList{ get; set; } = new List<DtoTier_WithPipeInfo>();
    }
}
