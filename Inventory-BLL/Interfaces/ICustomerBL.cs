using Inventory_Dto.Dto;
using Inventory_Models.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface ICustomerBL
    {
        public Task<IQueryable<DtoCustomer>> GetCustomers();

        public Task<IQueryable<DtoCustomer>>? GetCustomerById(Guid guid);

        public Task<DtoCustomer_WithPipe> GetCustomerWithPipeByCustomerId(Guid customerId);

        //A Task represents an asynchronous operation.
        public Task<DtoCustomer> CreateCustomer(DtoCustomerCreate customer);
        public Task UpdateCustomer(DtoCustomerUpdate customer, Guid guid);
        public void DeleteCustomer(Guid guid);

    }
}
