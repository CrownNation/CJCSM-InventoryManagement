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
using Inventory_Dto.Dto;

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

         //_context = new InventoryContext(optionsBuilder.Options);
         _mapper = (new MapperConfiguration(cfg => cfg.AddMaps(Assembly.Load("Inventory-BLL")))).CreateMapper();
         _customerBl = new CustomerBL(_context, _mapper);

         _sampleGuids = new List<Guid>();
         _sampleGuids.Add(new Guid("de853a8a-2ff6-42af-bd12-f5409ea6744a"));
         _sampleGuids.Add(new Guid("89a43eef-2386-4b44-8fe1-2adda5eea1d1"));
         _sampleGuids.Add(new Guid("0160de1c-f2ca-4752-8e54-74d90b319027"));
         _sampleGuids.Add(new Guid("147130ff-a98d-4340-a222-fdcb3af53dff"));
         _sampleGuids.Add(new Guid("bf85cd69-a46b-4b7c-9100-27a8cb172746"));

         //_context.Database.EnsureDeleted();
         //_context.Database.EnsureCreated();
      }

      #region Helpers

      private void SetupDatabase_Get()
      {
         _context.Add(new Customer
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
         });
         _context.Add(new Customer
         {
            CustomerId = _sampleGuids[1],
            Name = "Test Company",
            Address1 = "2 Street",
            Address2 = "Suite 2",
            City = "Calgary ",
            Email = "test@test.com",
            PostalCode = "2B2B2B",
            Province = "AB",
            IsActive = false,
            DateOfCreation = DateTimeOffset.MaxValue
         });
         _context.Add(new Customer
         {
            CustomerId = _sampleGuids[2],
            Name = "CJCSM",
            Address1 = "3 Street",
            Address2 = "Suite 3",
            City = "Red Deer",
            Email = "cjcsm@test.com",
            PostalCode = "3C3C3C",
            Province = "AB",
            IsActive = true,
            DateOfCreation = DateTimeOffset.MaxValue
         });
         _context.SaveChanges();
      }

      #endregion

      #region GetCustomers

      [Fact]
      public void GetCustomers_Valid()
      {
         SetupDatabase_Get();
         IQueryable<DtoCustomer>? customerQuery = _customerBl.GetCustomers();

         Assert.NotNull(customerQuery);
         Assert.Equal(3, customerQuery.ToList().Count);
      }

      // Todo: Will have to figure out how to test the OdataQueryOptions from the Controller rather then the BL.

      #endregion

      #region GetCustomerById

      [Fact]
      public void GetCustomerById_Valid()
      {
         SetupDatabase_Get();
         Customer? dbCustomer = _context.Customer.FirstOrDefault(x => x.CustomerId == _sampleGuids[2]);
         IQueryable<DtoCustomer>? customerQuery = _customerBl.GetCustomerById(_sampleGuids[2]);

         Assert.NotNull(dbCustomer);
         Assert.NotNull(customerQuery);
         Assert.Single(customerQuery);

         DtoCustomer customer = customerQuery.ToList()[0];

         Assert.True(dbCustomer.CustomerId == customer.CustomerId);
         Assert.True(dbCustomer.Name == customer.Name);         
         Assert.True(dbCustomer.Address1 == customer.Address1);
         Assert.True(dbCustomer.Address2 == customer.Address2);
         Assert.True(dbCustomer.City == customer.City);
         Assert.True(dbCustomer.Province == customer.Province);
         Assert.True(dbCustomer.PostalCode == customer.PostalCode);
         Assert.True(dbCustomer.Email == customer.Email);
         Assert.True(dbCustomer.IsActive == customer.IsActive);
         Assert.True(dbCustomer.DateOfCreation == customer.DateOfCreation);
         Assert.True(dbCustomer.DateOfLastUpdate == customer.DateOfLastUpdate);
      }

      [Fact]
      public void GetCustomerById_Exc_NotFound()
      {
         SetupDatabase_Get();
         Assert.Throws<KeyNotFoundException>(() => _customerBl.GetCustomerById(_sampleGuids[3]));
      }


      #endregion

      #region CreateCustomer
      [Fact]
      public void CreateCustomer_Valid()
      {
         DtoCustomerCreate newCustomer = new DtoCustomerCreate
         {
            Name = "Ghostbusters",
            Address1 = "123 Street",
            Address2 = "Suite 456",
            City = "New York",
            Email = "gb@ghostbusters.com",
            PostalCode = "1A1A1A",
            Province = "NY"
         };
         DtoCustomer createdCustomer = _customerBl.CreateCustomer(newCustomer).Result;

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
         Assert.True(customer.DateOfLastUpdate > DateTimeOffset.MinValue);
         Assert.True(customer.DateOfLastUpdate < DateTimeOffset.MaxValue);
      }

      [Fact]
      public async void CreateCustomer_Exc_EmptyName()
      {
         DtoCustomerCreate newCustomer = new DtoCustomerCreate
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
