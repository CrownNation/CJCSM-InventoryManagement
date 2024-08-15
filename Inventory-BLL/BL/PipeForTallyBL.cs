using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Inventory_Models.Dto;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory_BLL.BL
{
   public class PipeForTallyBL : IPipeForTallyBL
   {
      private readonly InventoryContext _context;
      private readonly IMapper _mapper;

      public PipeForTallyBL(InventoryContext context, IMapper mapper)
      {
         _context = context;
         _mapper = mapper;
      }

      public IQueryable<DtoPipeForTally> GetPipesForTally()
      {
         IQueryable<PipeForTally> entity = _context.PipeForTally.AsQueryable();
         IQueryable<DtoPipeForTally> pipesForTally = _mapper.ProjectTo<DtoPipeForTally>(entity);
         return pipesForTally;
      }

      public IQueryable<DtoPipeForTally>? GetPipeForTallyByTallyId(Guid tallyId)
      {
         IQueryable<PipeForTally>? pipeForTally = _context.PipeForTally.Where(x => x.TallyId == tallyId);
         IQueryable<DtoPipeForTally> dtoPipeForTally = _mapper.ProjectTo<DtoPipeForTally>(pipeForTally);
         return dtoPipeForTally;
      }

      public async Task<DtoPipeForTally> CreatePipeForTally(DtoPipeForTallyCreate dtoPipeForTallyCreate)
      {
         if (dtoPipeForTallyCreate == null)
            throw new ArgumentNullException("Create PipeForTally failed. The pipe data is null");

         PipeForTally pipeForTally = _mapper.Map<PipeForTally>(dtoPipeForTallyCreate);

         pipeForTally.PipeForTallyId = Guid.NewGuid();
         _context.PipeForTally.Add(pipeForTally);
         await _context.SaveChangesAsync();

         return _mapper.Map<DtoPipeForTally>(pipeForTally);
      }


      public void DeletePipeForTally(Guid guid)
      {
         PipeForTally? pipeForTally = _context.PipeForTally.Find(guid);

         if (pipeForTally == null)
            throw new KeyNotFoundException($"No pipe for tally with guid {guid} can be found.");

         _context.PipeForTally.Remove(pipeForTally);
         _context.SaveChanges();
      }

      public Task<IQueryable<DtoPipeForTally>> GetPipeForTallyWithDefinitionListByTallyId(Guid tallyId)
      {
         try
         {
            var pipeForTallyQuery = from pipeForTally in _context.PipeForTally
                                    join pd in _context.PipeDefinition on pipeForTally.PipeDefinitionId equals pd.PipeDefinitionId
                                    join t in _context.Tier on pipeForTally.TierId equals t.TierId
                                    join r in _context.Rack on t.RackId equals r.RackId
                                    join ppc in _context.PipeProperty_Category on pd.CategoryId equals ppc.PipeProperty_CategoryId
                                    join ppco in _context.PipeProperty_Coating on pd.CoatingId equals ppco.PipeProperty_CoatingId
                                    join ppcon in _context.PipeProperty_Condition on pd.ConditionId equals ppcon.PipeProperty_ConditionId
                                    join ppgr in _context.PipeProperty_Grade on pd.GradeId equals ppgr.PipeProperty_GradeId
                                    join ppr in _context.PipeProperty_Range on pd.RangeId equals ppr.PipeProperty_RangeId
                                    join pps in _context.PipeProperty_Size on pd.SizeId equals pps.PipeProperty_SizeId
                                    join ppt in _context.PipeProperty_Thread on pd.ThreadId equals ppt.PipeProperty_ThreadId
                                    join ppw in _context.PipeProperty_Wall on pd.WallId equals ppw.PipeProperty_WallId
                                    join ppwe in _context.PipeProperty_Weight on pd.WeightId equals ppwe.PipeProperty_WeightId
                                    where pipeForTally.TallyId == tallyId
                                    select new DtoPipeForTally
                                    {
                                       TallyId = pipeForTally.TallyId,
                                       PipeForTallyId = pipeForTally.PipeForTallyId,
                                       CustomerId = pipeForTally.CustomerId,
                                       PipeDefinitionId = pipeForTally.PipeDefinitionId,
                                       TierId = pipeForTally.TierId,
                                       TierNumber = t.Number,
                                       LengthInMeters = pipeForTally.LengthInMeters,
                                       Quantity = pipeForTally.Quantity,
                                       IndexOfPipe = pipeForTally.IndexOfPipe,
                                       RackId = t.RackId,
                                       RackName = r.Name,
                                       PipeDefinition = new DtoPipeDefinition
                                       {
                                          PipeDefinitionId = pd.PipeDefinitionId,
                                          CategoryId = pd.CategoryId,
                                          CoatingId = pd.CoatingId,
                                          ConditionId = pd.ConditionId,
                                          GradeId = pd.GradeId,
                                          RangeId = pd.RangeId,
                                          SizeId = pd.SizeId,
                                          ThreadId = pd.ThreadId,
                                          WallId = pd.WallId,
                                          WeightId = pd.WeightId,
                                          Category = ppc,
                                          Coating = ppco,
                                          Condition = ppcon,
                                          Grade = ppgr,
                                          Range = ppr,
                                          Size = pps,
                                          Thread = ppt,
                                          Wall = ppw,
                                          Weight = ppwe
                                       }
                                    };

            return Task.FromResult(pipeForTallyQuery);
         }
         catch (Exception ex)
         {
            System.Diagnostics.Debug.WriteLine($"An error occurred in GetPipeForTallyWithDefinitionList: {ex.Message}");
            throw; // Rethrow the exception to let it propagate up the call stack
         }
      }
   }
}
