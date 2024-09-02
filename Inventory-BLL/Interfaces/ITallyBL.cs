using System;
using System.Linq;
using System.Threading.Tasks;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface ITallyBL
    {
        IQueryable<DtoTally_WithPipeAndCustomer> GetTallies();
        public DtoTally_WithPipeAndCustomer GetTallyWithPipeAndEquipmentByTallyId(Guid tallyId);
        public IQueryable<DtoTally_WithPipeAndCustomer> GetTallyWithStockQuery();
        Task<DtoTally_WithPipeAndCustomer> CreateTallyWithPipe(DtoTallyCreate tallyWithPipe);
        Task UpdateTally(DtoTallyUpdate tally, Guid guid);
        void DeleteTally(Guid guid);

    }
}
