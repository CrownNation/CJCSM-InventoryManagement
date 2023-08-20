using AutoMapper;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Inventory_Models.ViewModels;

namespace Inventory_BLL.Mappings
{
   public class CustomerProfile : Profile
   {
      public CustomerProfile()
      {
         CreateMap<Customer, DtoCustomer>();
         CreateMap<DtoCustomer, Customer>();

         CreateMap<Customer, DtoCustomerCreate>();
         CreateMap<DtoCustomerCreate, Customer>();

         CreateMap<Customer, DtoCustomerUpdate>();
         CreateMap<DtoCustomerUpdate, Customer>();
      }
   }
}
