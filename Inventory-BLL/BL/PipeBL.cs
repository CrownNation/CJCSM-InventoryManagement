using AutoMapper;
using Inventory_BLL.BL;
using Inventory_DAL.Entities;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;
using Inventory_Models.Dto;

namespace Inventory_BLL.Interfaces
{
    public class PipeBL : IPipeBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public PipeBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoPipe> GetPipes()
        {
            IQueryable<Pipe> entity = _context.Pipe.AsQueryable();
            IQueryable<DtoPipe> pipes = _mapper.ProjectTo<DtoPipe>(entity);
            return pipes;
        }

        public IQueryable<DtoPipe>? GetPipeById(Guid guid)
        {
            IQueryable<Pipe>? pipe = _context.Pipe.Where(x => x.PipeId == guid);
            if (pipe.Any())
            {
                IQueryable<DtoPipe> dtoPipe = _mapper.ProjectTo<DtoPipe>(pipe);
                return dtoPipe;
            }

            throw new KeyNotFoundException($"No pipe with guid {guid} can be found.");
        }

        public async Task<DtoPipe> CreatePipe(DtoPipeCreate dtoPipeCreate)
        {
            if (dtoPipeCreate == null)
                throw new ArgumentNullException("Create Pipe failed. The pipe data is null");

            Pipe pipe = _mapper.Map<Pipe>(dtoPipeCreate);

            pipe.PipeId = Guid.NewGuid();
            _context.Pipe.Add(pipe);
            await _context.SaveChangesAsync();

            return _mapper.Map<DtoPipe>(pipe);
        }

        public void UpdatePipe(DtoPipeUpdate dtoPipeUpdate, Guid guid)
        {
            Pipe? pipe = _context.Pipe.Find(guid);

            if (pipe == null)
                throw new KeyNotFoundException($"No pipe with guid {guid} can be found.");

            _mapper.Map<DtoPipeUpdate, Pipe>(dtoPipeUpdate, pipe);
            _context.SaveChanges();
        }

        public void DeletePipe(Guid guid)
        {
            Pipe? pipe = _context.Pipe.Find(guid);

            if (pipe == null)
                throw new KeyNotFoundException($"No pipe with guid {guid} can be found.");

            _context.Pipe.Remove(pipe);
            _context.SaveChanges();
        }

        public Task<IQueryable<DtoPipe>> GetPipeWithDefinitionList()
        {
            try
            {
                var pipeQuery = from pipe in _context.Pipe
                                join pd in _context.PipeDefinition on pipe.PipeDefinitionId equals pd.PipeDefinitionId
                                join t in _context.Tier on pipe.TierId equals t.TierId
                                join r in _context.Rack on t.RackId equals r.RackId
                                join ppc in _context.PipeProperty_Category on pd.CategoryId equals ppc.PipeProperty_CategoryId
                                join ppcon in _context.PipeProperty_Condition on pd.ConditionId equals ppcon.PipeProperty_ConditionId
                                join ppgr in _context.PipeProperty_Grade on pd.GradeId equals ppgr.PipeProperty_GradeId
                                join ppr in _context.PipeProperty_Range on pd.RangeId equals ppr.PipeProperty_RangeId
                                join pps in _context.PipeProperty_Size on pd.SizeId equals pps.PipeProperty_SizeId
                                join ppt in _context.PipeProperty_Thread on pd.ThreadId equals ppt.PipeProperty_ThreadId
                                join ppw in _context.PipeProperty_Wall on pd.WallId equals ppw.PipeProperty_WallId
                                join ppwe in _context.PipeProperty_Weight on pd.WeightId equals ppwe.PipeProperty_WeightId
                                select new DtoPipe
                                {
                                    PipeId = pipe.PipeId,
                                    CustomerId = pipe.CustomerId,
                                    PipeDefinitionId = pipe.PipeDefinitionId,
                                    TierId = pipe.TierId,
                                    LengthInMeters = pipe.LengthInMeters,
                                    LengthInFeet = pipe.LengthInFeet,
                                    Quantity = pipe.Quantity,
                                    IndexOfPipe = pipe.IndexOfPipe,
                                    RackId = t.RackId,
                                    RackName = r.Name,
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
                                        Category = new PipeProperty_Category { PipeProperty_CategoryId = ppc.PipeProperty_CategoryId, Name = ppc.Name },
                                        Condition = new PipeProperty_Condition { PipeProperty_ConditionId = ppcon.PipeProperty_ConditionId, Name = ppcon.Name },
                                        Grade = new PipeProperty_Grade { PipeProperty_GradeId = ppgr.PipeProperty_GradeId, Name = ppgr.Name },
                                        Range = new PipeProperty_Range { PipeProperty_RangeId = ppr.PipeProperty_RangeId, Name = ppr.Name },
                                        Size = new PipeProperty_Size { PipeProperty_SizeId = pps.PipeProperty_SizeId, SizeImperial = pps.SizeImperial, SizeMetric = pps.SizeMetric },
                                        Thread = new PipeProperty_Thread { PipeProperty_ThreadId = ppt.PipeProperty_ThreadId, Name = ppt.Name },
                                        Wall = new PipeProperty_Wall { PipeProperty_WallId = ppw.PipeProperty_WallId, WallImperial = ppw.WallImperial, WallMetric = ppw.WallMetric },
                                        Weight = new PipeProperty_Weight { PipeProperty_WeightId = ppwe.PipeProperty_WeightId, WeightInKgPerMeter = ppwe.WeightInKgPerMeter, WeightInLbsPerFoot = ppwe.WeightInLbsPerFoot }
                                    }
                                };

                return Task.FromResult(pipeQuery);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"An error occurred in GetCustomerWithPipeById: {ex.Message}");
                throw; // Rethrow the exception to let it propagate up the call stack
            }
        }
    }
}
