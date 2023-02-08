
namespace Inventory_Models.ViewModels
{
   public class CustomerUpdateDto
   {
      public string Name { get; set; }
      public string? Address1 { get; set; }
      public string? Address2 { get; set; }
      public string? City { get; set; }
      public string? Province { get; set; }
      public string? PostalCode { get; set; }
      public string? Email { get; set; }
      public bool IsActive { get; set; }
   }
}
