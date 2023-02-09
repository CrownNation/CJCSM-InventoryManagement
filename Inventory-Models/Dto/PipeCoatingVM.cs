using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.ViewModels
{
    public class PipeCoatingVM
    {
        [Key]
        public Guid PipeCoatingId { get; set; }
        public string Name { get; set; }
    }
}
