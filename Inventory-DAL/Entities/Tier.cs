using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory_DAL.Entities
{
    public class Tier
    {
        [Key]
        public Guid TierId { get; set; }

        [Required]
        public Guid RackId { get; set; }

        [Required]
        public int Number { get; set; }

    }
}
