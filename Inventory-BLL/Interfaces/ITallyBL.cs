using System;
using System.Linq;
using System.Threading.Tasks;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface ITallyBL
    {
        IQueryable<DtoTally_WithPipeAndCustomer> GetTallies();
        public IQueryable<DtoTally_WithPipeAndCustomer> GetTallyWithPipeAndEquipmentByIdQuery(Guid tallyId);
        public IQueryable<DtoTally_WithPipeAndCustomer> GetTallyWithPipeQuery();
        Task<DtoTally_WithPipeAndCustomer> CreateTallyWithPipe(DtoTallyCreate tallyWithPipe);
        Task UpdateTally(DtoTallyUpdate tally, Guid guid);
        void DeleteTally(Guid guid);

    }
}
