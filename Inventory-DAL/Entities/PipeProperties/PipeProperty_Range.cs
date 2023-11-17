using System.ComponentModel.DataAnnotations;

namespace Inventory_DAL.Entities.PipeProperties
{
    public class PipeProperty_Range
    {
        [Key]
        public Guid PipeProperty_RangeId { get; set; }
        [StringLength(15)]
        public string Name { get; set; } = String.Empty;

    }
}
