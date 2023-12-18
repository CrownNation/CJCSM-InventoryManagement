using AutoMapper;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

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

            // Ignore CustomerId since it is passed as a parameter and we don't want to ever update the CustomerId
            CreateMap<DtoCustomerUpdate, Customer>()
               .ForMember(dest => dest.CustomerId, opt => opt.Ignore());

        }
    }
}
