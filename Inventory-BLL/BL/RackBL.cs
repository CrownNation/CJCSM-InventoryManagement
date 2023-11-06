using Inventory_DAL.Entities; // Assuming Rack entity resides here
using AutoMapper;
using Inventory_Dto.Dto;
using Inventory_BLL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Inventory_BLL.BL
{
    public class RackBL : IRackBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public RackBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoRack> GetRacks()
        {
            var entity = _context.Rack
                                 .Include(r => r.ShopLocation)
                                 .AsQueryable();

            var racks = _mapper.ProjectTo<DtoRack>(entity);
            return racks;
        }

        public async Task<DtoRack?> GetRackById(Guid guid)
        {
            // Eager load the associated ShopLocation
            var rack = await _context.Rack
                .Include(r => r.ShopLocation)
                .FirstOrDefaultAsync(x => x.RackId == guid);

            if (rack != null)
            {
                // Map the Rack entity to DtoRack
                var dtoRack = _mapper.Map<DtoRack>(rack);
                return dtoRack;
            }

            throw new KeyNotFoundException($"No rack with guid {guid} can be found.");
        }

        public async Task<DtoRack> CreateRack(DtoRackCreate dtoRack)
        {
            if (dtoRack == null)
                throw new ArgumentNullException("Create Rack failed. The rack data is null");
            if (String.IsNullOrEmpty(dtoRack.Name))
                throw new ArgumentNullException("Create Rack failed. The rack name cannot be null or empty.");

            Rack rack = _mapper.Map<Rack>(dtoRack);

            rack.RackId = Guid.NewGuid(); // If the database doesn't generate it
            _context.Rack.Add(rack); // Assuming Rack is the entity name
            await _context.SaveChangesAsync();

            return _mapper.Map<DtoRack>(rack);
        }



        public void UpdateRack(DtoRackUpdate dtoRack, Guid guid)
        {
            Rack? rack = _context.Rack.Find(guid); // Assuming Rack is the entity name

            if (rack == null)
                throw new KeyNotFoundException($"No rack with guid {guid} can be found.");

            _mapper.Map<DtoRackUpdate, Rack>(dtoRack, rack);
            _context.SaveChanges();
        }

        public void DeleteRack(Guid guid)
        {
            Rack? rack = _context.Rack.Find(guid); // Assuming Rack is the entity name

            if (rack == null)
                throw new KeyNotFoundException($"No rack with guid {guid} can be found.");

            _context.Rack.Remove(rack); // Assuming Rack is the entity name
            _context.SaveChanges();
        }

        public async Task<IQueryable<DtoRack_WithPipe>> GetRackListWithPipeAndCustomerByLocation(Guid shopLocationId)
        {
            try
            {
                var dtoCustomerWithPipeQuery = await( from rack in _context.Rack
                                               join shopLocation in _context.ShopLocation on rack.ShopLocationId equals shopLocation.ShopLocationId
                                               where rack.ShopLocationId == shopLocationId
                                               select new
                                               {
                                                   Rack = rack,
                                                   ShopName = shopLocation.Name, 
                                                   Pipes = (from pipe in _context.Pipe
                                                            join tier in _context.Tier on pipe.TierId equals tier.TierId
                                                            join customer in _context.Customer on pipe.CustomerId equals customer.CustomerId
                                                            join pd in _context.PipeDefinition on pipe.PipeDefinitionId equals pd.PipeDefinitionId
                                                            join ppc in _context.PipeProperty_Category on pd.CategoryId equals ppc.PipeProperty_CategoryId
                                                            join ppcon in _context.PipeProperty_Condition on pd.ConditionId equals ppcon.PipeProperty_ConditionId
                                                            join ppgr in _context.PipeProperty_Grade on pd.GradeId equals ppgr.PipeProperty_GradeId
                                                            join ppr in _context.PipeProperty_Range on pd.RangeId equals ppr.PipeProperty_RangeId
                                                            join pps in _context.PipeProperty_Size on pd.SizeId equals pps.PipeProperty_SizeId
                                                            join ppt in _context.PipeProperty_Thread on pd.ThreadId equals ppt.PipeProperty_ThreadId
                                                            join ppw in _context.PipeProperty_Wall on pd.WallId equals ppw.PipeProperty_WallId
                                                            join ppwe in _context.PipeProperty_Weight on pd.WeightId equals ppwe.PipeProperty_WeightId
                                                            where tier.RackId == rack.RackId
                                                            select new
                                                            {
                                                                Pipe = pipe,
                                                                PipeDefinition = pd,
                                                                Tier = tier,
                                                                Category = ppc,
                                                                Condition = ppcon,
                                                                Grade = ppgr,
                                                                Range = ppr,
                                                                Size = pps,
                                                                Thread = ppt,
                                                                Wall = ppw,
                                                                Weight = ppwe,
                                                                Customer = customer
                                                            }).ToList()
                                               }).ToListAsync();

                var dtoList = dtoCustomerWithPipeQuery.AsEnumerable().Select(data =>
                {
                    if (data == null)
                    {
                        System.Diagnostics.Debug.WriteLine("Data is null");
                        return null;
                    }

                    var dtoCustomerWithPipe = new DtoRack_WithPipe
                    {
                        RackId = data.Rack.RackId,
                        Name = data.Rack.Name,
                        ShopLocationId = data.Rack.ShopLocationId,
                        ShopLocationName = data.ShopName,
                        PipeList = data.Pipes.Select(pipeData => new DtoPipe
                        {
                            PipeId = pipeData.Pipe.PipeId,
                            CustomerId = pipeData.Pipe.CustomerId,
                            PipeDefinitionId = pipeData.Pipe.PipeDefinitionId,
                            TierId = pipeData.Pipe.TierId,
                            TierNumber = pipeData.Tier.Number,
                            LengthInFeet = pipeData.Pipe.LengthInFeet,
                            LengthInMeters = pipeData.Pipe.LengthInMeters,
                            Quantity = pipeData.Pipe.Quantity,
                            RackId = pipeData.Tier.RackId,
                            RackName = data.Rack.Name,
                            PipeDefinition = new DtoPipeDefinition
                            {
                                PipeDefinitionId = pipeData.PipeDefinition.PipeDefinitionId,
                                CategoryId = pipeData.PipeDefinition.CategoryId,
                                ConditionId = pipeData.PipeDefinition.ConditionId,
                                GradeId = pipeData.PipeDefinition.GradeId,
                                RangeId = pipeData.PipeDefinition.RangeId,
                                SizeId = pipeData.PipeDefinition.SizeId,
                                ThreadId = pipeData.PipeDefinition.ThreadId,
                                WallId = pipeData.PipeDefinition.WallId,
                                WeightId = pipeData.PipeDefinition.WeightId,
                                Category = pipeData.PipeDefinition.Category,
                                Condition = pipeData.PipeDefinition.Condition,
                                Grade = pipeData.PipeDefinition.Grade,
                                Range = pipeData.PipeDefinition.Range,
                                Size = pipeData.PipeDefinition.Size,
                                Thread = pipeData.PipeDefinition.Thread,
                                Wall = pipeData.PipeDefinition.Wall,
                                Weight = pipeData.PipeDefinition.Weight
                            }
                        }).ToList()

                    };

                    return dtoCustomerWithPipe;
                }).Where(x => x != null).AsQueryable();

                // Check if the resulting list is empty
                if (!dtoList.Any())
                {
                    return Enumerable.Empty<DtoRack_WithPipe>().AsQueryable();
                }

                return dtoList.Where(item => item != null).Cast<DtoRack_WithPipe>().AsQueryable();
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"An error occurred in GetCustomerWithPipeById: {ex.Message}");
                throw; // Rethrow the exception to let it propagate up the call stack
            }

        }
    }
}
