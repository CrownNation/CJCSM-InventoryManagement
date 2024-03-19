using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;

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
            var entities = _context.PipeProperty_Condition.OrderBy(c=>c.Name);
            return _mapper.ProjectTo<DtoPipeProperty_Condition>(entities.AsQueryable());
        }

        public DtoPipeProperty_Condition GetConditionById(Guid id)
        {
            var entity = _context.PipeProperty_Condition.FirstOrDefault(e => e.PipeProperty_ConditionId == id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No condition with ID {id} can be found.");
            }
            return _mapper.Map<DtoPipeProperty_Condition>(entity);
        }

        public DtoPipeProperty_Condition CreateCondition(DtoPipeProperty_Condition condition)
        {
            var entity = _mapper.Map<PipeProperty_Condition>(condition);
            entity.PipeProperty_ConditionId = Guid.NewGuid();
            _context.PipeProperty_Condition.Add(entity);
            _context.SaveChanges();
            return _mapper.Map<DtoPipeProperty_Condition>(entity);
        }

        public void UpdateCondition(DtoPipeProperty_ConditionUpdate condition, Guid guid)
        {
            var entity = _context.PipeProperty_Condition.FirstOrDefault(e => e.PipeProperty_ConditionId == guid);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No condition with ID {guid} can be found.");
            }
            _mapper.Map(condition, entity);
            _context.SaveChanges();
        }

        public void DeactivateCondition(Guid id)
        {
            var entity = _context.PipeProperty_Condition.FirstOrDefault(e => e.PipeProperty_ConditionId == id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No condition with ID {id} can be found.");
            }
            entity.IsActive = false;
            _context.SaveChanges();
        }
    }
}
