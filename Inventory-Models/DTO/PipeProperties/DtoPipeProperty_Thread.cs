using System.ComponentModel.DataAnnotations;

namespace Inventory_Dto.Dto
{
    public class DtoPipeProperty_Thread
    {
        public Guid PipeProperty_ThreadId { get; set; }
        [StringLength(15)]
        public string Name { get; set; } = String.Empty;

        public bool IsActive { get; set; }

    }
}
