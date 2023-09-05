using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory_BLL.BL
{
    public class TierBL : ITierBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public TierBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoTier> GetTiers()
        {
            IQueryable<Tier> entity = _context.Tier.AsQueryable();
            IQueryable<DtoTier> tiers = _mapper.ProjectTo<DtoTier>(entity);

            return tiers;
        }

        public IQueryable<DtoTier>? GetTierById(Guid guid)
        {
            IQueryable<Tier>? tier = _context.Tier.Where(x => x.TierId == guid);
            if (tier.Any())
            {
                IQueryable<DtoTier> DtoTier = _mapper.ProjectTo<DtoTier>(tier);
                return DtoTier;
            }

            throw new KeyNotFoundException($"No tier with guid {guid} can be found.");
        }

        public async Task<DtoTier> CreateTier(DtoTierCreate DtoTierCreate)
        {
            if (DtoTierCreate == null)
                throw new ArgumentNullException("Create Tier failed. The tier data is null");

            Tier tier = _mapper.Map<Tier>(DtoTierCreate);

            tier.TierId = Guid.NewGuid(); // This might be set by the database if it creates the GUID.
            _context.Tier.Add(tier);
            await _context.SaveChangesAsync();

            return _mapper.Map<DtoTier>(tier);
        }

        public void UpdateTier(DtoTierUpdate dtoTierUpdate, Guid guid)
        {
            Tier? tier = _context.Tier.Find(guid);

            if (tier == null)
                throw new KeyNotFoundException($"No tier with guid {guid} can be found.");

            _mapper.Map(dtoTierUpdate, tier);
            _context.SaveChanges();
        }

        public void DeleteTier(Guid guid)
        {
            Tier? tier = _context.Tier.Find(guid);

            if (tier == null)
                throw new KeyNotFoundException($"No tier with guid {guid} can be found.");

            _context.Tier.Remove(tier);
            _context.SaveChanges();
        }

    }
}
