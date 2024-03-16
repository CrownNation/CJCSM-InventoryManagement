using System.ComponentModel.DataAnnotations;

namespace Inventory_Models.DTO.PipeProperties
{
    public class DtoPipeProperty_ConditionUpdate
    {
        [StringLength(25)]
        public string Name { get; set; } = String.Empty;

        public bool IsActive { get; set; }

    }
}
