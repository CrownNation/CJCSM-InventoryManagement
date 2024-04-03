using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory_Dto.Dto
{
    public class DtoPipeProperty_SizeUpdate
    {

        [Column(TypeName = "decimal(6, 2)")]
        public decimal SizeMetric { get; set; }
        [Column(TypeName = "decimal(6, 3)")]
        public decimal SizeImperial { get; set; }

        public bool IsActive { get; set; }

    }
}
