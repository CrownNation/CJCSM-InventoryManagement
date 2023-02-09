using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.ViewModels
{
    public class RackVM
    {
        [Key]
        public Guid RackId { get; set; }
        public string Name { get; set; }
    }
}
