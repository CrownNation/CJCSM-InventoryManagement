using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Models.ViewModels;


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

      public IQueryable<CustomerVM>? GetCustomerById(Guid guid)
      {
         IQueryable<Customer>? type = _context.Customer.Where(x => x.CustomerId == guid);
         if (type != null)
         {
            var result = _mapper.Map<IEnumerable<Customer>, IEnumerable<CustomerVM>>(type);
            return result.AsQueryable();
         }

         return null;
      }

      public IQueryable<CustomerVM>? GetCustomers()
      {
         IQueryable<Customer>? customers = _context.Customer.AsQueryable();
         if (customers != null)
         {
            var result = _mapper.Map<IEnumerable<Customer>, IEnumerable<CustomerVM>>(customers);
            return result.AsQueryable();
         }

         return null;
      }

   }
}
