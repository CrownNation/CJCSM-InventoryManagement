using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory_Dto.Dto
{
    public class DtoPipeProperty_Wall
    {
        public Guid PipeProperty_WallId { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal WallMetric { get; set; }
        [Column(TypeName = "decimal(4, 3)")]
        public decimal WallImperial { get; set; }

        public bool IsActive { get; set; }

    }
}
