using Inventory_Models.ViewModels;


namespace Inventory_BLL.Interfaces
{
   public interface ICustomerBL
   {
      public IQueryable<DTOCustomer>? GetCustomers();
      public IQueryable<DTOCustomer>? GetCustomerById(Guid guid);
      
   }
}
