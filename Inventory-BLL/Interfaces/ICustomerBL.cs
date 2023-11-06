using Inventory_Dto.Dto;
using Inventory_Models.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface ICustomerBL
    {
        public IQueryable<DtoCustomer> GetCustomers();
        public IQueryable<DtoCustomer>? GetCustomerById(Guid guid);

        public IQueryable<DtoCustomer_WithPipe> GetCustomerWithPipeById(Guid customerId);

        //A Task represents an asynchronous operation.
        public Task<DtoCustomer> CreateCustomer(DtoCustomerCreate customer);
        public void UpdateCustomer(DtoCustomerUpdate customer, Guid guid);
        public void DeleteCustomer(Guid guid);

    }
}
