using System.ComponentModel.DataAnnotations;

namespace Inventory_DAL.Entities.PipeProperties
{
    public class PipeProperty_Coating
    {
        [Key]
        public Guid PipeProperty_CoatingId { get; set; }
        [StringLength(25)]
        public string Name { get; set; } = String.Empty;
        [Required]
        public bool IsActive { get; set; } = true;
    }
}
