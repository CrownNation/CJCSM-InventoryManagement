using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.ViewModels
{
   public  class CustomerCreateVM
   {
      public string Name { get; set; }
      public string? Address1 { get; set; }
      public string? Address2 { get; set; }
      public string? City { get; set; }
      public string? Province { get; set; }
      public string? PostalCode { get; set; }
      public string? Email { get; set; }
   }
}
