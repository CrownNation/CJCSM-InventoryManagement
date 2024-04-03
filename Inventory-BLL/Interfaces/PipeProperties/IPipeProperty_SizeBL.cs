using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface IPipeProperty_SizeBL
    {
        IQueryable<DtoPipeProperty_Size> GetSizes();
        Task<DtoPipeProperty_Size> GetSizeById(Guid id);
        Task<DtoPipeProperty_Size> CreateSize(DtoPipeProperty_Size size);
        Task UpdateSize(DtoPipeProperty_SizeUpdate size, Guid id);
        Task DeactivateSize(Guid id);
    }
}
