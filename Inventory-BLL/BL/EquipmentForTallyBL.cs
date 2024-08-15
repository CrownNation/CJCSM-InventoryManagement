using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using System;
using System.Linq;

namespace Inventory_BLL.BL
{
   public class EquipmentForTallyBL : IEquipmentForTallyBL
   {
      private readonly InventoryContext _context;
      private readonly IMapper _mapper;

      public EquipmentForTallyBL(InventoryContext context, IMapper mapper)
      {
         _context = context;
         _mapper = mapper;
      }

      public IQueryable<DtoEquipmentForTally> GetEquipmentForTallyByTallyId(Guid tallyId)
      {
         try
         {
            IQueryable<DtoEquipmentForTally> equipmentQuery = from equipment in _context.EquipmentForTally
                                                              join r in _context.Rack on equipment.RackId equals r.RackId
                                                              where equipment.TallyId == tallyId
                                                              select new DtoEquipmentForTally

                                                              {
                                                                 EquipmentForTallyId = equipment.EquipmentForTallyId,
                                                                 CustomerId = equipment.CustomerId,
                                                                 EquipmentDefinitionId = equipment.EquipmentDefinitionId,
                                                                 TallyId = equipment.TallyId,
                                                                 LengthInMeters = equipment.LengthInMeters,
                                                                 Quantity = equipment.Quantity,
                                                                 RackId = r.RackId,
                                                                 RackName = r.Name,
                                                              };
            return equipmentQuery;
         }
         catch (Exception ex)
         {
            System.Diagnostics.Debug.WriteLine($"An error occurred in GetEquipmentForTallyWithDefinitionById: {ex.Message}");
            throw; // Rethrow the exception to let it propagate up the call stack
         }
      }


      public IQueryable<DtoEquipmentForTally> GetEquipmentForTallyWithDefinitionByTallyId(Guid tallyId)
      {
         try
         {
            var equipmentQuery = from equipment in _context.EquipmentForTally
                                 join ed in _context.EquipmentDefinition on equipment.EquipmentDefinitionId equals ed.EquipmentDefinitionId
                                 join r in _context.Rack on equipment.RackId equals r.RackId
                                 join ppgr in _context.PipeProperty_Grade on ed.GradeId equals ppgr.PipeProperty_GradeId
                                 join pps in _context.PipeProperty_Size on ed.SizeId equals pps.PipeProperty_SizeId
                                 where equipment.TallyId == tallyId
                                 select new DtoEquipmentForTally
                                 {
                                    EquipmentForTallyId = equipment.EquipmentForTallyId,
                                    CustomerId = equipment.CustomerId,
                                    EquipmentDefinitionId = equipment.EquipmentDefinitionId,
                                    TallyId = equipment.TallyId,
                                    LengthInMeters = equipment.LengthInMeters,
                                    Quantity = equipment.Quantity,
                                    RackId = r.RackId,
                                    RackName = r.Name,
                                    EquipmentDefinition = new DtoEquipmentDefinition()
                                    {
                                       Category = ed.Category,
                                       Description = ed.Description,
                                       EquipmentDefinitionId = ed.EquipmentDefinitionId,
                                       GradeId = ed.GradeId,
                                       Grade = ppgr,
                                       SizeId = ed.SizeId,
                                       Size = pps,
                                       IsActive = ed.IsActive,
                                       Notes = ed.Notes

                                    }
                                 };

            return equipmentQuery;
         }
         catch (Exception ex)
         {
            System.Diagnostics.Debug.WriteLine($"An error occurred in GetEquipmentForTallyWithDefinitionList: {ex.Message}");
            throw; // Rethrow the exception to let it propagate up the call stack
         }
      }

      public EquipmentForTally CreateEquipmentForTally(DtoEquipmentForTallyCreate dto)
      {
         var equipment = _mapper.Map<EquipmentForTally>(dto);
         _context.EquipmentForTally.Add(equipment);
         _context.SaveChanges();
         return equipment;
      }

      public void DeactivateEquipmentForTally(Guid id)
      {
         var equipment = _context.EquipmentForTally.Find(id);
         if (equipment == null)
            throw new KeyNotFoundException($"EquipmentForTally with ID {id} not found.");

         _context.SaveChanges();
      }
   }
}
