using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory_Dto.Dto
{
    public class DtoPipeProperty_WeightUpdate
    {
        [Column(TypeName = "decimal(6, 2)")]
        public decimal WeightInKgPerMeter { get; set; }
        [Column(TypeName = "decimal(6, 3)")]
        public decimal WeightInLbsPerFoot { get; set; }
        public bool IsActive { get; set; }

    }
}
