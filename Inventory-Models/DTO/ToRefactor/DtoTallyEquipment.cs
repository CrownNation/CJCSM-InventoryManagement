﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.DTO.ToRefactor
{
    public class DtoTallyEquipment
    {
        public Guid TallyEquipmentId { get; set; }
        public string TallyId { get; set; }
        public string EquipmentId { get; set; }
    }
}
