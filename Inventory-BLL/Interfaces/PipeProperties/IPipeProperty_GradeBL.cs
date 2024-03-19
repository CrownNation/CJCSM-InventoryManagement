using Inventory_Dto.Dto;
using System;
using System.Linq;

namespace Inventory_BLL.Interfaces
{
    public interface IPipeProperty_GradeBL
    {
        IQueryable<DtoPipeProperty_Grade> GetGrades();
        DtoPipeProperty_Grade GetGradeById(Guid id);
        DtoPipeProperty_Grade CreateGrade(DtoPipeProperty_Grade grade);
        void UpdateGrade(DtoPipeProperty_GradeUpdate grade, Guid id);
        void DeactivateGrade(Guid id);
    }
}
