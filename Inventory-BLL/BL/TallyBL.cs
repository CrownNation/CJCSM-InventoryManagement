using AutoMapper;
using CJCSM_Common;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Documents;
using Inventory_Dto.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Xml.Linq;
using static CJCSM_Common.ApplicationEnums;

namespace Inventory_BLL.BL
{
    public class TallyBL : ITallyBL
    {
        public int test;

        private readonly InventoryContext _context;
        private readonly IMapper _mapper;
        private readonly IPipeBL _pipeBL;
        private readonly IRackBL _rackBL;
        private readonly ITallyPipeBL _tallyPipeBL;

        public TallyBL(InventoryContext context, IMapper mapper, IPipeBL pipeBL, ITallyPipeBL tallyPipeBL, IRackBL rackBL)
        {
            _context = context;
            _mapper = mapper;
            _pipeBL = pipeBL;
            _tallyPipeBL = tallyPipeBL;
            _rackBL = rackBL;
        }

        public IQueryable<DtoTally_WithPipeAndCustomer> GetTallies()
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


            return tallyQuery;
        }


        public IQueryable<DtoTally_WithPipeAndCustomer> GetTallyWithPipeAndEquipmentByIdQuery(Guid tallyId)
        {
            //Note: I tested this query and watched for DB call timing, and even though this query has internal .ToList() calls (which at a base level will trigger
            //the db call, the nested .ToList() does not trigger the db call.
            var tallyQuery = from tally in _context.Tally
                             join customer in _context.Customer on tally.CustomerId equals customer.CustomerId
                             join shopLocation in _context.ShopLocation on tally.ShopLocationId equals shopLocation.ShopLocationId
                             where tally.TallyId == tallyId
                             orderby tally.DateOfCreation descending
                             select new DtoTally_WithPipeAndCustomer
                             {
                                 CarrierName = tally.CarrierName,
                                 CustomerId = tally.CustomerId,
                                 CustomerName = customer.Name,
                                 DateOfCreation = tally.DateOfCreation,
                                 InvoiceNumber = tally.InvoiceNumber,
                                 Notes = tally.Notes,
                                 ShopLocationId = tally.ShopLocationId,
                                 ShopLocationName = shopLocation.Name,
                                 TalliedByUserId = tally.TalliedByUserId,
                                 TallyId = tally.TallyId,
                                 TallyNumber = tally.TallyNumber,
                                 TallyType = (ApplicationEnums.TallyTypes)tally.TallyType,
                                 PipeList = (from pipe in _context.Pipe
                                             join tp in _context.TallyPipe on pipe.PipeId equals tp.PipeId
                                             join tier in _context.Tier on pipe.TierId equals tier.TierId
                                             join rack in _context.Rack on tier.RackId equals rack.RackId
                                             join customer in _context.Customer on pipe.CustomerId equals customer.CustomerId
                                             join pd in _context.PipeDefinition on pipe.PipeDefinitionId equals pd.PipeDefinitionId
                                             join ppc in _context.PipeProperty_Category on pd.CategoryId equals ppc.PipeProperty_CategoryId
                                             join ppco in _context.PipeProperty_Coating on pd.CoatingId equals ppco.PipeProperty_CoatingId
                                             join ppcon in _context.PipeProperty_Condition on pd.ConditionId equals ppcon.PipeProperty_ConditionId
                                             join ppgr in _context.PipeProperty_Grade on pd.GradeId equals ppgr.PipeProperty_GradeId
                                             join ppr in _context.PipeProperty_Range on pd.RangeId equals ppr.PipeProperty_RangeId
                                             join pps in _context.PipeProperty_Size on pd.SizeId equals pps.PipeProperty_SizeId
                                             join ppt in _context.PipeProperty_Thread on pd.ThreadId equals ppt.PipeProperty_ThreadId
                                             join ppw in _context.PipeProperty_Wall on pd.WallId equals ppw.PipeProperty_WallId
                                             join ppwe in _context.PipeProperty_Weight on pd.WeightId equals ppwe.PipeProperty_WeightId
                                             where tp.TallyId == tally.TallyId
                                             select new DtoPipe
                                             {
                                                 CustomerId = pipe.CustomerId,
                                                 PipeId = pipe.PipeId,
                                                 IndexOfPipe = pipe.IndexOfPipe,
                                                 LengthInFeet = pipe.LengthInFeet,
                                                 LengthInMeters = pipe.LengthInMeters,
                                                 TierId = pipe.TierId,
                                                 PipeDefinitionId = pipe.PipeDefinitionId,
                                                 Quantity = pipe.Quantity,
                                                 RackId = rack.RackId,
                                                 RackName = rack.Name,
                                                 TierNumber = tier.Number,
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
                                                     IsActive = pd.IsActive,
                                                     Range = ppr,
                                                     Size = pps,
                                                     Thread = ppt,
                                                     Wall = ppw,
                                                     Weight = ppwe,
                                                 }
                                             }).ToList(),

                                 EquipmentList = (from equipment in _context.Equipment
                                                  join te in _context.TallyEquipment on equipment.EquipmentId equals te.EquipmentId
                                                  join ed in _context.EquipmentDefinition on equipment.EquipmentDefinitionId equals ed.EquipmentDefinitionId
                                                  join ppgr in _context.PipeProperty_Grade on ed.PipeProperty_GradeId equals ppgr.PipeProperty_GradeId
                                                  join pps in _context.PipeProperty_Size on ed.PipeProperty_SizeId equals pps.PipeProperty_SizeId
                                                  where te.TallyId == tally.TallyId
                                                  select new DtoEquipment
                                                  {
                                                      CustomerId = equipment.CustomerId,
                                                      EquipmentDefinitionId = equipment.EquipmentDefinitionId,
                                                      EquipmentId = equipment.EquipmentId,
                                                      LengthInFeet = equipment.LengthInFeet,
                                                      LengthInMeters = equipment.LengthInMeters,
                                                      Quantity = equipment.Quantity,
                                                      RackId = equipment.RackId,
                                                      EquipmentDefinition = new DtoEquipmentDefinition
                                                      {
                                                          Category = ed.Category,
                                                          Description = ed.Description,
                                                          EquipmentDefinitionId = ed.EquipmentDefinitionId,
                                                          IsActive = ed.IsActive,
                                                          Notes = ed.Notes,
                                                          PipeProperty_GradeId = ed.PipeProperty_GradeId,
                                                          PipeProperty_SizeId = ed.PipeProperty_SizeId,
                                                          Grade = ppgr,
                                                          Size = pps
                                                      }
                                                  }).ToList(),
                                 WeightInKg = (from pipe in _context.Pipe
                                               join tp in _context.TallyPipe on pipe.PipeId equals tp.PipeId
                                               join tier in _context.Tier on pipe.TierId equals tier.TierId
                                               join pd in _context.PipeDefinition on pipe.PipeDefinitionId equals pd.PipeDefinitionId
                                               where tp.TallyId == tally.TallyId
                                               select pipe.Quantity * pipe.LengthInMeters * pd.Weight.WeightInKgPerMeter).Sum(),

                                 WeightInLbs = (from pipe in _context.Pipe
                                                join tp in _context.TallyPipe on pipe.PipeId equals tp.PipeId
                                                join tier in _context.Tier on pipe.TierId equals tier.TierId
                                                join pd in _context.PipeDefinition on pipe.PipeDefinitionId equals pd.PipeDefinitionId
                                                where tp.TallyId == tally.TallyId
                                                select pipe.Quantity * pipe.LengthInFeet * pd.Weight.WeightInLbsPerFoot).Sum()
                             };

            return tallyQuery;
        }

        public IQueryable<DtoTally_WithPipeAndCustomer> GetTallyWithPipeQuery()
        {
            var tallyQuery = from tally in _context.Tally
                             join customer in _context.Customer on tally.CustomerId equals customer.CustomerId
                             join shopLocation in _context.ShopLocation on tally.ShopLocationId equals shopLocation.ShopLocationId
                             orderby tally.DateOfCreation descending
                             select new DtoTally_WithPipeAndCustomer
                             {
                                 CarrierName = tally.CarrierName,
                                 CustomerId = tally.CustomerId,
                                 CustomerName = customer.Name,
                                 DateOfCreation = tally.DateOfCreation,
                                 InvoiceNumber = tally.InvoiceNumber,
                                 Notes = tally.Notes,
                                 ShopLocationId = tally.ShopLocationId,
                                 ShopLocationName = shopLocation.Name,
                                 TalliedByUserId = tally.TalliedByUserId,
                                 TallyId = tally.TallyId,
                                 TallyNumber = tally.TallyNumber,
                                 TallyType = (ApplicationEnums.TallyTypes)tally.TallyType,
                                 PipeList = (from pipe in _context.Pipe
                                             join tp in _context.TallyPipe on pipe.PipeId equals tp.PipeId
                                             join tier in _context.Tier on pipe.TierId equals tier.TierId
                                             join rack in _context.Rack on tier.RackId equals rack.RackId
                                             join customer in _context.Customer on pipe.CustomerId equals customer.CustomerId
                                             join pd in _context.PipeDefinition on pipe.PipeDefinitionId equals pd.PipeDefinitionId
                                             join ppc in _context.PipeProperty_Category on pd.CategoryId equals ppc.PipeProperty_CategoryId
                                             join ppco in _context.PipeProperty_Coating on pd.CoatingId equals ppco.PipeProperty_CoatingId
                                             join ppcon in _context.PipeProperty_Condition on pd.ConditionId equals ppcon.PipeProperty_ConditionId
                                             join ppgr in _context.PipeProperty_Grade on pd.GradeId equals ppgr.PipeProperty_GradeId
                                             join ppr in _context.PipeProperty_Range on pd.RangeId equals ppr.PipeProperty_RangeId
                                             join pps in _context.PipeProperty_Size on pd.SizeId equals pps.PipeProperty_SizeId
                                             join ppt in _context.PipeProperty_Thread on pd.ThreadId equals ppt.PipeProperty_ThreadId
                                             join ppw in _context.PipeProperty_Wall on pd.WallId equals ppw.PipeProperty_WallId
                                             join ppwe in _context.PipeProperty_Weight on pd.WeightId equals ppwe.PipeProperty_WeightId
                                             where tp.TallyId == tally.TallyId
                                             select new DtoPipe
                                             {
                                                 CustomerId = pipe.CustomerId,
                                                 PipeId = pipe.PipeId,
                                                 IndexOfPipe = pipe.IndexOfPipe,
                                                 LengthInFeet = pipe.LengthInFeet,
                                                 LengthInMeters = pipe.LengthInMeters,
                                                 TierId = pipe.TierId,
                                                 PipeDefinitionId = pipe.PipeDefinitionId,
                                                 Quantity = pipe.Quantity,
                                                 RackId = rack.RackId,
                                                 RackName = rack.Name,
                                                 TierNumber = tier.Number,
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
                                                     IsActive = pd.IsActive,
                                                     Range = ppr,
                                                     Size = pps,
                                                     Thread = ppt,
                                                     Wall = ppw,
                                                     Weight = ppwe,
                                                 }
                                             }).ToList(),

                                 EquipmentList = (from equipment in _context.Equipment
                                                  join te in _context.TallyEquipment on equipment.EquipmentId equals te.EquipmentId
                                                  join ed in _context.EquipmentDefinition on equipment.EquipmentDefinitionId equals ed.EquipmentDefinitionId
                                                  join ppgr in _context.PipeProperty_Grade on ed.PipeProperty_GradeId equals ppgr.PipeProperty_GradeId
                                                  join pps in _context.PipeProperty_Size on ed.PipeProperty_SizeId equals pps.PipeProperty_SizeId
                                                  where te.TallyId == tally.TallyId
                                                  select new DtoEquipment
                                                  {
                                                      CustomerId = equipment.CustomerId,
                                                      EquipmentDefinitionId = equipment.EquipmentDefinitionId,
                                                      EquipmentId = equipment.EquipmentId,
                                                      LengthInFeet = equipment.LengthInFeet,
                                                      LengthInMeters = equipment.LengthInMeters,
                                                      Quantity = equipment.Quantity,
                                                      RackId = equipment.RackId,
                                                      EquipmentDefinition = new DtoEquipmentDefinition
                                                      {
                                                          Category = ed.Category,
                                                          Description = ed.Description,
                                                          EquipmentDefinitionId = ed.EquipmentDefinitionId,
                                                          IsActive = ed.IsActive,
                                                          Notes = ed.Notes,
                                                          PipeProperty_GradeId = ed.PipeProperty_GradeId,
                                                          PipeProperty_SizeId = ed.PipeProperty_SizeId,
                                                          Grade = ppgr,
                                                          Size = pps
                                                      }
                                                  }).ToList(),
                                 WeightInKg = (from pipe in _context.Pipe
                                               join tp in _context.TallyPipe on pipe.PipeId equals tp.PipeId
                                               join tier in _context.Tier on pipe.TierId equals tier.TierId
                                               join pd in _context.PipeDefinition on pipe.PipeDefinitionId equals pd.PipeDefinitionId
                                               where tp.TallyId == tally.TallyId
                                               select pipe.Quantity * pipe.LengthInMeters * pd.Weight.WeightInKgPerMeter).Sum(),

                                 WeightInLbs = (from pipe in _context.Pipe
                                                join tp in _context.TallyPipe on pipe.PipeId equals tp.PipeId
                                                join tier in _context.Tier on pipe.TierId equals tier.TierId
                                                join pd in _context.PipeDefinition on pipe.PipeDefinitionId equals pd.PipeDefinitionId
                                                where tp.TallyId == tally.TallyId
                                                select pipe.Quantity * pipe.LengthInFeet * pd.Weight.WeightInLbsPerFoot).Sum()
                             };
            return tallyQuery;
        }

        public async Task<DtoTally_WithPipeAndCustomer> CreateTallyWithPipe(DtoTallyCreate tallyCreate)
        {
            //Get get all of the racks and tiers for lookup.
            IQueryable<DtoRack_WithTier>? rackList = await _rackBL.GetRackListWithTiers();
            List<DtoRack_WithTier> rackWithTierList = rackList.ToList();

            // Create the Tally Object to get the TallyId that is required for the TallyPipe Object
            Tally tally = _mapper.Map<Tally>(tallyCreate);
            tally.TallyId = Guid.NewGuid();

            //Create the objects for insert
            List<TallyPipe> tallyPipeList = new List<TallyPipe>();
            List<Pipe> pipeList = new List<Pipe>();
            List<Equipment> equipmentList = new List<Equipment>();
            List<TallyEquipment> tallyEquipmentList = new List<TallyEquipment>();

            // For each incoming tier with pipe (pipe is always on a tier), we create the pipe model and assign the tierId for that pipe to
            // either an existing specified tier, the next empty tier on the rack that already exists, or create a new tier if all tiers are empty.
            // We have pre-created tiers on the rack so we can make inserts more efficient, but we have a fail safe of creating a new tier if we ever actually use all the tiers in the pool.
            // We also create an entry into TallyPipe to link the pipe with this tally.
            foreach(DtoTier_WithPipe tierWithPipe in tallyCreate.TierWithPipeList)
            {
                // For each pipe, create the pipe model object to insert the pipe.
                foreach (DtoPipeCreate pipeCreate in tierWithPipe.PipeList)
                {
                    Pipe pipe = _mapper.Map<Pipe>(pipeCreate);
                    pipe.PipeId = Guid.NewGuid();
                    //Ignore any TierId that the pipe has since we are going to group based on what the user has set as the tier.
                    pipe.TierId = tierWithPipe.TierId;
                    pipeCreate.TierId = tierWithPipe.TierId;
                    //If the incoming TierId != Guid.Empty, then we get the existing tier and we get the info from that object.
                    if (tierWithPipe.TierId != Guid.Empty)
                    {
                        AssignPipeToExistingNonEmptyTier(rackWithTierList, pipeCreate, pipe);
                    }
                    else if (tierWithPipe.TierId == Guid.Empty)
                    {
                        // Get the first tier that has no pipes.
                        DtoTier_WithPipeInfo? firstEmptyTier = rackWithTierList
                            .Where(rack => rack.RackId == pipeCreate.RackId)
                            .SelectMany(rack => rack.TierList)
                            .OrderBy(tier => tier.Number)
                            .FirstOrDefault(tier => tier.PipeCount == 0);


                        // If there are no tiers without pipes, then create a new tier.
                        if (firstEmptyTier == null)
                        {
                            //Assign the tier to the new Id so we can use it for other pipe on this tier that may follow.
                            //In effect, we only create a new tier for the first pipe in the tier, the rest will use this tier.
                            tierWithPipe.TierId = await AssignPipeToNewTier(rackWithTierList, pipeCreate, pipe);
                            
                        }
                        else
                        {
                            //Assign the tier to the Id of the first empty tier so we can use it for other pipe on this tier that may follow.
                            //In effect, we only get an empty tier for the first pipe in the tier, the rest will use this tier.
                            tierWithPipe.TierId = AssignPipeToExistingEmptyTier(pipe, firstEmptyTier);
                        }
                    }

                    pipeList.Add(pipe);

                    //Create TallyPipe entry to link the pipe to this tally.
                    TallyPipe tallyPipe = new TallyPipe
                    {
                        TallyId = tally.TallyId,
                        PipeId = pipe.PipeId
                    };
                    tallyPipeList.Add(tallyPipe);
                }

            }

            // Go through the equipment list and create the model for insert. Equipment belongs only to a rack, not a tier as well, so the process is a bit simpler.
            foreach(DtoEquipmentCreate equipmentCreate in tallyCreate.EquipmentList)
            {
                Equipment equipment = _mapper.Map<Equipment>(equipmentCreate);
                equipment.EquipmentId = Guid.NewGuid();
                equipmentList.Add(equipment);

                TallyEquipment tallyEquipment = new TallyEquipment
                {
                    TallyId = tally.TallyId,
                    EquipmentId = equipment.EquipmentId
                };
                tallyEquipmentList.Add(tallyEquipment);
            }


            // This is the actual transaction that inserts the Tally, Pipe, TallyPipe, Equipment, and TallyEquipment.
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    // Add the entities to the context
                    _context.Tally.Add(tally);
                    _context.Pipe.AddRange(pipeList);
                    _context.TallyPipe.AddRange(tallyPipeList);
                    _context.Equipment.AddRange(equipmentList);
                    _context.TallyEquipment.AddRange(tallyEquipmentList);

                    // Save changes within the transaction
                    await _context.SaveChangesAsync();

                    transaction.Commit();

                    return _mapper.Map<DtoTally_WithPipeAndCustomer>(tally);
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw new Exception("Error creating Tally with Pipe: " + ex.Message);
                }
            }

        }

        private static Guid AssignPipeToExistingEmptyTier(Pipe pipe, DtoTier_WithPipeInfo? firstEmptyTier)
        {
            if(firstEmptyTier == null)
            {
                throw new Exception("There was a problem getting the first empty tier in CreateTallyWithPipe.");
            }
            pipe.TierId = firstEmptyTier.TierId;
            pipe.IndexOfPipe = firstEmptyTier.PipeCount + 1;
            firstEmptyTier.PipeCount += pipe.Quantity;
            return firstEmptyTier.TierId;
        }

        private async Task<Guid> AssignPipeToNewTier(List<DtoRack_WithTier> rackWithTierList, DtoPipeCreate pipeCreate, Pipe pipe)
        {
            System.Diagnostics.Debug.WriteLine("No Tiers without pipes found. Creating new Tier");
            Tier tier = new Tier();
            tier.TierId = Guid.NewGuid();

            // Get the rack.
            DtoRack_WithTier? rackWithTier = rackWithTierList.FirstOrDefault(rack => rack.RackId == pipeCreate.RackId);
            if (rackWithTier == null)
            {
                throw new Exception("There was a problem getting the rack with tier in CreateTallyWithPipe.");
            }
            tier.Number = rackWithTier.TierList.Count + 1;
            tier.RackId = rackWithTier.RackId;

            _context.Tier.Add(tier);
            await _context.SaveChangesAsync();
            pipe.TierId = tier.TierId;
            pipe.IndexOfPipe = 1;

            //Add new tier to the rackWithPipeList so we can find it later if more pipe is added to this tier.
            DtoTier_WithPipeInfo dtoTier_WithPipeInfo = new DtoTier_WithPipeInfo
            {
                TierId = tier.TierId,
                Number = tier.Number,
                PipeCount = pipe.Quantity,
                RackId = tier.RackId
            };
            rackWithTier.TierList.Add(dtoTier_WithPipeInfo);


            return tier.TierId;
        }

        private static void AssignPipeToExistingNonEmptyTier(List<DtoRack_WithTier> rackWithTierList, DtoPipeCreate pipeCreate, Pipe pipe)
        {
            DtoTier_WithPipeInfo? tierWithPipeInfo = rackWithTierList
                .SelectMany(rack => rack.TierList)
                .FirstOrDefault(tier => tier.TierId == pipeCreate.TierId);
            if (tierWithPipeInfo == null)
            {
                throw new Exception("There was a problem getting the tier with pipe info in CreateTallyWithPipe.");
            }
            pipe.TierId = tierWithPipeInfo.TierId;
            pipe.IndexOfPipe = tierWithPipeInfo.PipeCount + 1;
            tierWithPipeInfo.PipeCount += pipe.Quantity;
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
