using Inventory_DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AutoMapper;
using Xunit;
using Inventory_BLL.BL;
using System.Reflection;
using Inventory_Models.ViewModels;

namespace Inventory_Tests.BL
{
   public class TC_CustomerBL
   {

      //public IQueryable<CustomerDto> GetCustomers();
      //public IQueryable<CustomerDto>? GetCustomerById(Guid guid);
      //public Task<CustomerDto> CreateCustomer(CustomerCreateDto customer);
      //public void UpdateCustomer(CustomerUpdateDto customer, Guid guid);
      //public void DeleteCustomer(Guid guid);


      private readonly InventoryContext _context;
      private readonly CustomerBL _customerBl;
      private readonly IMapper _mapper;

      public TC_CustomerBL()
      {
         var optionsBuilder = new DbContextOptionsBuilder<InventoryContext>();
         optionsBuilder.UseInMemoryDatabase(databaseName: "CustomerBL");

         _context = new InventoryContext(optionsBuilder.Options);
         _mapper = (new MapperConfiguration(cfg => cfg.AddMaps(Assembly.Load("Inventory-BLL")))).CreateMapper();
         _customerBl = new CustomerBL(_context, _mapper);

         _context.Database.EnsureDeleted();
         _context.Database.EnsureCreated();
      }

      #region AddCustomer
      [Fact]
      public void AddPerson_Valid()
      {
         CustomerCreateDto newCustomer = new CustomerCreateDto
         {
            Name = "Ghostbusters",
            Address1 = "123 Street",
            Address2 = "Suite 456",
            City = "New York",
            Email = "gb@ghostbusters.com",
            PostalCode = "1A1A1A",
            Province = "NY"
         };
         CustomerDto createdCustomer = _customerBl.CreateCustomer(newCustomer).Result;

         Customer? customer = _context.Customer.Find(createdCustomer.CustomerId);

         // Verify mappings
         Assert.NotNull(customer);
         Assert.True(customer.Name == createdCustomer.Name);
         Assert.True(customer.Address1 == createdCustomer.Address1);
         Assert.True(customer.Address2 == createdCustomer.Address2);
         Assert.True(customer.City == createdCustomer.City);
         Assert.True(customer.Email == createdCustomer.Email);
         Assert.True(customer.PostalCode == createdCustomer.PostalCode);
         Assert.True(customer.Province == createdCustomer.Province);

         // Verify logic
         Assert.NotEqual(customer.CustomerId, Guid.Empty);
         Assert.True(customer.DateOfCreation > DateTimeOffset.MinValue);
         Assert.True(customer.DateOfCreation < DateTimeOffset.MaxValue);
         Assert.Null(customer.DateOfLastUpdate);
      }

      #endregion



   }
}
