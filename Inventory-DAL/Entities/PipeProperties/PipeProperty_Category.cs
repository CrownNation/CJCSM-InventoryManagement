using System.ComponentModel.DataAnnotations;

namespace Inventory_DAL.Entities.PipeProperties
{
    public class PipeProperty_Category
    {
        [Key]
        public Guid PipeProperty_CategoryId { get; set; }
        [StringLength(15)]
        public string Name { get; set; } = String.Empty;

        public bool IsActive { get; set; } = true;
    }
}
