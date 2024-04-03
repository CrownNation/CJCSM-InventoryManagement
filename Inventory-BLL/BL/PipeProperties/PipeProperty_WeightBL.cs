using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;

namespace Inventory_BLL.BL
{
    public class PipeProperty_WeightBL : IPipeProperty_WeightBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public PipeProperty_WeightBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoPipeProperty_Weight> GetWeights()
        {
            var entities = _context.PipeProperty_Weight.OrderBy(w => w.WeightInKgPerMeter);
            return _mapper.ProjectTo<DtoPipeProperty_Weight>(entities.AsQueryable());
        }

        public async Task<DtoPipeProperty_Weight> GetWeightById(Guid id)
        {
            var entity = await _context.PipeProperty_Weight.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No weight with ID {id} can be found.");
            }
            return _mapper.Map<DtoPipeProperty_Weight>(entity);
        }

        public async Task<DtoPipeProperty_Weight> CreateWeight(DtoPipeProperty_Weight weight)
        {
            var entity = _mapper.Map<PipeProperty_Weight>(weight);
            entity.PipeProperty_WeightId = Guid.NewGuid();
            _context.PipeProperty_Weight.Add(entity);
            await _context.SaveChangesAsync();
            return _mapper.Map<DtoPipeProperty_Weight>(entity);
        }

        public async Task UpdateWeight(DtoPipeProperty_WeightUpdate weight, Guid id)
        {
            var entity = await _context.PipeProperty_Weight.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No weight with ID {id} can be found.");
            }
            _mapper.Map(weight, entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeactivateWeight(Guid id)
        {
            var entity = await _context.PipeProperty_Weight.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No weight with ID {id} can be found.");
            }
            entity.IsActive = false;
            await _context.SaveChangesAsync();
        }
    }
}
