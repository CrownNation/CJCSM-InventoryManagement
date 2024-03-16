using System.ComponentModel.DataAnnotations;

namespace Inventory_DAL.Entities.PipeProperties
{
    public class PipeProperty_Condition
    {
        [Key]
        public Guid PipeProperty_ConditionId { get; set; }
        [StringLength(25)]
        public string Name { get; set; } = String.Empty;

        public bool IsActive { get; set; }
    }
}
