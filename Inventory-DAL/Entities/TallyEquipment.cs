using System.ComponentModel.DataAnnotations;

namespace Inventory_DAL.Entities
{
    public class TallyEquipment
    {
        [Key]
        public Guid TallyId { get; set; }
        [Key]
        public Guid EquipmentId { get; set; }

        //Navigation Properties
        public Tally Tally { get; set; }
        public Equipment Equipment { get; set; }

    }
}
