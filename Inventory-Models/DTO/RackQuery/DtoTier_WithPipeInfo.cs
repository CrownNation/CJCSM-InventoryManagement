﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoTier_WithPipeInfo
    {
        public Guid TierId { get; set; }
        public Guid RackId { get; set; }
        public int Number { get; set; }

        public int PipeCount { get; set; }

    }
}