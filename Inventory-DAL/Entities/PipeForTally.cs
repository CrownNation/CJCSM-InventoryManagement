using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

// This object is to capture a snapshot of the pipe at the time of the tally. It represents pipe coming in or going out of the inventory.
namespace Inventory_DAL.Entities
{
   public class PipeForTally
   {
      [Key]
      public Guid PipeForTallyId { get; set; }

      // This is the tally that the pipe is associated with
      [Required]
      public Guid TallyId { get; set; }

      [Required]
      [ForeignKey("PipeDefinition")]
      public Guid PipeDefinitionId { get; set; }

      [Required]
      [ForeignKey("Customer")]
      public Guid CustomerId { get; set; }

      //This is the tier the pipe was taken from. We can get the rack from the tier
      [Required]
      [ForeignKey("Tier")]
      public Guid TierId { get; set; }

      public Decimal LengthInMeters { get; set; }

      public int Quantity { get; set; }

      // This is the index of the position the pipe was in the rack
      public int IndexOfPipe { get; set; }


   }
}
