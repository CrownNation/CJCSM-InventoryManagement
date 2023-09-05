﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.Dto
{
    public class DtoPipeUpdate
    {
        public Guid PipeDefinitionId { get; set; }
        public Guid SectionId { get; set; }
        public float Length { get; set; }
        public int Quantity { get; set; }
    }
}
