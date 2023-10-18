using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CJCSM_Common;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
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
                                     .Include(t => t.TallyPipes)
                                     .ThenInclude(tp => tp.Pipe)
                                     .ThenInclude(p => p.PipeDefinition); ;

            // 2. Use the Select method to transform the data into the desired shape (DtoTally).
            var dtoTallyQuery = tallyQuery.Select(tally => new DtoTally
            {
                TallyId = tally.TallyId,
                TallyNumber = tally.TallyNumber,
                CustomerId = tally.CustomerId,
//                CustomerName = tally.CustomerName,
                ShopLocationId = tally.ShopLocationId,
                TallyType = (ApplicationEnums.TallyTypes)tally.TallyType,
                DateOfCreation = tally.DateOfCreation,
                Notes = tally.Notes,
                InvoiceNumber = tally.InvoiceNumber,
                TalliedByUserId = tally.TalliedByUserId,
//                TalliedByUserName = tally.TalliedByUserName,
                CarrierName = tally.CarrierName,

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
                        WeightId = tallyPipe.Pipe.PipeDefinition.WeightId
                    },
                    TierId = tallyPipe.Pipe.TierId,
                    Length = tallyPipe.Pipe.Length,
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
