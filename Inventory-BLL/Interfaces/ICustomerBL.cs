using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Inventory_Models.ViewModels;
using Microsoft.AspNetCore.OData.Query;

namespace Inventory_BLL.Interfaces
{
   public interface ICustomerBL
   {
      public IQueryable<DtoCustomer> GetCustomers();
      public IQueryable<DtoCustomer>? GetCustomerById(Guid guid);
      public Task<DtoCustomer> CreateCustomer(DtoCustomerCreate customer);
      public void UpdateCustomer(DtoCustomerUpdate customer, Guid guid);
      public void DeleteCustomer(Guid guid);
   }
}
