using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface IPipeProperty_RangeBL
    {
        IQueryable<DtoPipeProperty_Range> GetRanges();
        Task<DtoPipeProperty_Range> GetRangeById(Guid id);
        Task<DtoPipeProperty_Range> CreateRange(DtoPipeProperty_Range range);
        Task UpdateRange(DtoPipeProperty_RangeUpdate range, Guid id);
        Task DeactivateRange(Guid id);
    }
}
