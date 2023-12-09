using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Inventory_DAL.Entities
{
    public class ShopLocation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ShopLocationId { get; set; }

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

        [StringLength(2)]
        public string? Country { get; set; }

        [StringLength(6)]
        public string? PostalCode { get; set; }

        [StringLength(20)]
        [Phone]
        public string? PhoneNumber { get; set; }

        [StringLength(20)]
        [Phone]
        public string? FaxNumber { get; set; }

        [Required]
        public bool IsActive { get; set; }

    }
}
