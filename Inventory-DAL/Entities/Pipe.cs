using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inventory_DAL.Entities.PipeProperties;

namespace Inventory_DAL.Entities
{
    public class Pipe
    {
        [Key]
        public Guid PipeId { get; set; }

        [Required]
        [ForeignKey("PipeDefinition")]
        public Guid PipeDefinitionId { get; set; }

        [Required]
        [ForeignKey("Customer")]
        public Guid CustomerId { get; set; }


        [Required]
        [ForeignKey("Tier")]
        public Guid TierId { get; set; }

        public Decimal LengthInMeters { get; set; }
        public Decimal LengthInFeet { get; set; }

        public int Quantity { get; set; }

        public int IndexOfPipe { get; set; }


    }
}
