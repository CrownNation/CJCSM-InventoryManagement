using AutoMapper;
using System;
using System.Linq;
using System.Threading.Tasks;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Microsoft.EntityFrameworkCore;
using Inventory_BLL.Interfaces;
using Newtonsoft.Json;

namespace Inventory_BLL.BL
{
    public class PipeDefinitionBL : IPipeDefinitionBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public PipeDefinitionBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoPipeDefinition> GetPipeDefinitions()
        {
            IQueryable<PipeDefinition> entity = _context.PipeDefinition.AsQueryable();
            IQueryable<DtoPipeDefinition> pipeDefinitions = _mapper.ProjectTo<DtoPipeDefinition>(entity);

            return pipeDefinitions;
        }



        public IQueryable<DtoPipeDefinition>? GetPipeDefinitionById(Guid id)
        {
            IQueryable<PipeDefinition>? pipeDefinition = _context.PipeDefinition.Where(x => x.PipeDefinitionId == id);
            if (pipeDefinition.Any())
            {
                IQueryable<DtoPipeDefinition> dtoPipeDefinition = _mapper.ProjectTo<DtoPipeDefinition>(pipeDefinition);
                return dtoPipeDefinition;
            }

            throw new KeyNotFoundException($"No PipeDefinition with ID {id} can be found.");
        }

      public bool CheckIfPipeDefinitionExists(DtoPipeDefinitionSearchParams dtoPipeDefinition)
      {
         // Check if any pipe definition in the database matches all the properties of the provided DtoPipeDefinition
         bool exists = _context.PipeDefinition.Any(pd =>
             pd.CategoryId == dtoPipeDefinition.CategoryId &&
             pd.CoatingId == dtoPipeDefinition.CoatingId &&
             pd.ConditionId == dtoPipeDefinition.ConditionId &&
             pd.GradeId == dtoPipeDefinition.GradeId &&
             pd.RangeId == dtoPipeDefinition.RangeId &&
             pd.SizeId == dtoPipeDefinition.SizeId &&
             pd.ThreadId == dtoPipeDefinition.ThreadId &&
             pd.WallId == dtoPipeDefinition.WallId &&
             pd.WeightId == dtoPipeDefinition.WeightId &&
             pd.IsActive == dtoPipeDefinition.IsActive
         );

         return exists;
      }

      public async Task<DtoPipeDefinition> CreatePipeDefinition(DtoPipeDefinitionCreate dtoPipeDefinitionCreate)
      {
         if (dtoPipeDefinitionCreate == null)
            throw new ArgumentNullException(nameof(dtoPipeDefinitionCreate), "Create PipeDefinition failed. The PipeDefinition data is null.");

         try
         {
            PipeDefinition pipeDefinition = _mapper.Map<PipeDefinition>(dtoPipeDefinitionCreate);
            pipeDefinition.PipeDefinitionId = Guid.NewGuid();
            _context.PipeDefinition.Add(pipeDefinition);

            // Log the data that is being saved
            var pipeDefinitionDetails = JsonConvert.SerializeObject(pipeDefinition);
            System.Diagnostics.Debug.WriteLine($"Attempting to create a new PipeDefinition with ID: {pipeDefinition.PipeDefinitionId} and details: {pipeDefinitionDetails}");

            await _context.SaveChangesAsync();

            return _mapper.Map<DtoPipeDefinition>(pipeDefinition);
         }
         catch (DbUpdateException dbEx)
         {
            // Log database update exceptions which might involve constraints, duplicate keys, etc.
            System.Diagnostics.Debug.WriteLine($"Database update exception: {dbEx.InnerException?.Message ?? dbEx.Message}");
            throw new Exception("Database update failed while creating PipeDefinition.", dbEx);
         }
         catch (Exception ex)
         {
            // Log any other exceptions that might occur
            System.Diagnostics.Debug.WriteLine($"An error occurred while creating a new PipeDefinition: {ex.Message}");
            throw new Exception("An error occurred while creating PipeDefinition.", ex);
         }
      }

      public void UpdatePipeDefinition(DtoPipeDefinitionUpdate dtoPipeDefinitionUpdate, Guid id)
        {
            PipeDefinition? pipeDefinition = _context.PipeDefinition.Find(id);

            if (pipeDefinition == null)
                throw new KeyNotFoundException($"No PipeDefinition with ID {id} can be found.");

            _mapper.Map<DtoPipeDefinitionUpdate, PipeDefinition>(dtoPipeDefinitionUpdate, pipeDefinition);
            _context.SaveChanges();
        }

        public void DisablePipeDefinition(Guid id)
        {
            PipeDefinition? pipeDefinition = _context.PipeDefinition.Find(id);

            if (pipeDefinition == null)
                throw new KeyNotFoundException($"No PipeDefinition with ID {id} can be found.");

            pipeDefinition.IsActive = false;
            _context.SaveChanges();
        }


    }
}
