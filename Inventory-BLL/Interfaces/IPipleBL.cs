using System;
using System.Linq;
using System.Threading.Tasks;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface IPipeBL
    {
        IQueryable<DtoPipe> GetPipes();

        IQueryable<DtoPipe>? GetPipeById(Guid guid);

        Task<DtoPipe> CreatePipe(DtoPipeCreate pipe);

        void UpdatePipe(DtoPipeUpdate pipe, Guid guid);

        void DeletePipe(Guid guid);
    }
}
