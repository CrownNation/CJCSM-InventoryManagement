using Inventory_DAL.Entities; // Assuming Rack entity resides here
using AutoMapper;
using System;
using System.Linq;
using System.Threading.Tasks;
using Inventory_Dto.Dto;
using Inventory_BLL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Inventory_BLL.BL
{
    public class RackBL : IRackBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public RackBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoRack> GetRacks()
        {
            var entity = _context.Rack
                                 .Include(r => r.ShopLocation)
                                 .AsQueryable();

            var racks = _mapper.ProjectTo<DtoRack>(entity);
            return racks;
        }

        public async Task<DtoRack?> GetRackById(Guid guid)
        {
            // Eager load the associated ShopLocation
            var rack = await _context.Rack
                .Include(r => r.ShopLocation)
                .FirstOrDefaultAsync(x => x.RackId == guid);

            if (rack != null)
            {
                // Map the Rack entity to DtoRack
                var dtoRack = _mapper.Map<DtoRack>(rack);
                return dtoRack;
            }

            throw new KeyNotFoundException($"No rack with guid {guid} can be found.");
        }

        public async Task<DtoRack> CreateRack(DtoRackCreate dtoRack)
        {
            if (dtoRack == null)
                throw new ArgumentNullException("Create Rack failed. The rack data is null");
            if (String.IsNullOrEmpty(dtoRack.Name))
                throw new ArgumentNullException("Create Rack failed. The rack name cannot be null or empty.");

            Rack rack = _mapper.Map<Rack>(dtoRack);

            rack.RackId = Guid.NewGuid(); // If the database doesn't generate it
            _context.Rack.Add(rack); // Assuming Rack is the entity name
            await _context.SaveChangesAsync();

            return _mapper.Map<DtoRack>(rack);
        }

        public void UpdateRack(DtoRackUpdate dtoRack, Guid guid)
        {
            Rack? rack = _context.Rack.Find(guid); // Assuming Rack is the entity name

            if (rack == null)
                throw new KeyNotFoundException($"No rack with guid {guid} can be found.");

            _mapper.Map<DtoRackUpdate, Rack>(dtoRack, rack);
            _context.SaveChanges();
        }

        public void DeleteRack(Guid guid)
        {
            Rack? rack = _context.Rack.Find(guid); // Assuming Rack is the entity name

            if (rack == null)
                throw new KeyNotFoundException($"No rack with guid {guid} can be found.");

            _context.Rack.Remove(rack); // Assuming Rack is the entity name
            _context.SaveChanges();
        }
    }
}
