using Inventory_Models.ViewModels;


namespace Inventory_BLL.Interfaces
{
   public interface ICustomerBL
   {
      public IQueryable<CustomerVM>? GetCustomers();
      public IQueryable<CustomerVM>? GetCustomerById(Guid guid);
      
   }
}
