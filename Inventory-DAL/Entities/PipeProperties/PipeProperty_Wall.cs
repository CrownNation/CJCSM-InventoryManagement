﻿using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_DAL.Entities.PipeProperties
{
    public class PipeProperty_Wall
    {
        [Key]
        public Guid PipeProperty_WallId { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal WallMetric { get; set; }
        [Column(TypeName = "decimal(4, 3)")]
        public decimal WallImperial { get; set; }


    }
}
