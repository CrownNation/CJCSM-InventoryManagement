using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.ViewModels
{
    public class PipeSizeVM
    {
        [Key]
        public Guid PipeSizeId { get; set; }
        public string Name { get; set; }
    }
}
