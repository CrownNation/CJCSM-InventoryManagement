using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

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

      public IQueryable<DtoCustomer> GetCustomers()
      {
         IQueryable<Customer> entity = _context.Customer.AsQueryable();
         IQueryable<DtoCustomer> customers = _mapper.ProjectTo<DtoCustomer>(entity);

         return customers;
      }

      public IQueryable<DtoCustomer>? GetCustomerById(Guid guid)
      {
         IQueryable<Customer>? customer = _context.Customer.Where(x => x.CustomerId == guid);
         if (customer.Any())
         {
            IQueryable<DtoCustomer> DtoCustomer = _mapper.ProjectTo<DtoCustomer>(customer);
            return DtoCustomer;
         }

         throw new KeyNotFoundException($"No customer with guid {guid} can be found.");
      }

        public IQueryable<DtoCustomer>? GetCustomerWithTallyAndPipeById(Guid guid)
        {
            throw new NotImplementedException();
        }


        public async Task<DtoCustomer> CreateCustomer(DtoCustomerCreate DtoCustomer)
      {
         if (DtoCustomer == null)
            throw new ArgumentNullException("Create Customer failed. The customer data is null");
         if(String.IsNullOrEmpty(DtoCustomer.Name))
            throw new ArgumentNullException("Create Customer failed. The customer name cannot be null or empty.");

         Customer customer = _mapper.Map<Customer>(DtoCustomer);

         customer.CustomerId = Guid.NewGuid(); // Todo: Might be set by the database, can remove it db creates it
         customer.IsActive = true;
         customer.DateOfCreation = DateTimeOffset.Now;
         customer.DateOfLastUpdate = DateTimeOffset.Now;
         _context.Customer.Add(customer);
         await _context.SaveChangesAsync();

         return _mapper.Map<DtoCustomer>(customer);
      }

      public void UpdateCustomer(DtoCustomerUpdate dtoCustomerUpdate, Guid guid)
      {
         Customer? customer = _context.Customer.Find(guid);

         if (customer == null)
            throw new KeyNotFoundException($"No customer with guid {guid} can be found.");

         _mapper.Map<DtoCustomerUpdate, Customer>(dtoCustomerUpdate, customer);
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
