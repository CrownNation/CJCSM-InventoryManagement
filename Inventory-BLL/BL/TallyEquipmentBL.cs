using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Models.DTO.Basic;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory_BLL.BL
{
    public class TallyEquipmentBL : ITallyEquipmentBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public TallyEquipmentBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoTallyEquipment> GetTallyEquipmentList()
        {
            IQueryable<TallyEquipment> entityQuery = _context.TallyEquipment.AsQueryable();
            return _mapper.ProjectTo<DtoTallyEquipment>(entityQuery);
        }

        public IQueryable<DtoTallyEquipment>? GetTallyEquipmentByCompositeKey(Guid tallyId, Guid equipmentId)
        {
            IQueryable<TallyEquipment>? tallyEquipmentQuery = _context.TallyEquipment
                .Where(te => te.TallyId == tallyId && te.EquipmentId == equipmentId);

            if (tallyEquipmentQuery.Any())
            {
                return _mapper.ProjectTo<DtoTallyEquipment>(tallyEquipmentQuery);
            }

            throw new KeyNotFoundException($"No tally-equipment association found for TallyId {tallyId} and EquipmentId {equipmentId}.");
        }

        public async Task<DtoTallyEquipment> CreateTallyEquipment(DtoTallyEquipment dtoTallyEquipment)
        {
            if (dtoTallyEquipment == null)
                throw new ArgumentNullException(nameof(dtoTallyEquipment));

            TallyEquipment tallyEquipment = _mapper.Map<TallyEquipment>(dtoTallyEquipment);

            _context.TallyEquipment.Add(tallyEquipment);
            await _context.SaveChangesAsync();

            return dtoTallyEquipment; 
        }

        public void UpdateTallyEquipment(DtoTallyEquipment dtoTallyEquipment, Guid tallyId, Guid equipmentId)
        {
            TallyEquipment? tallyEquipment = _context.TallyEquipment
                .FirstOrDefault(te => te.TallyId == tallyId && te.EquipmentId == equipmentId);

            if (tallyEquipment == null)
                throw new KeyNotFoundException($"No tally-equipment association found for TallyId {tallyId} and EquipmentId {equipmentId}.");

            _mapper.Map(dtoTallyEquipment, tallyEquipment);
            _context.SaveChanges();
        }

        public void DeleteTallyEquipment(Guid tallyId, Guid equipmentId)
        {
            TallyEquipment? tallyEquipment = _context.TallyEquipment
                .FirstOrDefault(te => te.TallyId == tallyId && te.EquipmentId == equipmentId);

            if (tallyEquipment == null)
                throw new KeyNotFoundException($"No tally-equipment association found for TallyId {tallyId} and EquipmentId {equipmentId}.");

            _context.TallyEquipment.Remove(tallyEquipment);
            _context.SaveChanges();
        }
    }
}
