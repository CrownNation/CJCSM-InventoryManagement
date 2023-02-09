using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.ViewModels
{
    public class TallyEquipmentVM
    {
        [Key]
        public Guid TallyEquipmentId { get; set; }
        [ForeignKey("Equipment")]
        public string EquipmentId { get; set; }
    }
}
