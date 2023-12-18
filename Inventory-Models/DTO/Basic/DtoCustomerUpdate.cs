
using System.ComponentModel.DataAnnotations;

namespace Inventory_Dto.Dto
{
    public class DtoCustomerUpdate
    {
        public string Name { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        [StringLength(2, ErrorMessage = "Province cannot exceed 2 characters.")]
        public string? ProvinceState { get; set; }
        [StringLength(6, ErrorMessage = "Postal code cannot exceed 5 characters.")]
        public string? PostalCode { get; set; }
        public string? Email { get; set; }
        public bool IsActive { get; set; }
    }
}
