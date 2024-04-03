using Inventory_Dto.Dto;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory_BLL.Interfaces
{
    public interface IPipeProperty_ConditionBL
    {
        IQueryable<DtoPipeProperty_Condition> GetConditions();

        Task<DtoPipeProperty_Condition> GetConditionByIdAsync(Guid id);

        Task<DtoPipeProperty_Condition> CreateConditionAsync(DtoPipeProperty_Condition condition);

        Task UpdateConditionAsync(DtoPipeProperty_ConditionUpdate condition, Guid guid);

        Task DeactivateConditionAsync(Guid id);
    }
}
