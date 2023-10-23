using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CJCSM_Common;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;
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

        public IQueryable<DtoTally> GetTallies()
        {
            IQueryable<Tally> entity = _context.Tally.AsQueryable();
            IQueryable<DtoTally> tallies = _mapper.ProjectTo<DtoTally>(entity);
            return tallies;
        }

        public IQueryable<DtoTally> GetTallyById(Guid guid)
        {
            // 1. Create a query that gets the desired Tally without actually executing it.
            var tallyQuery = _context.Tally
                                     .Where(t => t.TallyId == guid)
                                     .Include(t => t.Customer)
                                     .Include(t => t.TallyPipes)
                                     .ThenInclude(tp => tp.Pipe)
                                     .ThenInclude(p => p.PipeDefinition); 

            // 2. Use the Select method to transform the data into the desired shape (DtoTally).
            var dtoTallyQuery = tallyQuery.Select(tally => new DtoTally
            {
                TallyId = tally.TallyId,
                TallyNumber = tally.TallyNumber,
                CustomerId = tally.CustomerId,
                CustomerName = tally.Customer.Name,
                /*Use this if we want to get the full customer.
                Customer = new DtoCustomer  // Assume you have a DtoCustomer DTO
                {
                    CustomerId = tally.Customer.CustomerId,
                    Name = tally.Customer.Name
                },*/

                ShopLocationId = tally.ShopLocationId,
                TallyType = (ApplicationEnums.TallyTypes)tally.TallyType,
                DateOfCreation = tally.DateOfCreation,
                Notes = tally.Notes,
                InvoiceNumber = tally.InvoiceNumber,
                TalliedByUserId = tally.TalliedByUserId,
//TODO: We have no user data in db yet.
//                TalliedByUserName = tally.TalliedByUserName,
                CarrierName = tally.CarrierName,
                WeightInKg = (float)tally.TallyPipes.Sum(tp => tp.Pipe.Quantity * tp.Pipe.LengthInMeters * tp.Pipe.PipeDefinition.Weight.WeightInKgPerMeter),
                WeightInLbs = (float)tally.TallyPipes.Sum(tp => tp.Pipe.Quantity * tp.Pipe.LengthInFeet * tp.Pipe.PipeDefinition.Weight.WeightInLbsPerFoot),
                PipeList = tally.TallyPipes.Select(tallyPipe => new DtoPipe
                {
                    PipeId = tallyPipe.Pipe.PipeId,
                    PipeDefinitionId = tallyPipe.Pipe.PipeDefinitionId,
                    PipeDefinition = new DtoPipeDefinition
                    {
                        PipeDefinitionId = tallyPipe.Pipe.PipeDefinition.PipeDefinitionId,
                        IsActive = tallyPipe.Pipe.PipeDefinition.IsActive,
                        CategoryId = tallyPipe.Pipe.PipeDefinition.CategoryId,
                        ConditionId = tallyPipe.Pipe.PipeDefinition.ConditionId,
                        GradeId = tallyPipe.Pipe.PipeDefinition.GradeId,
                        RangeId = tallyPipe.Pipe.PipeDefinition.RangeId,
                        SizeId = tallyPipe.Pipe.PipeDefinition.SizeId,
                        ThreadId = tallyPipe.Pipe.PipeDefinition.ThreadId,
                        WallId = tallyPipe.Pipe.PipeDefinition.WallId,
                        WeightId = tallyPipe.Pipe.PipeDefinition.WeightId,
                        Category = new PipeProperty_Category
                        {
                            PipeProperty_CategoryId = tallyPipe.Pipe.PipeDefinition.Category.PipeProperty_CategoryId,
                            Name = tallyPipe.Pipe.PipeDefinition.Category.Name
                        },
                        Condition = new PipeProperty_Condition
                        {
                            PipeProperty_ConditionId = tallyPipe.Pipe.PipeDefinition.Condition.PipeProperty_ConditionId,
                            Name = tallyPipe.Pipe.PipeDefinition.Condition.Name
                        },
                        Grade = new PipeProperty_Grade
                        {
                            PipeProperty_GradeId = tallyPipe.Pipe.PipeDefinition.Grade.PipeProperty_GradeId,
                            Name = tallyPipe.Pipe.PipeDefinition.Grade.Name
                        },
                        Range = new PipeProperty_Range
                        {
                            PipeProperty_RangeId = tallyPipe.Pipe.PipeDefinition.Range.PipeProperty_RangeId,
                            Name = tallyPipe.Pipe.PipeDefinition.Range.Name
                        },
                        Size = new PipeProperty_Size
                        {
                            PipeProperty_SizeId = tallyPipe.Pipe.PipeDefinition.Size.PipeProperty_SizeId,
                            SizeImperial = tallyPipe.Pipe.PipeDefinition.Size.SizeImperial,
                            SizeMetric = tallyPipe.Pipe.PipeDefinition.Size.SizeMetric
                        },
                        Thread = new PipeProperty_Thread
                        {
                            PipeProperty_ThreadId = tallyPipe.Pipe.PipeDefinition.Thread.PipeProperty_ThreadId,
                            Name = tallyPipe.Pipe.PipeDefinition.Thread.Name
                        },
                        Wall = new PipeProperty_Wall
                        {
                            PipeProperty_WallId = tallyPipe.Pipe.PipeDefinition.Wall.PipeProperty_WallId,
                            WallImperial = tallyPipe.Pipe.PipeDefinition.Wall.WallImperial,
                            WallMetric = tallyPipe.Pipe.PipeDefinition.Wall.WallMetric
                        },
                        Weight = new PipeProperty_Weight
                        {
                            PipeProperty_WeightId = tallyPipe.Pipe.PipeDefinition.Weight.PipeProperty_WeightId,
                            WeightInLbsPerFoot = tallyPipe.Pipe.PipeDefinition.Weight.WeightInLbsPerFoot,
                            WeightInKgPerMeter = tallyPipe.Pipe.PipeDefinition.Weight.WeightInKgPerMeter
                        }
                    },
                    TierId = tallyPipe.Pipe.TierId,
                    LengthInMeters = tallyPipe.Pipe.LengthInMeters,
                    LengthInFeet = tallyPipe.Pipe.LengthInFeet,
                    Quantity = tallyPipe.Pipe.Quantity
                }).ToList()
            });

            return dtoTallyQuery;
        }



        public async Task<DtoTally> CreateTally(DtoTallyCreate dtoTallyCreate)
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


            return _mapper.Map<DtoTally>(tally);
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
