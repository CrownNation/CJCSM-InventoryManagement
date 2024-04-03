using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoPipeProperty_WallUpdate
    {
        [Column(TypeName = "decimal(5, 2)")]
        public decimal WallMetric { get; set; }
        [Column(TypeName = "decimal(4, 3)")]
        public decimal WallImperial { get; set; }

        public bool IsActive { get; set; }

    }
}
