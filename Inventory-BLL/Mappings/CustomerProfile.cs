using AutoMapper;
using Inventory_DAL.Entities;
using Inventory_Models.ViewModels;

namespace Inventory_BLL.Mappings
{
   public class CustomerProfile : Profile
   {
      public CustomerProfile()
      {
         CreateMap<Customer, DTOCustomer>();
         CreateMap<DTOCustomer, Customer>();

         CreateMap<Customer, CustomerCreateVM>();
         CreateMap<CustomerCreateVM, Customer>();

         CreateMap<Customer, CustomerUpdateVM>();
         CreateMap<CustomerUpdateVM, Customer>();
      }
   }
}
