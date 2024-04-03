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
    public class PipeProperty_SizeBL : IPipeProperty_SizeBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public PipeProperty_SizeBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoPipeProperty_Size> GetSizes()
        {
            var entities = _context.PipeProperty_Size.OrderBy(s => s.SizeMetric);
            return _mapper.ProjectTo<DtoPipeProperty_Size>(entities.AsQueryable());
        }

        public async Task<DtoPipeProperty_Size> GetSizeById(Guid id)
        {
            var entity = await _context.PipeProperty_Size.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No size with ID {id} can be found.");
            }
            return _mapper.Map<DtoPipeProperty_Size>(entity);
        }

        public async Task<DtoPipeProperty_Size> CreateSize(DtoPipeProperty_Size size)
        {
            var entity = _mapper.Map<PipeProperty_Size>(size);
            entity.PipeProperty_SizeId = Guid.NewGuid();
            _context.PipeProperty_Size.Add(entity);
            await _context.SaveChangesAsync();
            return _mapper.Map<DtoPipeProperty_Size>(entity);
        }

        public async Task UpdateSize(DtoPipeProperty_SizeUpdate size, Guid id)
        {
            var entity = await _context.PipeProperty_Size.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No size with ID {id} can be found.");
            }
            _mapper.Map(size, entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeactivateSize(Guid id)
        {
            var entity = await _context.PipeProperty_Size.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No size with ID {id} can be found.");
            }
            entity.IsActive = false;
            await _context.SaveChangesAsync();
        }
    }
}
