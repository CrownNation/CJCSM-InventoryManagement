using Inventory_DAL.Entities;
using Inventory_Models.ViewModels;
using Microsoft.AspNetCore.OData.Query;

namespace Inventory_BLL.Interfaces
{
   public interface ICustomerBL
   {
      public IQueryable<CustomerDto> GetCustomers();
      public IQueryable<CustomerDto>? GetCustomerById(Guid guid);
      public Task<CustomerDto> CreateCustomer(CustomerCreateDto customer);
      public void UpdateCustomer(CustomerUpdateDto customer, Guid guid);
      public void DeleteCustomer(Guid guid);
   }
}
