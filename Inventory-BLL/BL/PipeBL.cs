using AutoMapper;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public class PipeBL : IPipeBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public PipeBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoPipe> GetPipes()
        {
            IQueryable<Pipe> entity = _context.Pipe.AsQueryable();
            IQueryable<DtoPipe> pipes = _mapper.ProjectTo<DtoPipe>(entity);
            return pipes;
        }

        public IQueryable<DtoPipe>? GetPipeById(Guid guid)
        {
            IQueryable<Pipe>? pipe = _context.Pipe.Where(x => x.PipeId == guid);
            if (pipe.Any())
            {
                IQueryable<DtoPipe> dtoPipe = _mapper.ProjectTo<DtoPipe>(pipe);
                return dtoPipe;
            }

            throw new KeyNotFoundException($"No pipe with guid {guid} can be found.");
        }

        public async Task<DtoPipe> CreatePipe(DtoPipeCreate dtoPipeCreate)
        {
            if (dtoPipeCreate == null)
                throw new ArgumentNullException("Create Pipe failed. The pipe data is null");

            Pipe pipe = _mapper.Map<Pipe>(dtoPipeCreate);

            pipe.PipeId = Guid.NewGuid(); // This can be removed if the DB sets it.
            _context.Pipe.Add(pipe);
            await _context.SaveChangesAsync();

            return _mapper.Map<DtoPipe>(pipe);
        }

        public void UpdatePipe(DtoPipeUpdate dtoPipeUpdate, Guid guid)
        {
            Pipe? pipe = _context.Pipe.Find(guid);

            if (pipe == null)
                throw new KeyNotFoundException($"No pipe with guid {guid} can be found.");

            _mapper.Map<DtoPipeUpdate, Pipe>(dtoPipeUpdate, pipe);
            _context.SaveChanges();
        }

        public void DeletePipe(Guid guid)
        {
            Pipe? pipe = _context.Pipe.Find(guid);

            if (pipe == null)
                throw new KeyNotFoundException($"No pipe with guid {guid} can be found.");

            _context.Pipe.Remove(pipe);
            _context.SaveChanges();
        }
    }
}
