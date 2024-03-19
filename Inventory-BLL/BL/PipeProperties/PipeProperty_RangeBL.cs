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
    public class PipeProperty_RangeBL : IPipeProperty_RangeBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public PipeProperty_RangeBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoPipeProperty_Range> GetRanges()
        {
            var entities = _context.PipeProperty_Range.OrderBy(c => c.Name);
            return _mapper.ProjectTo<DtoPipeProperty_Range>(entities.AsQueryable());
        }

        public async Task<DtoPipeProperty_Range> GetRangeById(Guid id)
        {
            var entity = await _context.PipeProperty_Range.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No range with ID {id} can be found.");
            }
            return _mapper.Map<DtoPipeProperty_Range>(entity);
        }

        public async Task<DtoPipeProperty_Range> CreateRange(DtoPipeProperty_Range range)
        {
            var entity = _mapper.Map<PipeProperty_Range>(range);
            entity.PipeProperty_RangeId = Guid.NewGuid();
            _context.PipeProperty_Range.Add(entity);
            await _context.SaveChangesAsync();
            return _mapper.Map<DtoPipeProperty_Range>(entity);
        }

        public async Task UpdateRange(DtoPipeProperty_RangeUpdate range, Guid id)
        {
            var entity = await _context.PipeProperty_Range.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No range with ID {id} can be found.");
            }
            _mapper.Map(range, entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeactivateRange(Guid id)
        {
            var entity = await _context.PipeProperty_Range.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No range with ID {id} can be found.");
            }
            entity.IsActive = false;
            await _context.SaveChangesAsync();
        }
    }
}
