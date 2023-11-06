using System;
using System.Linq;
using System.Threading.Tasks;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface ITallyBL
    {
        IQueryable<DtoTally_WithPipeAndCustomer> GetTallies();
        public Task<DtoTally_WithPipeAndCustomer> GetTallyById(Guid guid);
        Task<DtoTally_WithPipeAndCustomer> CreateTally(DtoTallyCreate tally);
        void UpdateTally(DtoTallyUpdate tally, Guid guid);
        void DeleteTally(Guid guid);
    }
}
