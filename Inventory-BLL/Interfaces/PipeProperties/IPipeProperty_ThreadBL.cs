using Inventory_Dto.Dto;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory_BLL.Interfaces
{
    public interface IPipeProperty_ThreadBL
    {
        IQueryable<DtoPipeProperty_Thread> GetThreads();
        Task<DtoPipeProperty_Thread> GetThreadById(Guid id);
        Task<DtoPipeProperty_Thread> CreateThread(DtoPipeProperty_Thread thread);
        Task UpdateThread(DtoPipeProperty_ThreadUpdate thread, Guid id);
        Task DeactivateThread(Guid id);
    }
}
