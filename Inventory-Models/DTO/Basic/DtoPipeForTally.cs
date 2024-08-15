

namespace Inventory_Dto.Dto
{
   // This object is to capture a snapshot of the pipe at the time of the tally. It represents pipe coming in or going out of the inventory.
   public class DtoPipeForTally
   {
      public Guid PipeForTallyId { get; set; }
      public Guid TallyId { get; set; }

      public Guid PipeDefinitionId { get; set; }
      public Guid TierId { get; set; }
      public Guid CustomerId { get; set; }

      public int TierNumber { get; set; }

      public Guid RackId { get; set; }
      public string RackName { get; set; } = String.Empty;
      public Decimal LengthInMeters { get; set; }
      public Decimal LengthInFeet { get; set; }
      public int Quantity { get; set; }

      public int IndexOfPipe { get; set; }

      public DtoPipeDefinition PipeDefinition { get; set; }

   }
}
