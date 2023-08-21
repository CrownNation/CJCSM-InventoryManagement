using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_DAL.Entities
{
   public class Rack
   {
      public Guid RackId { get; set; }
      [StringLength(50)]
      public string Name { get; set; }
   }
}
