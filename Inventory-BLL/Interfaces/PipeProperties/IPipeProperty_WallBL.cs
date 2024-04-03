using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface IPipeProperty_WallBL
    {
        IQueryable<DtoPipeProperty_Wall> GetWalls();
        Task<DtoPipeProperty_Wall> GetWallById(Guid id);
        Task<DtoPipeProperty_Wall> CreateWall(DtoPipeProperty_Wall wall);
        Task UpdateWall(DtoPipeProperty_WallUpdate wall, Guid id);
        Task DeactivateWall(Guid id);
    }
}
