﻿using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface IPipeProperty_ConditionBL
    {
        IQueryable<DtoPipeProperty_Condition> GetConditions();
        DtoPipeProperty_Condition GetConditionById(Guid id);
        DtoPipeProperty_Condition CreateCondition(DtoPipeProperty_Condition condition);
        void UpdateCondition(DtoPipeProperty_ConditionUpdate condition, Guid guid);
        void DeactivateCondition(Guid id);
    }
}