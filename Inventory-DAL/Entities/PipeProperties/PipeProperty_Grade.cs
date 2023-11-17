using System.ComponentModel.DataAnnotations;

namespace Inventory_DAL.Entities.PipeProperties
{
    public class PipeProperty_Grade
    {
        [Key]
        public Guid PipeProperty_GradeId { get; set; }
        [StringLength(15)]
        public string Name { get; set; } = String.Empty;
    }
}
