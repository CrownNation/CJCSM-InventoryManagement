using Inventory_DAL.Entities; // Assuming Rack entity resides here
using AutoMapper;
using Inventory_Dto.Dto;
using Inventory_BLL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.IO.Pipelines;

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

        public async Task<IQueryable<DtoRack>> GetRackList()
        {
            var entity = _context.Rack
                                 .Include(r => r.ShopLocation)
                                 .OrderBy(r => r.ShopLocationId)
                                 // Order descending so we get 'pipe' before 'equipment'
                                 .ThenByDescending(r=>r.RackType)
                                 .ThenBy(r=>r.Name)
                                 .AsQueryable();

            var racks = _mapper.ProjectTo<DtoRack>(entity);
            return await Task.FromResult(racks);
        }

        public IQueryable<DtoRack?> GetRackById(Guid guid)
        {
            IQueryable<Rack>? rackQuery = _context.Rack.Where(x => x.RackId == guid);
            IQueryable<DtoRack> dtoRackQuery = _mapper.ProjectTo<DtoRack>(rackQuery);
            return dtoRackQuery;
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

        public async Task UpdateRack(DtoRackUpdate dtoRack, Guid guid)
        {
            Rack? rack = await _context.Rack.FindAsync(guid);

            if (rack == null)
                throw new KeyNotFoundException($"No rack with guid {guid} can be found.");

            _mapper.Map<DtoRackUpdate, Rack>(dtoRack, rack);
            await _context.SaveChangesAsync();
        }

        public void DeleteRack(Guid guid)
        {
            Rack? rack = _context.Rack.Find(guid); // Assuming Rack is the entity name

            if (rack == null)
                throw new KeyNotFoundException($"No rack with guid {guid} can be found.");

            _context.Rack.Remove(rack); // Assuming Rack is the entity name
            _context.SaveChanges();
        }

        public IQueryable<DtoRack_WithStock> GetRackWithPipeAndCustomerByRackId(Guid rackId)
        {

            var rackWithPipeQuery = from rack in _context.Rack
                                           join shopLocation in _context.ShopLocation on rack.ShopLocationId equals shopLocation.ShopLocationId
                                           where rack.RackId == rackId
                                           orderby rack.Name
                                           select new DtoRack_WithStock
                                           {
                                               Description = rack.Description,
                                               Name = rack.Name,
                                               RackId = rack.RackId,
                                               ShopLocationId = rack.ShopLocationId,
                                               IsActive = rack.IsActive,
                                               JointsPerTier = rack.JointsPerTier,
                                               ShopLocationName = shopLocation.Name,
                                               RackType = rack.RackType,
                                               PipeList = (from pipe in _context.Pipe
                                                           join tier in _context.Tier on pipe.TierId equals tier.TierId
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
                                                           where tier.RackId == rack.RackId
                                                           orderby rack.Name ascending, pipe.IndexOfPipe ascending
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
                                                           }).ToList()

                                           };


            return rackWithPipeQuery;
        }

        public IQueryable<DtoRack_WithStock> GetRackListWithStockAndCustomerByRackId(Guid rackId)
        {
            IQueryable<DtoRack_WithStock> rackWithStockQuery = from rack in _context.Rack
                                        join shopLocation in _context.ShopLocation on rack.ShopLocationId equals shopLocation.ShopLocationId
                                        where rack.RackId == rackId
                                        orderby rack.Name
                                        select new DtoRack_WithStock
                                        {
                                            Description = rack.Description,
                                            Name = rack.Name,
                                            RackId = rack.RackId,
                                            ShopLocationId = rack.ShopLocationId,
                                            IsActive = rack.IsActive,
                                            JointsPerTier = rack.JointsPerTier,
                                            ShopLocationName = shopLocation.Name,
                                            RackType = rack.RackType,
                                            PipeList = (rack.RackType == "Pipe") ? (
                                                from pipe in _context.Pipe
                                                join tier in _context.Tier on pipe.TierId equals tier.TierId
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
                                                where tier.RackId == rack.RackId
                                                orderby tier.Number ascending, pipe.IndexOfPipe ascending
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
                                                }).ToList() : new List<DtoPipe>(),
                                            EquipmentList = (rack.RackType == "Equipment") ? (
                                                from equipment in _context.Equipment
                                                //join customer in _context.Customer on equipment.CustomerId equals customer.CustomerId
                                                join ed in _context.EquipmentDefinition on equipment.EquipmentDefinitionId equals ed.EquipmentDefinitionId
                                                where equipment.RackId == rack.RackId
                                                select new DtoEquipment
                                                {
                                                    CustomerId = equipment.CustomerId,
                                                    EquipmentId = equipment.EquipmentId,
                                                    LengthInFeet = equipment.LengthInFeet,
                                                    LengthInMeters = equipment.LengthInMeters,
                                                    EquipmentDefinitionId = equipment.EquipmentDefinitionId,
                                                    Quantity = equipment.Quantity,
                                                    RackId = rack.RackId,
                                                    RackName = rack.Name,
                                                    EquipmentDefinition = new DtoEquipmentDefinition
                                                    {
                                                        EquipmentDefinitionId = ed.EquipmentDefinitionId,
                                                        PipeProperty_GradeId = ed.PipeProperty_GradeId,
                                                        Grade = ed.Grade,
                                                        PipeProperty_SizeId = ed.PipeProperty_SizeId,
                                                        Size = ed.Size,
                                                        Category = ed.Category,
                                                        Description = ed.Description,
                                                        Notes = ed.Notes,
                                                        IsActive = ed.IsActive
                                                    }
                                                }).ToList() : new List<DtoEquipment>()
                                        };

            return rackWithStockQuery;
        }

        public IQueryable<DtoRack_WithStock> GetRackListWithPipeAndCustomer()
        {
            var rackWithPipeQuery = from rack in _context.Rack
                                    join shopLocation in _context.ShopLocation on rack.ShopLocationId equals shopLocation.ShopLocationId
                                    orderby rack.ShopLocationId, rack.RackType descending, rack.Name
                                    select new DtoRack_WithStock
                                    {
                                        Description = rack.Description,
                                        Name = rack.Name,
                                        RackId = rack.RackId,
                                        ShopLocationId = rack.ShopLocationId,
                                        IsActive = rack.IsActive,
                                        JointsPerTier = rack.JointsPerTier,
                                        ShopLocationName = shopLocation.Name,
                                        RackType = rack.RackType,
                                        PipeList = (from pipe in _context.Pipe
                                                    join tier in _context.Tier on pipe.TierId equals tier.TierId
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
                                                    where tier.RackId == rack.RackId
                                                    orderby rack.Name ascending, pipe.IndexOfPipe ascending
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
                                                    }).ToList()
                                    };


            return rackWithPipeQuery;
        }

        public async Task<IQueryable<DtoRack_WithTier>> GetRackListWithTiers()
        {
            try
            {
                var rackWithTiersQuery = from rack in _context.Rack
                                         join shopLocation in _context.ShopLocation on rack.ShopLocationId equals shopLocation.ShopLocationId
                                         orderby rack.ShopLocationId, rack.RackType descending, rack.Name
                                         select new DtoRack_WithTier
                                         {
                                             RackId = rack.RackId,
                                             Name = rack.Name,
                                             ShopLocationId = rack.ShopLocationId,
                                             ShopLocationName = shopLocation.Name,
                                             IsActive = rack.IsActive,
                                             Description = rack.Description,
                                             JointsPeTier = rack.JointsPerTier,
                                             RackType = rack.RackType,
                                             TierList = (from tier in _context.Tier
                                                         where tier.RackId == rack.RackId
                                                         orderby tier.Number ascending
                                                         select new DtoTier_WithPipeInfo
                                                         {
                                                             TierId = tier.TierId,
                                                             RackId = tier.RackId,
                                                             Number = tier.Number,
                                                             PipeCount = _context.Pipe
                                                                         .Where(pipe => pipe.TierId == tier.TierId)
                                                                         .Sum(pipe => pipe.Quantity)
                                                         }).ToList()
                                         };

                return await Task.FromResult(rackWithTiersQuery);
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"An error occurred: {ex.Message}");
                throw; // Rethrow the exception to let it propagate up the call stack
            }
        }


    }
}
