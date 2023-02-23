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
using System.ComponentModel.DataAnnotations;

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

      private List<Guid> _sampleGuids;

      public TC_CustomerBL()
      {
         var optionsBuilder = new DbContextOptionsBuilder<InventoryContext>();
         optionsBuilder.UseInMemoryDatabase(databaseName: "CustomerBL");

         _context = new InventoryContext(optionsBuilder.Options);
         _mapper = (new MapperConfiguration(cfg => cfg.AddMaps(Assembly.Load("Inventory-BLL")))).CreateMapper();
         _customerBl = new CustomerBL(_context, _mapper);

         _sampleGuids = new List<Guid>();
         _sampleGuids.Add(new Guid("de853a8a-2ff6-42af-bd12-f5409ea6744a"));
         _sampleGuids.Add(new Guid("89a43eef-2386-4b44-8fe1-2adda5eea1d1"));
         _sampleGuids.Add(new Guid("0160de1c-f2ca-4752-8e54-74d90b319027"));
         _sampleGuids.Add(new Guid("147130ff-a98d-4340-a222-fdcb3af53dff"));
         _sampleGuids.Add(new Guid("bf85cd69-a46b-4b7c-9100-27a8cb172746"));

         _context.Database.EnsureDeleted();
         _context.Database.EnsureCreated();
      }

      #region GetCustomerById
      [Fact]
      public void GetCustomerById_Valid()
      {
         Customer newCustomer = new Customer
         {
            CustomerId = _sampleGuids[0],
            Name = "Ghostbusters",
            Address1 = "123 Street",
            Address2 = "Suite 456",
            City = "New York",
            Email = "gb@ghostbusters.com",
            PostalCode = "1A1A1A",
            Province = "NY",
            IsActive = true,
            DateOfCreation = DateTimeOffset.MaxValue
         };
         _context.Customer.Add(newCustomer);
         _context.SaveChanges();

         // Verify mappings
         //Assert.NotNull(customer);
         //Assert.True(customer.Name == createdCustomer.Name);
         //Assert.True(customer.Address1 == createdCustomer.Address1);
         //Assert.True(customer.Address2 == createdCustomer.Address2);
         //Assert.True(customer.City == createdCustomer.City);
         //Assert.True(customer.Email == createdCustomer.Email);
         //Assert.True(customer.PostalCode == createdCustomer.PostalCode);
         //Assert.True(customer.Province == createdCustomer.Province);

         //// Verify logic
         //Assert.NotEqual(customer.CustomerId, Guid.Empty);
         //Assert.True(customer.DateOfCreation > DateTimeOffset.MinValue);
         //Assert.True(customer.DateOfCreation < DateTimeOffset.MaxValue);
         //Assert.Null(customer.DateOfLastUpdate);
      }

      #endregion

      #region CreateCustomer
      [Fact]
      public void CreateCustomer_Valid()
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

      [Fact]
      public async void CreateCustomer_Exc_EmptyName()
      {
         CustomerCreateDto newCustomer = new CustomerCreateDto
         {
            Name = "",
            Address1 = "123 Street",
            Address2 = "Suite 456",
            City = "New York",
            Email = "gb@ghostbusters.com",
            PostalCode = "1A1A1A",
            Province = "NY"
         };
         await Assert.ThrowsAsync<ArgumentNullException>(() => _customerBl.CreateCustomer(newCustomer));
      }

      [Fact]
      public async void CreateCustomer_Exc_NullCustomer()
      {
         await Assert.ThrowsAsync<ArgumentNullException>(() => _customerBl.CreateCustomer(null));
      }


      #endregion

      #region DeleteCustomer
      [Fact]
      public void DeleteCustomer_Valid()
      {
         Customer newCustomer = new Customer
         {
            CustomerId = _sampleGuids[0],
            Name = "Ghostbusters",
            Address1 = "123 Street",
            Address2 = "Suite 456",
            City = "New York",
            Email = "gb@ghostbusters.com",
            PostalCode = "1A1A1A",
            Province = "NY",
            IsActive = true,
            DateOfCreation = DateTimeOffset.MaxValue
         };
         _context.Customer.Add(newCustomer);
         _context.SaveChanges();

         Assert.NotNull(_context.Customer.FirstOrDefault(x => x.CustomerId == _sampleGuids[0]));

         _customerBl.DeleteCustomer(_sampleGuids[0]);
         Assert.Null(_context.Customer.FirstOrDefault(x => x.CustomerId == _sampleGuids[0]));
      }

      [Fact]
      public void DeleteCustomer_Exc_NotFound()
      {
         Customer newCustomer = new Customer
         {
            CustomerId = _sampleGuids[0],
            Name = "Ghostbusters",
            Address1 = "123 Street",
            Address2 = "Suite 456",
            City = "New York",
            Email = "gb@ghostbusters.com",
            PostalCode = "1A1A1A",
            Province = "NY",
            IsActive = true,
            DateOfCreation = DateTimeOffset.MaxValue
         };
         _context.Customer.Add(newCustomer);
         _context.SaveChanges();

         Assert.Throws<KeyNotFoundException>(() => _customerBl.DeleteCustomer(_sampleGuids[1]));
      }

      #endregion


   }
}
