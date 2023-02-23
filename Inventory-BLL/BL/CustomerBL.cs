using AutoMapper;
using AutoMapper.AspNet.OData;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Inventory_BLL.BL
{
   public  class CustomerBL : ICustomerBL
   {
      private readonly InventoryContext _context;
      private readonly IMapper _mapper;
      

      public CustomerBL(InventoryContext context, IMapper mapper)
      {
         _context = context;
         _mapper = mapper;
      }

      public IQueryable<CustomerDto> GetCustomers()
      {
         IQueryable<Customer> entity = _context.Customer.AsQueryable();
         IQueryable<CustomerDto> customers = _mapper.ProjectTo<CustomerDto>(entity);

         return customers;
      }

      public IQueryable<CustomerDto>? GetCustomerById(Guid guid)
      {
         IQueryable<Customer>? customer = _context.Customer.Where(x => x.CustomerId == guid);
         if (customer.Any())
         {
            IQueryable<CustomerDto> customerDto = _mapper.ProjectTo<CustomerDto>(customer);
            return customerDto;
         }

         throw new KeyNotFoundException($"No customer with guid {guid} can be found.");
      }

      public async Task<CustomerDto> CreateCustomer(CustomerCreateDto customerDto)
      {

         if (customerDto == null)
            throw new ArgumentNullException("Create Customer failed. The customer data is null");
         if(String.IsNullOrEmpty(customerDto.Name))
            throw new ArgumentNullException("Create Customer failed. The customer name cannot be null or empty.");

         Customer customer = _mapper.Map<Customer>(customerDto);

         customer.CustomerId = new Guid();
         customer.IsActive = true;
         customer.DateOfCreation = DateTimeOffset.Now;
         customer.DateOfLastUpdate = DateTimeOffset.Now;
         _context.Customer.Add(customer);
         await _context.SaveChangesAsync();

         return _mapper.Map<CustomerDto>(customer);
      }

      public void UpdateCustomer(CustomerUpdateDto customerDto, Guid guid)
      {
         Customer? customer = _context.Customer.Find(guid);

         if (customer == null)
            throw new KeyNotFoundException($"No customer with guid {guid} can be found.");

         _mapper.Map<CustomerUpdateDto, Customer>(customerDto, customer);
         customer.DateOfLastUpdate = DateTimeOffset.Now;
         _context.SaveChanges();
      }

      public void DeleteCustomer(Guid guid)
      {
         Customer? customer = _context.Customer.Find(guid);

         if (customer == null)
            throw new KeyNotFoundException($"No customer with guid {guid} can be found.");

         _context.Customer.Remove(customer);
         _context.SaveChanges();
      }




   }
}
