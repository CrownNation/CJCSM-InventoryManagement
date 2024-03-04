using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using System;
using System.Linq;

namespace Inventory_BLL.BL
{
    public class EquipmentBL : IEquipmentBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public EquipmentBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<Equipment> GetEquipments()
        {
            return _context.Equipment.AsQueryable();
        }

        public Equipment GetEquipmentById(Guid id)
        {
            var equipment = _context.Equipment.Find(id);
            if (equipment == null)
                throw new KeyNotFoundException($"Equipment with ID {id} not found.");
            return equipment;
        }

        public Equipment CreateEquipment(DtoEquipmentCreate dto)
        {
            var equipment = _mapper.Map<Equipment>(dto);
            _context.Equipment.Add(equipment);
            _context.SaveChanges();
            return equipment;
        }

        public void UpdateEquipment(Guid id, DtoEquipmentUpdate dto)
        {
            var equipment = _context.Equipment.Find(id);
            if (equipment == null)
                throw new KeyNotFoundException($"Equipment with ID {id} not found.");

            _mapper.Map(dto, equipment);
            _context.SaveChanges();
        }

        public void DeactivateEquipment(Guid id)
        {
            var equipment = _context.Equipment.Find(id);
            if (equipment == null)
                throw new KeyNotFoundException($"Equipment with ID {id} not found.");

            _context.SaveChanges();
        }
    }
}
