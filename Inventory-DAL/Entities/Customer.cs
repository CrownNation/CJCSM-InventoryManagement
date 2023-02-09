using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory_DAL.Entities
{
   public class Customer
   {
      [Key]
      public Guid CustomerId { get; set; }

      [StringLength(50)]
      [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
      public string Name { get; set; }

      [StringLength(30)]
      public string? Address1 { get; set; }

      [StringLength(30)]
      public string? Address2 { get; set; }

      [StringLength(30)]
      public string? City { get; set; }

      [StringLength(3)]
      public string? Province { get; set; }

      [StringLength(6)]
      public string? PostalCode  { get; set; }

      [StringLength(30)]
      [EmailAddress]
      public string? Email { get; set; }
      public bool IsActive { get; set; } = true;

      [Required]
      public DateTimeOffset DateOfCreation { get; set; }
      public DateTimeOffset? DateOfLastUpdate { get; set; }

   }
}
