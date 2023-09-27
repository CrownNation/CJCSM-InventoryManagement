using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Inventory_DAL.Entities
{
    public class Customer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid CustomerId { get; set; }

        [StringLength(50)]
        public string Name { get; set; } = string.Empty;

        [StringLength(30)]
        public string? Address1 { get; set; }

        [StringLength(30)]
        public string? Address2 { get; set; }

        [StringLength(30)]
        public string? City { get; set; }

        [StringLength(2)]
        public string? ProvinceState { get; set; }

        [StringLength(6)]
        public string? PostalCode { get; set; }

        [StringLength(30)]
        [EmailAddress]
        public string? Email { get; set; }
        public bool IsActive { get; set; } = true;

        [Required]
        public DateTimeOffset DateOfCreation { get; set; }
        public DateTimeOffset DateOfLastUpdate { get; set; }

    }
}
