using System.ComponentModel.DataAnnotations;

namespace Inventory_Models.DTO
{
    public class DtoPipeProperty_Category
    {
        public Guid PipeProperty_CategoryId { get; set; }

        [StringLength(15)]
        public string Name { get; set; } = String.Empty;

        public bool IsActive { get; set; } = true;

    }
}
