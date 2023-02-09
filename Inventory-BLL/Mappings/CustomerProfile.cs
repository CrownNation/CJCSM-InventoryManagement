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

         CreateMap<Customer, CustomerCreateDto>();
         CreateMap<CustomerCreateDto, Customer>();

         CreateMap<Customer, CustomerUpdateDto>();
         CreateMap<CustomerUpdateDto, Customer>();
      }
   }
}
