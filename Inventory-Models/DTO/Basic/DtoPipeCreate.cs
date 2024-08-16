using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
   public class DtoPipeCreate
   {
      public Guid PipeDefinitionId { get; set; }

      // This is only used in the creation of TallyOut objects. This references the PipeId of the pipe selected in the tally out.
      public Guid PipeId { get; set; }

      public Guid TierId { get; set; }

      public int TierNumber { get; set; } = 0;

      public Guid RackId { get; set; }
      public Guid CustomerId { get; set; }

      public Decimal LengthInMeters { get; set; }
      public Decimal LengthInFeet { get; set; }

      public int Quantity { get; set; }
      public int IndexOfPipe { get; set; }
   }
}
