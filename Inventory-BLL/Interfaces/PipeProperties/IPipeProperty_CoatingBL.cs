using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface IPipeProperty_CoatingBL
    {
        IQueryable<DtoPipeProperty_Coating> GetCoatings();
        DtoPipeProperty_Coating GetCoatingById(Guid id);
        DtoPipeProperty_Coating CreateCoating(DtoPipeProperty_Coating coating);
        void UpdateCoating(DtoPipeProperty_CoatingUpdate coating, Guid guid);
        void DeactivateCoating(Guid id);
    }
}
