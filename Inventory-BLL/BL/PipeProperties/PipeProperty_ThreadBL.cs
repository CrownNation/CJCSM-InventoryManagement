using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;

namespace Inventory_BLL.BL
{
    public class PipeProperty_ThreadBL : IPipeProperty_ThreadBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public PipeProperty_ThreadBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoPipeProperty_Thread> GetThreads()
        {
            var entities = _context.PipeProperty_Thread.OrderBy(c => c.Name);
            return _mapper.ProjectTo<DtoPipeProperty_Thread>(entities.AsQueryable());
        }

        public async Task<DtoPipeProperty_Thread> GetThreadById(Guid id)
        {
            var entity = await _context.PipeProperty_Thread.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No thread with ID {id} can be found.");
            }
            return _mapper.Map<DtoPipeProperty_Thread>(entity);
        }

        public async Task<DtoPipeProperty_Thread> CreateThread(DtoPipeProperty_Thread thread)
        {
            var entity = _mapper.Map<PipeProperty_Thread>(thread);
            entity.PipeProperty_ThreadId = Guid.NewGuid();
            _context.PipeProperty_Thread.Add(entity);
            await _context.SaveChangesAsync();
            return _mapper.Map<DtoPipeProperty_Thread>(entity);
        }

        public async Task UpdateThread(DtoPipeProperty_ThreadUpdate thread, Guid id)
        {
            var entity = await _context.PipeProperty_Thread.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No thread with ID {id} can be found.");
            }
            _mapper.Map(thread, entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeactivateThread(Guid id)
        {
            var entity = await _context.PipeProperty_Thread.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No thread with ID {id} can be found.");
            }
            entity.IsActive = false;
            await _context.SaveChangesAsync();
        }
    }
}
