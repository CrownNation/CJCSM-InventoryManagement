using System;
using System.Linq;
using System.Threading.Tasks;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface ITallyBL
    {
        Task<IQueryable<DtoTally_WithPipeAndCustomer>> GetTallies();
        Task<DtoTally_WithPipeAndCustomer> GetTallyById(Guid guid);
        public IQueryable<DtoTally_WithPipeAndCustomer> GetTallyWithPipeQuery();
        Task<DtoTally_WithPipeAndCustomer> CreateTallyWithPipe(DtoTallyCreate tallyWithPipe);
        Task UpdateTally(DtoTallyUpdate tally, Guid guid);
        void DeleteTally(Guid guid);

    }
}
