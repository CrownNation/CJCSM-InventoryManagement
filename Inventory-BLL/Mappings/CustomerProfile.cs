using AutoMapper;
using Inventory_DAL.Entities;
using Inventory_Models.ViewModels;

namespace Inventory_BLL.Mappings
{
   public class CustomerProfile : Profile
   {
      public CustomerProfile()
      {
         CreateMap<Customer, CustomerDto>();
         CreateMap<CustomerDto, Customer>();

         CreateMap<Customer, DtoCustomerCreate>();
         CreateMap<DtoCustomerCreate, Customer>();

         CreateMap<Customer, DtoCustomerUpdate>();
         CreateMap<DtoCustomerUpdate, Customer>();
      }
   }
}
