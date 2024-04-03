using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory_BLL.BL
{
    public class PipeProperty_ConditionBL : IPipeProperty_ConditionBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public PipeProperty_ConditionBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoPipeProperty_Condition> GetConditions()
        {
            var entities = _context.PipeProperty_Condition.OrderBy(c => c.Name);
            return _mapper.ProjectTo<DtoPipeProperty_Condition>(entities.AsQueryable());
        }

        public async Task<DtoPipeProperty_Condition> GetConditionByIdAsync(Guid id)
        {
            var entity = await _context.PipeProperty_Condition.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No condition with ID {id} can be found.");
            }
            return _mapper.Map<DtoPipeProperty_Condition>(entity);
        }

        public async Task<DtoPipeProperty_Condition> CreateConditionAsync(DtoPipeProperty_Condition condition)
        {
            var entity = _mapper.Map<PipeProperty_Condition>(condition);
            entity.PipeProperty_ConditionId = Guid.NewGuid();
            await _context.PipeProperty_Condition.AddAsync(entity);
            await _context.SaveChangesAsync();
            return _mapper.Map<DtoPipeProperty_Condition>(entity);
        }

        public async Task UpdateConditionAsync(DtoPipeProperty_ConditionUpdate condition, Guid guid)
        {
            var entity = await _context.PipeProperty_Condition.FirstOrDefaultAsync(e => e.PipeProperty_ConditionId == guid);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No condition with ID {guid} can be found.");
            }
            _mapper.Map(condition, entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeactivateConditionAsync(Guid id)
        {
            var entity = await _context.PipeProperty_Condition.FirstOrDefaultAsync(e => e.PipeProperty_ConditionId == id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No condition with ID {id} can be found.");
            }
            entity.IsActive = false;
            await _context.SaveChangesAsync();
        }
    }
}
