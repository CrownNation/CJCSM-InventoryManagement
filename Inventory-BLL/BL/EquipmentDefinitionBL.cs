using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

namespace Inventory_BLL.BL
{
    public class EquipmentDefinitionBL : IEquipmentDefinitionBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public EquipmentDefinitionBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoEquipmentDefinition> GetEquipmentDefinitions()
        {
            IQueryable<EquipmentDefinition> entity = _context.EquipmentDefinition.AsQueryable();
            IQueryable<DtoEquipmentDefinition> equipmentDefinitions = _mapper.ProjectTo<DtoEquipmentDefinition>(entity);

            return equipmentDefinitions;
        }

        public IQueryable<DtoEquipmentDefinition> GetEquipmentDefinitionById(Guid id)  
        {
            IQueryable<EquipmentDefinition>? equipmentDefinitino = _context.EquipmentDefinition.Where(x => x.EquipmentDefinitionId== id);
            if (equipmentDefinitino.Any())
            {
                IQueryable<DtoEquipmentDefinition> dtoEquipmentDefinition = _mapper.ProjectTo<DtoEquipmentDefinition>(equipmentDefinitino);
                return dtoEquipmentDefinition;
            }
            throw new KeyNotFoundException($"No equipment definition with guid {id} can be found.");
        }

        public EquipmentDefinition CreateEquipmentDefinition(DtoEquipmentDefinitionCreate dto)
        {
            var equipmentDefinition = _mapper.Map<EquipmentDefinition>(dto);
            _context.EquipmentDefinition.Add(equipmentDefinition);
            _context.SaveChanges();
            return equipmentDefinition;
        }

        public void UpdateEquipmentDefinition(Guid id, DtoEquipmentDefinitionUpdate dto)
        {
            var equipmentDefinition = _context.EquipmentDefinition.Find(id);
            if (equipmentDefinition == null)
                throw new KeyNotFoundException($"EquipmentDefinition with ID {id} not found.");

            _mapper.Map(dto, equipmentDefinition);
            _context.SaveChanges();
        }

        public void DeactivateEquipmentDefinition(Guid id)
        {
            var equipmentDefinition = _context.EquipmentDefinition.Find(id);
            if (equipmentDefinition == null)
                throw new KeyNotFoundException($"EquipmentDefinition with ID {id} not found.");

            equipmentDefinition.IsActive = false;
            _context.SaveChanges();
        }
    }
}