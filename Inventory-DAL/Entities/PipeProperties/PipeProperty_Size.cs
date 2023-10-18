using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_DAL.Entities.PipeProperties
{
    public class PipeProperty_Size
    {
        [Key]
        public Guid PipeProperty_SizeId { get; set; }

        [Column(TypeName = "decimal(6, 2)")]
        public decimal SizeMetric { get; set; }
        [Column(TypeName = "decimal(6, 3)")]
        public decimal SizeImperial { get; set; }


    }
}
