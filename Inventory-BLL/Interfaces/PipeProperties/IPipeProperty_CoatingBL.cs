using Inventory_Dto.Dto;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory_BLL.Interfaces
{
    public interface IPipeProperty_CoatingBL
    {
        IQueryable<DtoPipeProperty_Coating> GetCoatings();

        Task<DtoPipeProperty_Coating> GetCoatingById(Guid id);
        Task<DtoPipeProperty_Coating> CreateCoating(DtoPipeProperty_Coating coating);
        Task UpdateCoating(DtoPipeProperty_CoatingUpdate coating, Guid guid);
        Task DeactivateCoating(Guid id);
    }
}
