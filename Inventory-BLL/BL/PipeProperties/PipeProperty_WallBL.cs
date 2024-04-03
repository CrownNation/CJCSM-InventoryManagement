using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory_BLL.BL
{
    public class PipeProperty_WallBL : IPipeProperty_WallBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public PipeProperty_WallBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoPipeProperty_Wall> GetWalls()
        {
            var entities = _context.PipeProperty_Wall.OrderBy(w => w.WallMetric);
            return _mapper.ProjectTo<DtoPipeProperty_Wall>(entities.AsQueryable());
        }

        public async Task<DtoPipeProperty_Wall> GetWallById(Guid id)
        {
            var entity = await _context.PipeProperty_Wall.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No wall with ID {id} can be found.");
            }
            return _mapper.Map<DtoPipeProperty_Wall>(entity);
        }

        public async Task<DtoPipeProperty_Wall> CreateWall(DtoPipeProperty_Wall wall)
        {
            var entity = _mapper.Map<PipeProperty_Wall>(wall);
            entity.PipeProperty_WallId = Guid.NewGuid();
            _context.PipeProperty_Wall.Add(entity);
            await _context.SaveChangesAsync();
            return _mapper.Map<DtoPipeProperty_Wall>(entity);
        }

        public async Task UpdateWall(DtoPipeProperty_WallUpdate wall, Guid id)
        {
            var entity = await _context.PipeProperty_Wall.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No wall with ID {id} can be found.");
            }
            _mapper.Map(wall, entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeactivateWall(Guid id)
        {
            var entity = await _context.PipeProperty_Wall.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No wall with ID {id} can be found.");
            }
            entity.IsActive = false;
            await _context.SaveChangesAsync();
        }
    }
}
