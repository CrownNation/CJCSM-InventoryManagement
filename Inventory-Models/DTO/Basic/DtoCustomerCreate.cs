using System.ComponentModel.DataAnnotations;

namespace Inventory_Dto.Dto
{
   public  class DtoCustomerCreate
   {
      [Required(ErrorMessage = "A Name is required")]
      [StringLength(50)]
      public string Name { get; set; }
      
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
   }
}
