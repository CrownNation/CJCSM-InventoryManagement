using Inventory_Dto.Dto;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory_BLL.Interfaces
{
    public interface IPipeProperty_GradeBL
    {
        IQueryable<DtoPipeProperty_Grade> GetGrades();

        Task<DtoPipeProperty_Grade> GetGradeById(Guid id);
        Task<DtoPipeProperty_Grade> CreateGrade(DtoPipeProperty_Grade grade);
        Task UpdateGrade(DtoPipeProperty_GradeUpdate grade, Guid id);
        Task DeactivateGrade(Guid id);
    }
}
