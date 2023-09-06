using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

namespace Inventory_BLL.BL
{
    public class TallyBL : ITallyBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public TallyBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoTally> GetTallies()
        {
            IQueryable<Tally> entity = _context.Tally.AsQueryable();
            IQueryable<DtoTally> tallies = _mapper.ProjectTo<DtoTally>(entity);
            return tallies;
        }

        public IQueryable<DtoTally>? GetTallyById(Guid guid)
        {
            IQueryable<Tally>? tally = _context.Tally.Where(x => x.TallyId == guid);
            if (tally.Any())
            {
                IQueryable<DtoTally> DtoTally = _mapper.ProjectTo<DtoTally>(tally);
                return DtoTally;
            }

            throw new KeyNotFoundException($"No tally with guid {guid} can be found.");
        }

        public async Task<DtoTally> CreateTally(DtoTallyCreate DtoTally)
        {
            if (DtoTally == null)
                throw new ArgumentNullException("Create Tally failed. The tally data is null");

            // Other validations can be added as per your requirements

            Tally tally = _mapper.Map<Tally>(DtoTally);

            tally.TallyId = Guid.NewGuid();
            _context.Tally.Add(tally);
            await _context.SaveChangesAsync();

            return _mapper.Map<DtoTally>(tally);
        }

        public void UpdateTally(DtoTallyUpdate dtoTallyUpdate, Guid guid)
        {
            Tally? tally = _context.Tally.Find(guid);

            if (tally == null)
                throw new KeyNotFoundException($"No tally with guid {guid} can be found.");

            _mapper.Map<DtoTallyUpdate, Tally>(dtoTallyUpdate, tally);
            _context.SaveChanges();
        }

        public void DeleteTally(Guid guid)
        {
            Tally? tally = _context.Tally.Find(guid);

            if (tally == null)
                throw new KeyNotFoundException($"No tally with guid {guid} can be found.");

            _context.Tally.Remove(tally);
            _context.SaveChanges();
        }

    }
}
