

namespace Inventory_Dto.Dto
{
   // This object is to capture a snapshot of the pipe at the time of the tally. It represents pipe coming in or going out of the inventory.
   public class DtoPipeForTallyCreate
   {
      // This is used in tally out to grab the id of the outgoing pipe
      public Guid PipeId { get; set; }

      public Guid PipeDefinitionId { get; set; }
      public Guid TallyId { get; set; }
      public Guid TierId { get; set; }
      public Guid CustomerId { get; set; }

      public int TierNumber { get; set; }

      public Guid RackId { get; set; }
      public string RackName { get; set; } = String.Empty;
      public Decimal LengthInMeters { get; set; }
      public int Quantity { get; set; }

      public int IndexOfPipe { get; set; }

      public DtoPipeDefinition PipeDefinition { get; set; }

   }
}
