﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.DTO.ToRefactor
{
    public class EquipmentVM
    {
        [Key]
        public Guid EquipmentId { get; set; }
        [ForeignKey("Customer")]
        public string CustomerId { get; set; }
        public int? Quantity { get; set; }
    }
}
