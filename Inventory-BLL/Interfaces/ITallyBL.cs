using System;
using System.Linq;
using System.Threading.Tasks;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface ITallyBL
    {
        IQueryable<DtoTally> GetTallies();
        IQueryable<DtoTally>? GetTallyById(Guid guid);
        Task<DtoTally> CreateTally(DtoTallyCreate tally);
        void UpdateTally(DtoTallyUpdate tally, Guid guid);
        void DeleteTally(Guid guid);
    }
}
