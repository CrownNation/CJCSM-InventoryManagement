﻿using System;
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

namespace Inventory_BLL.BL
{
    public class TallyBL : ITallyBL
    {
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

        public IQueryable<DtoTally_WithPipeAndCustomer> GetTallies()
        {
            IQueryable<Tally> entity = _context.Tally.AsQueryable();
            IQueryable<DtoTally_WithPipeAndCustomer> tallies = _mapper.ProjectTo<DtoTally_WithPipeAndCustomer>(entity);
            return tallies;
        }


        public IQueryable<DtoTally_WithPipeAndCustomer> GetTallyById(Guid guid)
        {
            try
            {
                var dtoTallyQuery = from tally in _context.Tally
                                    where tally.TallyId == guid
                                    join customer in _context.Customer on tally.CustomerId equals customer.CustomerId
                                    join shopLocation in _context.ShopLocation on tally.ShopLocationId equals shopLocation.ShopLocationId
                                    select new
                                    {
                                        Tally = tally,
                                        Customer = customer,
                                        ShopLocation = shopLocation,
                                    };

                var dtoList = dtoTallyQuery.AsEnumerable().Select(data =>
                {
                    if (data == null)
                    {
                        System.Diagnostics.Debug.WriteLine("Data is null");
                        return null;
                    }

                    var dtoTally = new DtoTally_WithPipeAndCustomer
                    {
                        TallyId = data.Tally.TallyId,
                        TallyNumber = data.Tally.TallyNumber,
                        CustomerId = data.Customer.CustomerId,
                        CustomerName = data.Customer.Name,
                        ShopLocationId = data.ShopLocation.ShopLocationId,
                        ShopLocationName = data.ShopLocation.Name,
                        TallyType = (ApplicationEnums.TallyTypes)data.Tally.TallyType,
                        DateOfCreation = data.Tally.DateOfCreation,
                        Notes = data.Tally.Notes,
                        InvoiceNumber = data.Tally.InvoiceNumber,
                        TalliedByUserId = data.Tally.TalliedByUserId,
                        CarrierName = data.Tally.CarrierName,
                        PipeList = GetPipeList(data.Tally.TallyId)
                    };

                    decimal totalWeightInKg = 0m;
                    decimal totalWeightInLbs = 0m;

                    foreach (DtoPipe pipe in dtoTally.PipeList)
                    {
                        totalWeightInKg += pipe.Quantity * pipe.PipeDefinition.Weight.WeightInKgPerMeter * pipe.LengthInMeters;
                        totalWeightInLbs += pipe.Quantity * pipe.PipeDefinition.Weight.WeightInLbsPerFoot * pipe.LengthInFeet;
                    }
                    dtoTally.WeightInKg = (float)totalWeightInKg;
                    dtoTally.WeightInLbs = (float)totalWeightInLbs;

                    return dtoTally;
                }).Where(x => x != null).AsQueryable();


                return dtoList;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"An error occurred in GetTallyById: {ex.Message}");
                throw; // Rethrow the exception to let it propagate up the call stack
            }
        }


        private List<DtoPipe> GetPipeList(Guid tallyId)
        {
            var pipeQuery = from tp in _context.TallyPipe
                            where tp.TallyId == tallyId
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
                            select new
                            {
                                Pipe = p,
                                PipeDefinition = pd,
                                Tier = t,
                                Rack = r,
                                Category = ppc,
                                Condition = ppcon,
                                Grade = ppgr,
                                Range = ppr,
                                Size = pps,
                                Thread = ppt,
                                Wall = ppw,
                                Weight = ppwe
                            };

            var dtoPipeList = pipeQuery.Select(q => new DtoPipe
            {
                PipeId = q.Pipe.PipeId,
                RackId = q.Rack.RackId,
                RackName = q.Rack.Name,
                TierNumber = q.Tier.Number,
                PipeDefinition = new DtoPipeDefinition
                {
                    PipeDefinitionId = q.PipeDefinition.PipeDefinitionId,
                    CategoryId = q.PipeDefinition.CategoryId,
                    ConditionId = q.PipeDefinition.ConditionId,
                    GradeId = q.PipeDefinition.GradeId,
                    RangeId = q.PipeDefinition.RangeId,
                    SizeId = q.PipeDefinition.SizeId,
                    ThreadId = q.PipeDefinition.ThreadId,
                    WallId = q.PipeDefinition.WallId,
                    WeightId = q.PipeDefinition.WeightId,
                    Category = new PipeProperty_Category
                    {
                        PipeProperty_CategoryId = q.Category.PipeProperty_CategoryId,
                        Name = q.Category.Name
                    },
                    Condition = new PipeProperty_Condition
                    {
                        PipeProperty_ConditionId = q.Condition.PipeProperty_ConditionId,
                        Name = q.Condition.Name
                    },
                    Grade = new PipeProperty_Grade
                    {
                        PipeProperty_GradeId = q.Grade.PipeProperty_GradeId,
                        Name = q.Grade.Name
                    },
                    Range = new PipeProperty_Range
                    {
                        PipeProperty_RangeId = q.Range.PipeProperty_RangeId,
                        Name = q.Range.Name
                    },
                    Size = new PipeProperty_Size
                    {
                        PipeProperty_SizeId = q.Size.PipeProperty_SizeId,
                        SizeImperial = q.Size.SizeImperial,
                        SizeMetric = q.Size.SizeMetric
                    },
                    Thread = new PipeProperty_Thread
                    {
                        PipeProperty_ThreadId = q.Thread.PipeProperty_ThreadId,
                        Name = q.Thread.Name
                    },
                    Wall = new PipeProperty_Wall
                    {
                        PipeProperty_WallId = q.Wall.PipeProperty_WallId,
                        WallImperial = q.Wall.WallImperial,
                        WallMetric = q.Wall.WallMetric
                    },
                    Weight = new PipeProperty_Weight
                    {
                        PipeProperty_WeightId = q.Weight.PipeProperty_WeightId,
                        WeightInLbsPerFoot = q.Weight.WeightInLbsPerFoot,
                        WeightInKgPerMeter = q.Weight.WeightInKgPerMeter
                    }
                }
            }).ToList();

            return dtoPipeList;
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


        public void UpdateTally(DtoTallyUpdate dtoTallyUpdate, Guid guid)
        {
            Tally? tally = _context.Tally.Find(guid);

            if (tally == null)
                throw new KeyNotFoundException($"No tally with guid {guid} can be found.");

            _mapper.Map<DtoTallyUpdate, Tally>(dtoTallyUpdate, tally);
            _context.SaveChanges();
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
