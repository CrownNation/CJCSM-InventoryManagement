using AutoMapper;
using CJCSM_Common;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
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
                          orderby tally.DateOfCreation descending
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


      public DtoTally_WithPipeAndCustomer GetTallyWithPipeAndEquipmentByTallyId(Guid tallyId)
      {
         //Note: I tested this query and watched for DB call timing, and even though this query has internal .ToList() calls (which at a base level will trigger
         //the db call, the nested .ToList() does not trigger the db call.
         //var tallyQuery = from tally in _context.Tally
         //                 join customer in _context.Customer on tally.CustomerId equals customer.CustomerId
         //                 join shopLocation in _context.ShopLocation on tally.ShopLocationId equals shopLocation.ShopLocationId
         //                 where tally.TallyId == tallyId
         //                 orderby tally.DateOfCreation descending
         //                 select new DtoTally_WithPipeAndCustomer
         //                 {
         //                    CarrierName = tally.CarrierName,
         //                    CustomerId = tally.CustomerId,
         //                    CustomerName = customer.Name,
         //                    DateOfCreation = tally.DateOfCreation,
         //                    InvoiceNumber = tally.InvoiceNumber,
         //                    Notes = tally.Notes,
         //                    ShopLocationId = tally.ShopLocationId,
         //                    ShopLocationName = shopLocation.Name,
         //                    TalliedByUserId = tally.TalliedByUserId,
         //                    TallyId = tally.TallyId,
         //                    TallyNumber = tally.TallyNumber,
         //                    TallyType = (ApplicationEnums.TallyTypes)tally.TallyType,
         //                    PipeList = (from pipeForTally in _context.PipeForTally
         //                                join tier in _context.Tier on pipeForTally.TierId equals tier.TierId
         //                                join rack in _context.Rack on tier.RackId equals rack.RackId
         //                                join customer in _context.Customer on pipeForTally.CustomerId equals customer.CustomerId
         //                                join pd in _context.PipeDefinition on pipeForTally.PipeDefinitionId equals pd.PipeDefinitionId
         //                                join ppc in _context.PipeProperty_Category on pd.CategoryId equals ppc.PipeProperty_CategoryId
         //                                join ppco in _context.PipeProperty_Coating on pd.CoatingId equals ppco.PipeProperty_CoatingId
         //                                join ppcon in _context.PipeProperty_Condition on pd.ConditionId equals ppcon.PipeProperty_ConditionId
         //                                join ppgr in _context.PipeProperty_Grade on pd.GradeId equals ppgr.PipeProperty_GradeId
         //                                join ppr in _context.PipeProperty_Range on pd.RangeId equals ppr.PipeProperty_RangeId
         //                                join pps in _context.PipeProperty_Size on pd.SizeId equals pps.PipeProperty_SizeId
         //                                join ppt in _context.PipeProperty_Thread on pd.ThreadId equals ppt.PipeProperty_ThreadId
         //                                join ppw in _context.PipeProperty_Wall on pd.WallId equals ppw.PipeProperty_WallId
         //                                join ppwe in _context.PipeProperty_Weight on pd.WeightId equals ppwe.PipeProperty_WeightId
         //                                where pipeForTally.TallyId == tally.TallyId
         //                                select new DtoPipeForTally
         //                                {
         //                                   CustomerId = pipeForTally.CustomerId,
         //                                   TallyId = pipeForTally.TallyId,
         //                                   PipeForTallyId = pipeForTally.PipeForTallyId,
         //                                   IndexOfPipe = pipeForTally.IndexOfPipe,
         //                                   LengthInFeet = pipeForTally.LengthInMeters * 3.28084m,
         //                                   LengthInMeters = pipeForTally.LengthInMeters,
         //                                   TierId = pipeForTally.TierId,
         //                                   PipeDefinitionId = pipeForTally.PipeDefinitionId,
         //                                   Quantity = pipeForTally.Quantity,
         //                                   RackId = rack.RackId,
         //                                   RackName = rack.Name,
         //                                   TierNumber = tier.Number,
         //                                   PipeDefinition = new DtoPipeDefinition
         //                                   {
         //                                      PipeDefinitionId = pd.PipeDefinitionId,
         //                                      CategoryId = pd.CategoryId,
         //                                      CoatingId = pd.CoatingId,
         //                                      ConditionId = pd.ConditionId,
         //                                      GradeId = pd.GradeId,
         //                                      RangeId = pd.RangeId,
         //                                      SizeId = pd.SizeId,
         //                                      ThreadId = pd.ThreadId,
         //                                      WallId = pd.WallId,
         //                                      WeightId = pd.WeightId,
         //                                      Category = ppc,
         //                                      Coating = ppco,
         //                                      Condition = ppcon,
         //                                      Grade = ppgr,
         //                                      IsActive = pd.IsActive,
         //                                      Range = ppr,
         //                                      Size = pps,
         //                                      Thread = ppt,
         //                                      Wall = ppw,
         //                                      Weight = ppwe,
         //                                   }
         //                                }).ToList(),

         //                    EquipmentList = (from equipmentForTally in _context.EquipmentForTally
         //                                     join ed in _context.EquipmentDefinition on equipmentForTally.EquipmentDefinitionId equals ed.EquipmentDefinitionId
         //                                     join ppgr in _context.PipeProperty_Grade on ed.GradeId equals ppgr.PipeProperty_GradeId
         //                                     join pps in _context.PipeProperty_Size on ed.SizeId equals pps.PipeProperty_SizeId
         //                                     where equipmentForTally.TallyId == tally.TallyId
         //                                     select new DtoEquipmentForTally
         //                                     {
         //                                        CustomerId = equipmentForTally.CustomerId,
         //                                        TallyId = equipmentForTally.TallyId,
         //                                        EquipmentDefinitionId = equipmentForTally.EquipmentDefinitionId,
         //                                        EquipmentForTallyId = equipmentForTally.EquipmentForTallyId,
         //                                        LengthInFeet = equipmentForTally.LengthInMeters * 3.28084m,
         //                                        LengthInMeters = equipmentForTally.LengthInMeters,
         //                                        Quantity = equipmentForTally.Quantity,
         //                                        RackId = equipmentForTally.RackId,
         //                                        EquipmentDefinition = new DtoEquipmentDefinition
         //                                        {
         //                                           Category = ed.Category,
         //                                           Description = ed.Description,
         //                                           EquipmentDefinitionId = ed.EquipmentDefinitionId,
         //                                           IsActive = ed.IsActive,
         //                                           Notes = ed.Notes,
         //                                           GradeId = ed.GradeId,
         //                                           SizeId = ed.SizeId,
         //                                           Grade = ppgr,
         //                                           Size = pps
         //                                        }
         //                                     }).ToList(),
         //                    WeightInKg = (from pipeForTally in _context.PipeForTally
         //                                  join pd in _context.PipeDefinition on pipeForTally.PipeDefinitionId equals pd.PipeDefinitionId
         //                                  where pipeForTally.TallyId == tally.TallyId
         //                                  select pipeForTally.Quantity * pipeForTally.LengthInMeters * pd.Weight.WeightInKgPerMeter).Sum(),

         //                    WeightInLbs = (from pipeForTally in _context.PipeForTally
         //                                   join pd in _context.PipeDefinition on pipeForTally.PipeDefinitionId equals pd.PipeDefinitionId
         //                                   where pipeForTally.TallyId == tally.TallyId
         //                                   select pipeForTally.Quantity * pipeForTally.LengthInMeters * 3.28084m * pd.Weight.WeightInLbsPerFoot).Sum()
         //                 };

         //return tallyQuery;
         DtoTally_WithPipeAndCustomer? tallyInfo = (from tally in _context.Tally
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
                             TallyType = (ApplicationEnums.TallyTypes)tally.TallyType
                          }).FirstOrDefault();

         List<DtoPipeForTally> pipeList = (from pipeForTally in _context.PipeForTally
                         join tier in _context.Tier on pipeForTally.TierId equals tier.TierId
                         join rack in _context.Rack on tier.RackId equals rack.RackId
                         join pd in _context.PipeDefinition on pipeForTally.PipeDefinitionId equals pd.PipeDefinitionId
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
                            CustomerId = pipeForTally.CustomerId,
                            TallyId = pipeForTally.TallyId,
                            PipeForTallyId = pipeForTally.PipeForTallyId,
                            IndexOfPipe = pipeForTally.IndexOfPipe,
                            LengthInFeet = pipeForTally.LengthInMeters * 3.28084m,
                            LengthInMeters = pipeForTally.LengthInMeters,
                            TierId = pipeForTally.TierId,
                            PipeDefinitionId = pipeForTally.PipeDefinitionId,
                            Quantity = pipeForTally.Quantity,
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
                         }).ToList();

         List< DtoEquipmentForTally> equipmentList = (from equipmentForTally in _context.EquipmentForTally
                              join ed in _context.EquipmentDefinition on equipmentForTally.EquipmentDefinitionId equals ed.EquipmentDefinitionId
                              join ppgr in _context.PipeProperty_Grade on ed.GradeId equals ppgr.PipeProperty_GradeId
                              join pps in _context.PipeProperty_Size on ed.SizeId equals pps.PipeProperty_SizeId
                              where equipmentForTally.TallyId == tallyId
                              select new DtoEquipmentForTally
                              {
                                 CustomerId = equipmentForTally.CustomerId,
                                 TallyId = equipmentForTally.TallyId,
                                 EquipmentDefinitionId = equipmentForTally.EquipmentDefinitionId,
                                 EquipmentForTallyId = equipmentForTally.EquipmentForTallyId,
                                 LengthInFeet = equipmentForTally.LengthInMeters * 3.28084m,
                                 LengthInMeters = equipmentForTally.LengthInMeters,
                                 Quantity = equipmentForTally.Quantity,
                                 RackId = equipmentForTally.RackId,
                                 EquipmentDefinition = new DtoEquipmentDefinition
                                 {
                                    Category = ed.Category,
                                    Description = ed.Description,
                                    EquipmentDefinitionId = ed.EquipmentDefinitionId,
                                    IsActive = ed.IsActive,
                                    Notes = ed.Notes,
                                    GradeId = ed.GradeId,
                                    SizeId = ed.SizeId,
                                    Grade = ppgr,
                                    Size = pps
                                 }
                              }).ToList();

         tallyInfo.PipeList = pipeList;
         tallyInfo.EquipmentList = equipmentList;

         tallyInfo.WeightInKg = tallyInfo.PipeList.Sum(p=> p.Quantity * p.LengthInMeters * p.PipeDefinition.Weight.WeightInKgPerMeter);
         tallyInfo.WeightInLbs = tallyInfo.WeightInKg * 2.205m;

         return tallyInfo;
      }

      // There should be really no need to call this. This will get all tallies with all pipe and equipment. This is a lot of data.
      public IQueryable<DtoTally_WithPipeAndCustomer> GetTallyWithStockQuery()
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
                             PipeList = (from pft in _context.PipeForTally
                                         join tier in _context.Tier on pft.TierId equals tier.TierId
                                         join rack in _context.Rack on tier.RackId equals rack.RackId
                                         join customer in _context.Customer on pft.CustomerId equals customer.CustomerId
                                         join pd in _context.PipeDefinition on pft.PipeDefinitionId equals pd.PipeDefinitionId
                                         join ppc in _context.PipeProperty_Category on pd.CategoryId equals ppc.PipeProperty_CategoryId
                                         join ppco in _context.PipeProperty_Coating on pd.CoatingId equals ppco.PipeProperty_CoatingId
                                         join ppcon in _context.PipeProperty_Condition on pd.ConditionId equals ppcon.PipeProperty_ConditionId
                                         join ppgr in _context.PipeProperty_Grade on pd.GradeId equals ppgr.PipeProperty_GradeId
                                         join ppr in _context.PipeProperty_Range on pd.RangeId equals ppr.PipeProperty_RangeId
                                         join pps in _context.PipeProperty_Size on pd.SizeId equals pps.PipeProperty_SizeId
                                         join ppt in _context.PipeProperty_Thread on pd.ThreadId equals ppt.PipeProperty_ThreadId
                                         join ppw in _context.PipeProperty_Wall on pd.WallId equals ppw.PipeProperty_WallId
                                         join ppwe in _context.PipeProperty_Weight on pd.WeightId equals ppwe.PipeProperty_WeightId
                                         where pft.TallyId == tally.TallyId
                                         select new DtoPipeForTally
                                         {
                                            CustomerId = pft.CustomerId,
                                            TallyId = pft.TallyId,
                                            PipeForTallyId = pft.PipeForTallyId,
                                            IndexOfPipe = pft.IndexOfPipe,
                                            LengthInMeters = pft.LengthInMeters,
                                            TierId = pft.TierId,
                                            PipeDefinitionId = pft.PipeDefinitionId,
                                            Quantity = pft.Quantity,
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

                             EquipmentList = (from eft in _context.EquipmentForTally
                                              join ed in _context.EquipmentDefinition on eft.EquipmentDefinitionId equals ed.EquipmentDefinitionId
                                              join ppgr in _context.PipeProperty_Grade on ed.GradeId equals ppgr.PipeProperty_GradeId
                                              join pps in _context.PipeProperty_Size on ed.SizeId equals pps.PipeProperty_SizeId
                                              where eft.TallyId == tally.TallyId
                                              select new DtoEquipmentForTally
                                              {
                                                 CustomerId = eft.CustomerId,
                                                 TallyId = eft.TallyId,
                                                 EquipmentDefinitionId = eft.EquipmentDefinitionId,
                                                 EquipmentForTallyId = eft.EquipmentForTallyId,
                                                 LengthInMeters = eft.LengthInMeters,
                                                 Quantity = eft.Quantity,
                                                 RackId = eft.RackId,
                                                 EquipmentDefinition = new DtoEquipmentDefinition
                                                 {
                                                    Category = ed.Category,
                                                    Description = ed.Description,
                                                    EquipmentDefinitionId = ed.EquipmentDefinitionId,
                                                    IsActive = ed.IsActive,
                                                    Notes = ed.Notes,
                                                    GradeId = ed.GradeId,
                                                    SizeId = ed.SizeId,
                                                    Grade = ppgr,
                                                    Size = pps
                                                 }
                                              }).ToList(),
                             WeightInKg = (from pipeForTally in _context.PipeForTally
                                           join pft in _context.PipeForTally on pipeForTally.TallyId equals tally.TallyId
                                           join tier in _context.Tier on pipeForTally.TierId equals tier.TierId
                                           join pd in _context.PipeDefinition on pipeForTally.PipeDefinitionId equals pd.PipeDefinitionId
                                           where pft.TallyId == tally.TallyId
                                           select pipeForTally.Quantity * pipeForTally.LengthInMeters * pd.Weight.WeightInKgPerMeter).Sum(),

                             // 1 m = 3.28084 ft
                             WeightInLbs = (from pipeForTally in _context.PipeForTally
                                            join pft in _context.PipeForTally on pipeForTally.TallyId equals pft.TallyId
                                            join tier in _context.Tier on pipeForTally.TierId equals tier.TierId
                                            join pd in _context.PipeDefinition on pipeForTally.PipeDefinitionId equals pd.PipeDefinitionId
                                            where pft.TallyId == tally.TallyId
                                            select pipeForTally.Quantity * pipeForTally.LengthInMeters * 3.28084m * pd.Weight.WeightInLbsPerFoot).Sum()
                          };
         return tallyQuery;
      }

      public async Task<DtoTally_WithPipeAndCustomer> CreateTallyWithPipe(DtoTallyCreate tallyCreate)
      {
         if (tallyCreate.TallyType == TallyTypes.In)
            return await ProcessTallyIn(tallyCreate);
         else
            return await ProcessTallyOut(tallyCreate);

      }

      private async Task<DtoTally_WithPipeAndCustomer> ProcessTallyOut(DtoTallyCreate tallyCreate)
      {
         IQueryable<DtoRack_WithTier>? rackList = await _rackBL.GetPipeRackListWithTiers();
         List<DtoRack_WithTier> rackWithTierList = rackList.ToList();

         Tally tally = _mapper.Map<Tally>(tallyCreate);
         tally.TallyId = Guid.NewGuid();

         List<PipeForTally> pipeForTallyList = new List<PipeForTally>();
         List<EquipmentForTally> equipmentForTallyList = new List<EquipmentForTally>();

         foreach (DtoTier_WithPipe tierWithPipe in tallyCreate.TierWithPipeList)
         {
            foreach (DtoPipeCreate pipeCreate in tierWithPipe.PipeList)
            {
               Pipe pipe = MapPipe(pipeCreate);

               // Everything in a tally out exists as inventory on the rack.
               // We need to decrement the quantity of the pipe on the rack, and if we are moving all of it, remove the pipe, otherwise update the quantity.
               Pipe? existingPipe = _context.Pipe.Where(p => p.PipeId == pipeCreate.PipeId).FirstOrDefault();

               if (existingPipe == null)
                  throw new Exception("The pipe for the tally out could not be found in ProcessTallyOut. PipeID: " + pipeCreate.PipeId);

               if (existingPipe.Quantity == pipeCreate.Quantity)
               {
                  // Remove the pipe from the rack
                  _context.Pipe.Remove(existingPipe);

               }
               else
               {
                  // Update the quantity of the pipe on the rack
                  existingPipe.Quantity -= pipeCreate.Quantity;
               }

               pipeForTallyList.Add(CreatePipeForTally(pipe, tally.TallyId));
            }
         }

         // Handle equpment
         foreach (DtoEquipmentCreate equipmentCreate in tallyCreate.EquipmentList)
         {
            Equipment equipment = MapEquipment(equipmentCreate);

            // Find the equipment in the database
            Equipment? existingEquipment = _context.Equipment.Where(e => e.EquipmentId == equipmentCreate.EquipmentId).FirstOrDefault();
            if (existingEquipment == null)
               throw new Exception("The equipment for the tally out could not be found in ProcessTallyOut. EquipmentID: " + equipmentCreate.EquipmentId);

            if(existingEquipment.Quantity  == equipmentCreate.Quantity)
               {
               // Remove the equipment from the rack
               _context.Equipment.Remove(existingEquipment);
            }
            else
            {
               // Update the quantity of the equipment on the rack
               existingEquipment.Quantity -= equipmentCreate.Quantity;
            }

            equipmentForTallyList.Add(CreateEquipmentForTally(equipment, tally.TallyId));
         }


         using (var transaction = await _context.Database.BeginTransactionAsync())
         {
            try
            {
               _context.Tally.Add(tally);
               _context.PipeForTally.AddRange(pipeForTallyList);
               _context.EquipmentForTally.AddRange(equipmentForTallyList);

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


      private async Task<DtoTally_WithPipeAndCustomer> ProcessTallyIn(DtoTallyCreate tallyCreate)
      {
         IQueryable<DtoRack_WithTier>? rackList = await _rackBL.GetPipeRackListWithTiers();
         List<DtoRack_WithTier> rackWithTierList = rackList.ToList();

         Tally tally = _mapper.Map<Tally>(tallyCreate);
         tally.TallyId = Guid.NewGuid();

         List<TallyPipe> tallyPipeList = new List<TallyPipe>();
         List<Pipe> pipeList = new List<Pipe>();
         List<Tier> newTierList = new List<Tier>();
         List<PipeForTally> pipeForTallyList = new List<PipeForTally>();
         List<Equipment> equipmentList = new List<Equipment>();
         List<TallyEquipment> tallyEquipmentList = new List<TallyEquipment>();
         List<EquipmentForTally> equipmentForTallyList = new List<EquipmentForTally>();

         foreach (DtoTier_WithPipe tierWithPipe in tallyCreate.TierWithPipeList)
         {
            foreach (DtoPipeCreate pipeCreate in tierWithPipe.PipeList)
            {
               Pipe pipe = MapPipe(pipeCreate);

               DtoRack_WithTier? rackWithTier = rackWithTierList.FirstOrDefault(rack => rack.RackId == pipeCreate.RackId);

               DtoTier_WithPipeInfo? tierWithPipeInfo = rackWithTier?.TierList.FirstOrDefault(tier => tier.TierId == pipeCreate.TierId);

               if (tierWithPipeInfo == null)
               {
                  Tier t = CreateNewTier(pipeCreate, rackWithTier);
                  newTierList.Add(t);
                  pipe.IndexOfPipe = 1;
               }
               else
               {
                  UpdateTierWithPipe(tierWithPipeInfo, pipe, pipeCreate.Quantity);
               }

               pipeList.Add(pipe);
               pipeForTallyList.Add(CreatePipeForTally(pipe, tally.TallyId));
               tallyPipeList.Add(CreateTallyPipe(tally.TallyId, pipe.PipeId));
            }
         }

         // Handle equpment
         foreach (DtoEquipmentCreate equipmentCreate in tallyCreate.EquipmentList)
         {
            Equipment equipment = MapEquipment(equipmentCreate);
            equipmentList.Add(equipment);

            equipmentForTallyList.Add(CreateEquipmentForTally(equipment, tally.TallyId));
            tallyEquipmentList.Add(CreateTallyEquipment(tally.TallyId, equipment.EquipmentId));
         }


         using (var transaction = await _context.Database.BeginTransactionAsync())
         {
            try
            {
               _context.Tier.AddRange(newTierList);
               _context.Tally.Add(tally);
               _context.Pipe.AddRange(pipeList);
               _context.TallyPipe.AddRange(tallyPipeList);
               _context.PipeForTally.AddRange(pipeForTallyList);
               _context.Equipment.AddRange(equipmentList);
               _context.TallyEquipment.AddRange(tallyEquipmentList);
               _context.EquipmentForTally.AddRange(equipmentForTallyList);

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


      private Pipe MapPipe(DtoPipeCreate pipeCreate)
      {
         Pipe pipe = _mapper.Map<Pipe>(pipeCreate);
         pipe.PipeId = Guid.NewGuid();
         return pipe;
      }

      private Tier CreateNewTier(DtoPipeCreate pipeCreate, DtoRack_WithTier rackWithTier)
      {
         Tier t = new Tier
         {
            TierId = pipeCreate.TierId,
            RackId = pipeCreate.RackId,
            Number = pipeCreate.TierNumber
         };

         rackWithTier.TierList.Add(new DtoTier_WithPipeInfo
         {
            TierId = t.TierId,
            Number = t.Number,
            PipeCount = 0, // Initialize to 0 and increment later
            RackId = t.RackId
         });

         return t;
      }

      private void UpdateTierWithPipe(DtoTier_WithPipeInfo tierWithPipeInfo, Pipe pipe, int quantity)
      {
         pipe.IndexOfPipe = (tierWithPipeInfo.PipeCount == 0) ? 1 : tierWithPipeInfo.PipeCount + 1;
         tierWithPipeInfo.PipeCount += quantity;
      }

      private PipeForTally CreatePipeForTally(Pipe pipe, Guid tallyId)
      {
         return new PipeForTally
         {
            CustomerId = pipe.CustomerId,
            PipeDefinitionId = pipe.PipeDefinitionId,
            LengthInMeters = pipe.LengthInMeters,
            Quantity = pipe.Quantity,
            PipeForTallyId = Guid.NewGuid(),
            TallyId = tallyId,
            TierId = pipe.TierId,
            IndexOfPipe = pipe.IndexOfPipe
         };
      }

      private TallyPipe CreateTallyPipe(Guid tallyId, Guid pipeId)
      {
         return new TallyPipe
         {
            TallyId = tallyId,
            PipeId = pipeId
         };
      }

      private Equipment MapEquipment(DtoEquipmentCreate equipmentCreate)
      {
         Equipment equipment = _mapper.Map<Equipment>(equipmentCreate);
         equipment.EquipmentId = Guid.NewGuid();
         return equipment;
      }

      private EquipmentForTally CreateEquipmentForTally(Equipment equipment, Guid tallyId)
      {
         return new EquipmentForTally
         {
            CustomerId = equipment.CustomerId,
            EquipmentDefinitionId = equipment.EquipmentDefinitionId,
            LengthInMeters = equipment.LengthInMeters,
            Quantity = equipment.Quantity,
            EquipmentForTallyId = Guid.NewGuid(),
            TallyId = tallyId,
            RackId = equipment.RackId
         };
      }

      private TallyEquipment CreateTallyEquipment(Guid tallyId, Guid equipmentId)
      {
         return new TallyEquipment
         {
            TallyId = tallyId,
            EquipmentId = equipmentId
         };
      }

      //public async Task<DtoTally_WithPipeAndCustomer> CreateTallyWithPipe(DtoTallyCreate tallyCreate)
      //{
      //   if (tallyCreate.TallyType == TallyTypes.In)
      //      return await ProcessTallyIn(tallyCreate);
      //   else
      //      return await  ProcessTallyOut(tallyCreate);

      //}

      //private async Task<DtoTally_WithPipeAndCustomer> ProcessTallyOut(DtoTallyCreate tallyCreate)
      //{

      //}

      //private async Task<DtoTally_WithPipeAndCustomer> ProcessTallyIn(DtoTallyCreate tallyCreate)
      //{
      //   //Get get all of the racks and tiers for lookup.
      //   IQueryable<DtoRack_WithTier>? rackList = await _rackBL.GetRackListWithTiers();
      //   List<DtoRack_WithTier> rackWithTierList = rackList.ToList();

      //   // Create the Tally Object to get the TallyId that is required for the TallyPipe Object
      //   Tally tally = _mapper.Map<Tally>(tallyCreate);
      //   tally.TallyId = Guid.NewGuid();

      //   //Create the objects for insert
      //   List<TallyPipe> tallyPipeList = new List<TallyPipe>();
      //   List<Pipe> pipeList = new List<Pipe>();
      //   List<Equipment> equipmentList = new List<Equipment>();
      //   List<TallyEquipment> tallyEquipmentList = new List<TallyEquipment>();
      //   List<Tier> newTierList = new List<Tier>();
      //   List<PipeForTally> pipeForTallyList = new List<PipeForTally>();
      //   List<EquipmentForTally> equipmentForTallyList = new List<EquipmentForTally>();

      //   // For each incoming tier with pipe (pipe is always on a tier), we create the pipe model and assign the tierId for that pipe to
      //   // either an existing specified tier, the next empty tier on the rack that already exists, or create a new tier if all tiers are full.
      //   // We have pre-created tiers on the rack so we can make inserts more efficient, but we have a fail safe of creating a new tier if we ever actually
      //   // use all the tiers in the pool. We also create an entry into TallyPipe to link the pipe with this tally.
      //   foreach (DtoTier_WithPipe tierWithPipe in tallyCreate.TierWithPipeList)
      //   {
      //      // For each pipe group, create the pipe model object to insert the pipe.
      //      foreach (DtoPipeCreate pipeCreate in tierWithPipe.PipeList)
      //      {
      //         Pipe pipe = _mapper.Map<Pipe>(pipeCreate);
      //         pipe.PipeId = Guid.NewGuid();

      //         //Find the tier for this pipe in the racklist
      //         DtoTier_WithPipeInfo? tierWithPipeInfo = rackWithTierList
      //          .SelectMany(rack => rack.TierList)  // Flatten all tier lists into a single list
      //          .FirstOrDefault(tier => tier.TierId == pipeCreate.TierId);  // Find the first tier that matches the given TierId

      //         // If we don't have a tier from the db, then the user has created a new one, so we will add that to the database.
      //         if (tierWithPipeInfo == null)
      //         {
      //            Tier t = new Tier();
      //            t.TierId = tierWithPipe.TierId;
      //            t.RackId = pipeCreate.RackId;
      //            t.Number = pipeCreate.TierNumber;

      //            System.Diagnostics.Debug.WriteLine("Tier Number for NEW PIPE: " + pipeCreate.TierNumber);
      //            newTierList.Add(t);

      //            // This is a new tier, so we can set the indexOfPipe to 1
      //            // NOTE: This is NOT a zero-based index, so the first pipe on a tier will have an index of 1.
      //            // This is more of a pipe number that is to order pipe on a tier.
      //            pipe.IndexOfPipe = 1;

      //            //Also have to add this tier to the rackWithTierList in case other pipe in this tally also use this new tier.
      //            DtoRack_WithTier? rackWithTier = rackWithTierList.FirstOrDefault(rack => rack.RackId == pipeCreate.RackId);
      //            if (rackWithTier == null)
      //            {
      //               throw new Exception("There was a problem getting the rack with tier in CreateTallyWithPipe.");
      //            }
      //            DtoTier_WithPipeInfo dtoTier_WithPipeInfo = new DtoTier_WithPipeInfo
      //            {
      //               TierId = t.TierId,
      //               Number = t.Number,
      //               PipeCount = pipeCreate.Quantity,
      //               RackId = t.RackId
      //            };
      //            rackWithTier.TierList.Add(dtoTier_WithPipeInfo);

      //         }
      //         else
      //         {
      //            // We have a tier from the db, so we can assign the pipe to that tier. Just need to set the index in case there are already pipe on that tier.
      //            if (tierWithPipeInfo.PipeCount == 0)
      //               pipe.IndexOfPipe = 1;
      //            else
      //               pipe.IndexOfPipe = tierWithPipeInfo.PipeCount + 1;

      //            // Update the tierWithPipeInfo object to reflect the new pipe count.
      //            tierWithPipeInfo.PipeCount += pipeCreate.Quantity;

      //         }

      //         pipeList.Add(pipe);

      //         // Create the PipeForTally object for the tally history using the new tier.
      //         PipeForTally pipeForTally = new PipeForTally
      //         {
      //            CustomerId = pipe.CustomerId,
      //            PipeDefinitionId = pipe.PipeDefinitionId,
      //            LengthInMeters = pipe.LengthInMeters,
      //            Quantity = pipe.Quantity,
      //            PipeForTallyId = Guid.NewGuid(),
      //            TallyId = tally.TallyId,
      //            TierId = pipeCreate.TierId,
      //            IndexOfPipe = pipe.IndexOfPipe
      //         };

      //         pipeForTallyList.Add(pipeForTally);


      //         //Create TallyPipe entry to link the pipe to this tally.
      //         TallyPipe tallyPipe = new TallyPipe
      //         {
      //            TallyId = tally.TallyId,
      //            PipeId = pipe.PipeId
      //         };
      //         tallyPipeList.Add(tallyPipe);


      //      }

      //   }


      //   // Go through the equipment list and create the model for insert. Equipment belongs only to a rack, not a tier as well, so the process is a bit simpler.
      //   foreach (DtoEquipmentCreate equipmentCreate in tallyCreate.EquipmentList)
      //   {
      //      Equipment equipment = _mapper.Map<Equipment>(equipmentCreate);
      //      equipment.EquipmentId = Guid.NewGuid();
      //      equipmentList.Add(equipment);
      //      TallyEquipment tallyEquipment = new TallyEquipment
      //      {
      //         TallyId = tally.TallyId,
      //         EquipmentId = equipment.EquipmentId
      //      };
      //      tallyEquipmentList.Add(tallyEquipment);

      //      EquipmentForTally equipmentForTally = new EquipmentForTally
      //      {
      //         CustomerId = equipmentCreate.CustomerId,
      //         EquipmentDefinitionId = equipmentCreate.EquipmentDefinitionId,
      //         LengthInMeters = equipmentCreate.LengthInMeters,
      //         Quantity = equipmentCreate.Quantity,
      //         EquipmentForTallyId = Guid.NewGuid(),
      //         TallyId = tally.TallyId,
      //         RackId = equipmentCreate.RackId
      //      };
      //      equipmentForTallyList.Add(equipmentForTally);
      //   }

      //   // This is the actual transaction that inserts the Tally, Pipe, TallyPipe, Equipment, and TallyEquipment.
      //   using (var transaction = await _context.Database.BeginTransactionAsync())
      //   {
      //      try
      //      {
      //         // Add the entities to the context
      //         _context.Tier.AddRange(newTierList);
      //         _context.Tally.Add(tally);
      //         _context.Pipe.AddRange(pipeList);
      //         _context.TallyPipe.AddRange(tallyPipeList);
      //         _context.Equipment.AddRange(equipmentList);
      //         _context.TallyEquipment.AddRange(tallyEquipmentList);
      //         _context.PipeForTally.AddRange(pipeForTallyList);
      //         _context.EquipmentForTally.AddRange(equipmentForTallyList);

      //         // Save changes within the transaction
      //         await _context.SaveChangesAsync();

      //         transaction.Commit();

      //         return _mapper.Map<DtoTally_WithPipeAndCustomer>(tally);
      //      }
      //      catch (Exception ex)
      //      {
      //         transaction.Rollback();
      //         throw new Exception("Error creating Tally with Pipe: " + ex.Message);
      //      }
      //   }
      //}


      /* The assignment to tier functions aren't used anymore. The client now creates and selects tiers. These could be removed eventually */
      private static Guid AssignPipeToExistingEmptyTier(Pipe pipe, DtoTier_WithPipeInfo? firstEmptyTier)
      {
         if (firstEmptyTier == null)
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
         // When you want to search for a specific tier across all racks without concerning the specific rack it belongs to,
         // you need to transform this nested collection structure into a single list of tiers. This is exactly what .SelectMany accomplishes.
         // This is searching a list of racks, and each rack has a list of tiers, so we need to flatten the list of tiers to search across all tiers.
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
