using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

namespace Inventory_BLL.BL
{
    public class TallyPipeBL : ITallyPipeBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public TallyPipeBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoTallyPipe> GetTallyPipes()
        {
            IQueryable<TallyPipe> entityQuery = _context.TallyPipe.AsQueryable();
            return _mapper.ProjectTo<DtoTallyPipe>(entityQuery);
        }

        public IQueryable<DtoTallyPipe>? GetTallyPipeByCompositeKey(Guid tallyId, Guid pipeId)
        {
            IQueryable<TallyPipe>? tallyPipeQuery = _context.TallyPipe.Where(tp => tp.TallyId == tallyId && tp.PipeId == pipeId);
            if (tallyPipeQuery.Any())
            {
                return _mapper.ProjectTo<DtoTallyPipe>(tallyPipeQuery);
            }

            throw new KeyNotFoundException($"No tally-pipe association found for TallyId {tallyId} and PipeId {pipeId}.");
        }

        public async Task<DtoTallyPipe> CreateTallyPipe(DtoTallyPipe dtoTallyPipe)
        {
            if (dtoTallyPipe == null)
                throw new ArgumentNullException(nameof(dtoTallyPipe));

            TallyPipe tallyPipe = _mapper.Map<TallyPipe>(dtoTallyPipe);

            _context.TallyPipe.Add(tallyPipe);
            await _context.SaveChangesAsync();

            return dtoTallyPipe;
        }

        public void UpdateTallyPipe(DtoTallyPipe dtoTallyPipe, Guid tallyId, Guid pipeId)
        {
            TallyPipe? tallyPipe = _context.TallyPipe.Find(tallyId, pipeId);

            if (tallyPipe == null)
                throw new KeyNotFoundException($"No tally-pipe association found for TallyId {tallyId} and PipeId {pipeId}.");

            _mapper.Map(dtoTallyPipe, tallyPipe);
            _context.SaveChanges();
        }

        public void DeleteTallyPipe(Guid tallyId, Guid pipeId)
        {
            TallyPipe? tallyPipe = _context.TallyPipe.Find(tallyId, pipeId);

            if (tallyPipe == null)
                throw new KeyNotFoundException($"No tally-pipe association found for TallyId {tallyId} and PipeId {pipeId}.");

            _context.TallyPipe.Remove(tallyPipe);
            _context.SaveChanges();
        }
    }
}
