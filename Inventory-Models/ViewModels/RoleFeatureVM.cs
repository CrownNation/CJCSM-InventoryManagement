using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.ViewModels
{
    public class RoleFeatureVM
    {
        [Key]
        public Guid RoleFeatureId { get; set; }
        [ForeignKey("Feature")]
        public string FeatureId { get; set; }
    }
}
