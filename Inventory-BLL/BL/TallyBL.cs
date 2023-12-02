using System;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CJCSM_Common;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;
using Inventory_Models.Dto;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using static CJCSM_Common.ApplicationEnums;

namespace Inventory_BLL.BL
{
    public class TallyBL : ITallyBL
    {
        public int test;

        private readonly InventoryContext _context;
        private readonly IMapper _mapper;
        private readonly IPipeBL _pipeBL;
        private readonly ITallyPipeBL _tallyPipeBL;

        public TallyBL(InventoryContext context, IMapper mapper, IPipeBL pipeBL, ITallyPipeBL tallyPipeBL)
        {
            _context = context;
            _mapper = mapper;
            _pipeBL = pipeBL;
            _tallyPipeBL = tallyPipeBL;
        }

        public async Task<IQueryable<DtoTally_WithPipeAndCustomer>> GetTallies()
        {
            var tallyQuery = from tally in _context.Tally
                             join customer in _context.Customer on tally.CustomerId equals customer.CustomerId
                             join shopLocation in _context.ShopLocation on tally.ShopLocationId equals shopLocation.ShopLocationId
                             select new DtoTally_WithPipeAndCustomer
                             {
                                 CustomerId = tally.CustomerId,
                                 CarrierName = tally.CarrierName,
                                 CustomerName = customer.Name,
                                 DateOfCreation = tally.DateOfCreation,
                                 InvoiceNumber = tally.InvoiceNumber,
                                 Notes = tally.Notes,
                                 ShopLocationId = tally.ShopLocationId,
                                 ShopLocationName = shopLocation.Name,
                                 TallyId = tally.TallyId,
                                 TalliedByUserId = tally.TalliedByUserId,
                                 TallyNumber = tally.TallyNumber,
                                 TallyType = (TallyTypes)tally.TallyType,
                             };


            return await Task.FromResult(tallyQuery);
        }

        public async Task<DtoTally_WithPipeAndCustomer> GetTallyById(Guid guid)
        {
            var tallyQuery = from tally in _context.Tally
                             where tally.TallyId == guid
                             join customer in _context.Customer on tally.CustomerId equals customer.CustomerId
                             join shopLocation in _context.ShopLocation on tally.ShopLocationId equals shopLocation.ShopLocationId
                             select new
                             {
                                 Tally = tally,
                                 Customer = customer,
                                 ShopLocation = shopLocation
                             };

            var tallyResult = await tallyQuery.AsNoTracking().FirstOrDefaultAsync();

            if (tallyResult == null)
            {
                return null; // Handle the case where the Tally is not found.
            }

            var pipeQuery = from tp in _context.TallyPipe
                            where tp.TallyId == tallyResult.Tally.TallyId
                            join p in _context.Pipe on tp.PipeId equals p.PipeId
                            join pd in _context.PipeDefinition on p.PipeDefinitionId equals pd.PipeDefinitionId
                            join t in _context.Tier on p.TierId equals t.TierId
                            join r in _context.Rack on t.RackId equals r.RackId
                            join ppc in _context.PipeProperty_Category on pd.CategoryId equals ppc.PipeProperty_CategoryId
                            join ppcon in _context.PipeProperty_Condition on pd.ConditionId equals ppcon.PipeProperty_ConditionId
                            join ppgr in _context.PipeProperty_Grade on pd.GradeId equals ppgr.PipeProperty_GradeId
                            join ppr in _context.PipeProperty_Range on pd.RangeId equals ppr.PipeProperty_RangeId
                            join pps in _context.PipeProperty_Size on pd.SizeId equals pps.PipeProperty_SizeId
                            join ppt in _context.PipeProperty_Thread on pd.ThreadId equals ppt.PipeProperty_ThreadId
                            join ppw in _context.PipeProperty_Wall on pd.WallId equals ppw.PipeProperty_WallId
                            join ppwe in _context.PipeProperty_Weight on pd.WeightId equals ppwe.PipeProperty_WeightId
                            orderby p.IndexOfPipe ascending
                            select new DtoPipe
                            {
                                PipeId = p.PipeId,
                                CustomerId = p.CustomerId,
                                PipeDefinitionId = pd.PipeDefinitionId,
                                TierId = t.TierId,
                                TierNumber = t.Number,
                                LengthInFeet = p.LengthInFeet,
                                LengthInMeters = p.LengthInMeters,
                                Quantity = p.Quantity,
                                RackId = t.RackId,
                                RackName = r.Name,
                                IndexOfPipe = p.IndexOfPipe,
                                PipeDefinition = new DtoPipeDefinition
                                {
                                    PipeDefinitionId = pd.PipeDefinitionId,
                                    CategoryId = pd.CategoryId,
                                    ConditionId = pd.ConditionId,
                                    GradeId = pd.GradeId,
                                    RangeId = pd.RangeId,
                                    SizeId = pd.SizeId,
                                    ThreadId = pd.ThreadId,
                                    WallId = pd.WallId,
                                    WeightId = pd.WeightId,
                                    Category = ppc,
                                    Condition = ppcon,
                                    Grade = ppgr,
                                    Range = ppr,
                                    Size = pps,
                                    Thread = ppt,
                                    Wall = ppw,
                                    Weight = ppwe
                                }
                            };

            var pipeList = await pipeQuery.AsNoTracking().ToListAsync();

            var returnTally = new DtoTally_WithPipeAndCustomer
            {
                TallyId = tallyResult.Tally.TallyId,
                TallyNumber = tallyResult.Tally.TallyNumber,
                CustomerId = tallyResult.Customer.CustomerId,
                CustomerName = tallyResult.Customer.Name,
                ShopLocationId = tallyResult.ShopLocation.ShopLocationId,
                ShopLocationName = tallyResult.ShopLocation.Name,
                TallyType = (ApplicationEnums.TallyTypes)tallyResult.Tally.TallyType,
                DateOfCreation = tallyResult.Tally.DateOfCreation,
                Notes = tallyResult.Tally.Notes,
                InvoiceNumber = tallyResult.Tally.InvoiceNumber,
                TalliedByUserId = tallyResult.Tally.TalliedByUserId,
                CarrierName = tallyResult.Tally.CarrierName,
                PipeList = pipeList,
                WeightInKg = pipeList.Sum(tp => tp.Quantity * tp.LengthInMeters * tp.PipeDefinition.Weight.WeightInKgPerMeter),
                WeightInLbs = pipeList.Sum(tp => tp.Quantity * tp.LengthInFeet * tp.PipeDefinition.Weight.WeightInLbsPerFoot),
            };


            foreach (DtoPipe pipe in returnTally.PipeList)
            {

            }

            return returnTally;
        }

        public async Task<DtoTally_WithPipeAndCustomer> CreateTally(DtoTallyCreate dtoTallyCreate)
        {
            if (dtoTallyCreate == null)
                throw new ArgumentNullException("Create Tally failed. The tally data is null");

            // Create Tally
            Tally tally = _mapper.Map<Tally>(dtoTallyCreate);
            tally.TallyId = Guid.NewGuid();
            tally.DateOfCreation = DateTimeOffset.Now;
            _context.Tally.Add(tally);
            await _context.SaveChangesAsync();


            if (dtoTallyCreate.PipeList != null && dtoTallyCreate.PipeList.Count > 0)
            {
                foreach (var pipeItem in dtoTallyCreate.PipeList)
                {
                    // Map to DtoPipeCreate for inserting Pipe
                    DtoPipeCreate dtoPipeCreate = _mapper.Map<DtoPipeCreate>(pipeItem);
                    DtoPipe dtoPipe = await _pipeBL.CreatePipe(dtoPipeCreate);

                    // Create the TallyPipe
                    DtoTallyPipe dtoTallyPipe = new DtoTallyPipe
                    {
                        TallyId = tally.TallyId,
                        PipeId = dtoPipe.PipeId
                    };

                    await _tallyPipeBL.CreateTallyPipe(dtoTallyPipe);
                }
            }


            return _mapper.Map<DtoTally_WithPipeAndCustomer>(tally);
        }

        public async Task<DtoTally_WithPipeAndCustomer> CreateTallyWithPipe(DtoTallyCreate tallyWithPipe)
        {
            //TODO: If the incoming TierId != null, then we get the existing tier and we get the startingPipeindex instead of totalTiersInRack

            //Get number of tiers in rack
            int totalTiersInRack = _context.Tier.Count(t => t.RackId == tallyWithPipe.RackId);

            // Get next tier without any pipe on it.
            Tier? firstTierWithoutPipe = (from t1 in _context.Tier
                                    join r1 in _context.Rack on t1.RackId equals r1.RackId
                                    where r1.RackId == tallyWithPipe.RackId
                                    && !_context.Pipe.Any(p2 => p2.TierId == t1.TierId)
                                    orderby t1.Number
                                    select t1).FirstOrDefault();

            Tier tier;
            int startingPipeIndex = 1;

            if (firstTierWithoutPipe == null)
            {
                System.Diagnostics.Debug.WriteLine("No Tiers without pipes found. Creating new Tier");
                tier = new Tier();
                tier.TierId = Guid.NewGuid();
                tier.Number = totalTiersInRack + 1;
                tier.RackId = tallyWithPipe.RackId;
                _context.Tier.Add(tier);
                await _context.SaveChangesAsync();
            }
            else
            {
                tier = firstTierWithoutPipe;
                tier.Number = firstTierWithoutPipe.Number;
                tier.TierId = firstTierWithoutPipe.TierId;
                tier.RackId = firstTierWithoutPipe.RackId;
            }

            System.Diagnostics.Debug.WriteLine("NEXT TIER: " + tier.TierId + " TierNumber: " + tier.Number);

            // Create the Tally Object to get the TallyId that is required for the TallyPipe Object
            Tally tally = _mapper.Map<Tally>(tallyWithPipe);
            tally.TallyId = Guid.NewGuid();

            int currentPipeIndex = startingPipeIndex;
            List<TallyPipe> tallyPipeList = new List<TallyPipe>();

            List<Pipe> pipeList = new List<Pipe>();

            foreach (DtoPipeCreate pipeCreate in tallyWithPipe.PipeList)
            {
                Pipe pipe = _mapper.Map<Pipe>(pipeCreate);
                pipe.PipeId = Guid.NewGuid();
                pipe.TierId = tier.TierId;
                pipe.IndexOfPipe = currentPipeIndex;

                pipeList.Add(pipe);

                currentPipeIndex++;

                TallyPipe tallyPipe = new TallyPipe
                {
                    TallyId = tally.TallyId,
                    PipeId = pipe.PipeId
                };
                tallyPipeList.Add(tallyPipe);

                System.Diagnostics.Debug.WriteLine("PipeIndex: " + pipe.IndexOfPipe);
            }

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    // Your existing code for getting Tier information and creating Tally here...

                    // Add the entities to the context
                    _context.Tally.Add(tally);
                    _context.Pipe.AddRange(pipeList);
                    _context.TallyPipe.AddRange(tallyPipeList);

                    // Save changes within the transaction
                    await _context.SaveChangesAsync();

                    // Commit the transaction if everything succeeds
                    transaction.Commit();

                    return _mapper.Map<DtoTally_WithPipeAndCustomer>(tally);
                }
                catch (Exception ex)
                {
                    // Handle exceptions here, and if any exception occurs, the transaction will be rolled back
                    transaction.Rollback();
                    throw new Exception("Error creating Tally with Pipe: " + ex.Message);
                }
            }

        }
  


    public async Task UpdateTally(DtoTallyUpdate dtoTallyUpdate, Guid guid)
    {
        Tally? tally = await _context.Tally.FindAsync(guid);

        if (tally == null)
            throw new KeyNotFoundException($"No tally with guid {guid} can be found.");

        _mapper.Map<DtoTallyUpdate, Tally>(dtoTallyUpdate, tally);
        await _context.SaveChangesAsync();
    }

    public void DeleteTally(Guid guid)
    {
        Tally? tally = _context.Tally.Find(guid);

        if (tally == null)
            throw new KeyNotFoundException($"No tally with guid {guid} can be found.");

        _context.Tally.Remove(tally);
        _context.SaveChanges();
    }

}
}
