﻿using System.ComponentModel.DataAnnotations;

namespace Inventory_Dto.Dto
{
    public class DtoPipeProperty_ConditionUpdate
    {
        [StringLength(25)]
        public string Name { get; set; } = String.Empty;

        public bool IsActive { get; set; }

    }
}
