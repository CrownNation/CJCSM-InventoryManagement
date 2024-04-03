using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;

namespace Inventory_BLL.BL
{
    public class PipeProperty_CoatingBL : IPipeProperty_CoatingBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public PipeProperty_CoatingBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoPipeProperty_Coating> GetCoatings()
        {
            var entities = _context.PipeProperty_Coating.OrderBy(c => c.Name);
            return _mapper.ProjectTo<DtoPipeProperty_Coating>(entities.AsQueryable());
        }

        public async Task<DtoPipeProperty_Coating> GetCoatingById(Guid id)
        {
            var entity = await _context.PipeProperty_Coating.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No coating with ID {id} can be found.");
            }
            return _mapper.Map<DtoPipeProperty_Coating>(entity);
        }

        public async Task<DtoPipeProperty_Coating> CreateCoating(DtoPipeProperty_Coating coating)
        {
            var entity = _mapper.Map<PipeProperty_Coating>(coating);
            entity.PipeProperty_CoatingId = Guid.NewGuid();
            await _context.PipeProperty_Coating.AddAsync(entity);
            await _context.SaveChangesAsync();
            return _mapper.Map<DtoPipeProperty_Coating>(entity);
        }

        public async Task UpdateCoating(DtoPipeProperty_CoatingUpdate coating, Guid guid)
        {
            var entity = await _context.PipeProperty_Coating.FindAsync(guid);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No coating with ID {guid} can be found.");
            }
            _mapper.Map(coating, entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeactivateCoating(Guid id)
        {
            var entity = await _context.PipeProperty_Coating.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No coating with ID {id} can be found.");
            }
            entity.IsActive = false;
            await _context.SaveChangesAsync();
        }
    }
}
