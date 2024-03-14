using AutoMapper;
using CJCSM_Common;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_DAL.Entities.PipeProperties;
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

        public IQueryable<Equipment> GetEquipmentList()
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

        public IQueryable<DtoEquipment> GetEquipmentWithDefinitionById(Guid equipmentId)
        {
            try
            {
                IQueryable<DtoEquipment> equipmentQuery = from equipment in _context.Equipment
                                                          join ed in _context.EquipmentDefinition on equipment.EquipmentDefinitionId equals ed.EquipmentDefinitionId
                                                          join r in _context.Rack on equipment.RackId equals r.RackId
                                                          join ppgr in _context.PipeProperty_Grade on ed.PipeProperty_GradeId equals ppgr.PipeProperty_GradeId
                                                          join pps in _context.PipeProperty_Size on ed.PipeProperty_SizeId equals pps.PipeProperty_SizeId
                                                          where equipment.EquipmentId == equipmentId
                                                          select new DtoEquipment

                                                          {
                                                              CustomerId = equipment.CustomerId,
                                                              EquipmentDefinitionId = equipment.EquipmentDefinitionId,
                                                              EquipmentId = equipment.EquipmentId,
                                                              ShopLocationId = equipment.ShopLocationId,
                                                              LengthInMeters = equipment.LengthInMeters,
                                                              LengthInFeet = equipment.LengthInFeet,
                                                              Quantity = equipment.Quantity,
                                                              RackId = r.RackId,
                                                              RackName = r.Name,
                                                              EquipmentDefinition = new DtoEquipmentDefinition()
                                                              {
                                                                  Category = ed.Category,
                                                                  Description = ed.Description,
                                                                  EquipmentDefinitionId = ed.EquipmentDefinitionId,
                                                                  PipeProperty_GradeId = ed.PipeProperty_GradeId,
                                                                  Grade = ppgr,
                                                                  PipeProperty_SizeId = ed.PipeProperty_SizeId,
                                                                  Size = pps,
                                                                  IsActive = ed.IsActive,
                                                                  Notes = ed.Notes

                                                              }
                                                          };
                return equipmentQuery;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"An error occurred in GetEquipmentWithDefinitionById: {ex.Message}");
                throw; // Rethrow the exception to let it propagate up the call stack
            }

        }

        public IQueryable<DtoEquipment>? GetEquipmentWithDefinitionList()
        {
            try
            {
                var equipmentQuery = from equipment in _context.Equipment
                                     join ed in _context.EquipmentDefinition on equipment.EquipmentDefinitionId equals ed.EquipmentDefinitionId
                                     join r in _context.Rack on equipment.RackId equals r.RackId
                                     join ppgr in _context.PipeProperty_Grade on ed.PipeProperty_GradeId equals ppgr.PipeProperty_GradeId
                                     join pps in _context.PipeProperty_Size on ed.PipeProperty_SizeId equals pps.PipeProperty_SizeId
                                     select new DtoEquipment
                                     {
                                         CustomerId = equipment.CustomerId,
                                         EquipmentDefinitionId = equipment.EquipmentDefinitionId,
                                         EquipmentId = equipment.EquipmentId,
                                         ShopLocationId = equipment.ShopLocationId,
                                         LengthInMeters = equipment.LengthInMeters,
                                         LengthInFeet = equipment.LengthInFeet,
                                         Quantity = equipment.Quantity,
                                         RackId = r.RackId,
                                         RackName = r.Name,
                                         EquipmentDefinition = new DtoEquipmentDefinition()
                                         {
                                             Category = ed.Category,
                                             Description = ed.Description,
                                             EquipmentDefinitionId = ed.EquipmentDefinitionId,
                                             PipeProperty_GradeId = ed.PipeProperty_GradeId,
                                             Grade = ppgr,
                                             PipeProperty_SizeId = ed.PipeProperty_SizeId,
                                             Size = pps,
                                             IsActive = ed.IsActive,
                                             Notes = ed.Notes

                                         }
                                     };

                return equipmentQuery;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"An error occurred in GetEquipmentWithDefinitionList: {ex.Message}");
                throw; // Rethrow the exception to let it propagate up the call stack
            }

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
