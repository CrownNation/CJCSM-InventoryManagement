﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public  class DtoPipeProperty_CategoryUpdate
    {
        public string Name { get; set; } = String.Empty;

        public bool IsActive { get; set; } = true;

    }
}