using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

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

      public bool CheckIfEquipmentDefinitionExists(DtoEquipmentDefinitionSearchParams dtoEquipmentDefinition)
      {
         // Check if any equipment definition in the database matches all the properties of the provided DtoEquipmentDefinition
         bool exists = _context.EquipmentDefinition.Any(ed =>
             ed.GradeId == dtoEquipmentDefinition.GradeId &&
             ed.SizeId == dtoEquipmentDefinition.SizeId &&
             ed.Category == dtoEquipmentDefinition.Category
         );

         return exists;
      }

      public async Task<DtoEquipmentDefinition> CreateEquipmentDefinition(DtoEquipmentDefinitionCreate dtoEquipmentDefinitionCreate)
      {
         if (dtoEquipmentDefinitionCreate == null)
            throw new ArgumentNullException(nameof(dtoEquipmentDefinitionCreate), "Create EquipmentDefinition failed. The EquipmentDefinition data is null.");


         try
         {
            EquipmentDefinition equipmentDefinition = _mapper.Map<EquipmentDefinition>(dtoEquipmentDefinitionCreate);
            equipmentDefinition.EquipmentDefinitionId = Guid.NewGuid(); // Generate new GUID for the Equipment Definition ID
            _context.EquipmentDefinition.Add(equipmentDefinition);

            // Log the data that is being saved
            var equipmentDefinitionDetails = JsonConvert.SerializeObject(equipmentDefinition);
            System.Diagnostics.Debug.WriteLine($"Attempting to create a new EquipmentDefinition with ID: {equipmentDefinition.EquipmentDefinitionId} and details: {equipmentDefinitionDetails}");

            await _context.SaveChangesAsync();

            return _mapper.Map<DtoEquipmentDefinition>(equipmentDefinition);
         }
         catch (DbUpdateException dbEx)
         {
            // Log database update exceptions which might involve constraints, duplicate keys, etc.
            System.Diagnostics.Debug.WriteLine($"Database update exception: {dbEx.InnerException?.Message ?? dbEx.Message}");
            throw new Exception("Database update failed while creating EquipmentDefinition.", dbEx);
         }
         catch (Exception ex)
         {
            // Log any other exceptions that might occur
            System.Diagnostics.Debug.WriteLine($"An error occurred while creating a new EquipmentDefinition: {ex.Message}");
            throw new Exception("An error occurred while creating EquipmentDefinition.", ex);
         }
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