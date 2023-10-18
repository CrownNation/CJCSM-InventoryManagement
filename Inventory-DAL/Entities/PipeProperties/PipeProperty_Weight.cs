using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory_DAL.Entities.PipeProperties
{
    public class PipeProperty_Weight
    {
        [Key]
        public Guid PipeProperty_WeightId { get; set; }
        [Column(TypeName = "decimal(6, 2)")]
        public decimal WeightMetric { get; set; }
        [Column(TypeName = "decimal(6, 3)")]
        public decimal WeightImperial { get; set; }

    }
}
