using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
   public class DtoEquipmentDefinitionSearchParams
   {
      public Guid? GradeId { get; set; }
      public Guid? SizeId { get; set; }

      public string Category {  get; set; } = string.Empty;

      public bool IsActive { get; set; }


   }
}
