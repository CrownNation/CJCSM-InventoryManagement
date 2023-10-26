using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CJCSM_Common;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;
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

        /*
        public IQueryable<DtoTally_WithPipeAndCustomer> GetTallyById(Guid guid)
        {
            // 1. Create a query that gets the desired Tally without actually executing it.
            var tallyQuery = _context.Tally
                                     .Where(t => t.TallyId == guid)
                                     .Include(t => t.Customer)
                                     .Include(t=>t.ShopLocation)
                                     .Include(t => t.TallyPipes)
                                     .ThenInclude(tp => tp.Pipe)
                                     .ThenInclude(p => p.PipeDefinition); 

            // 2. Use the Select method to transform the data into the desired shape (DtoTally).
            var dtoTallyQuery = tallyQuery.Select(tally => new DtoTally_WithPipeAndCustomer
            {
                TallyId = tally.TallyId,
                TallyNumber = tally.TallyNumber,
                CustomerId = tally.CustomerId,
                CustomerName = tally.Customer.Name,

                //Customer = new DtoCustomer  // Assume you have a DtoCustomer DTO
                //{
                //    CustomerId = tally.Customer.CustomerId,
                //    Name = tally.Customer.Name
                //},

                ShopLocationId = tally.ShopLocationId,
                ShopLocationName = tally.ShopLocation.Name,
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
        */

        public IQueryable<DtoTally_WithPipeAndCustomer> GetTallyById(Guid guid)
        {
            // 1. Create a parameterized SQL query
            var sql = @"SELECT 
    [t].[TallyId], 
    [t].[TallyNumber], 
    [t].[CustomerId], 
    [c].[Name] AS [CustomerName],  -- Alias for Customer.Name
    [t].[ShopLocationId], 
    [s].[Name] AS [ShopLocationName],  -- Alias for ShopLocation.Name
    CAST([t].[TallyType] AS int) AS TallyType, 
    [t].[DateOfCreation], 
    [t].[Notes], 
    [t].[InvoiceNumber], 
    [t].[TalliedByUserId], 
    [t].[CarrierName],
    (SELECT COALESCE(SUM((CAST([p].[Quantity] AS decimal(18,2)) * [p].[LengthInMeters]) * [p1].[WeightInKgPerMeter]), 0.0)
    FROM [TallyPipe] AS [tp]
    INNER JOIN [Pipe] AS [p] ON [tp].[PipeId] = [p].[PipeId]
    INNER JOIN [PipeDefinition] AS [pd] ON [p].[PipeDefinitionId] = [pd].[PipeDefinitionId]
    LEFT JOIN [PipeProperty_Weight] AS [p1] ON [pd].[WeightId] = [p1].[PipeProperty_WeightId]
    WHERE [tp].[TallyId] = [t].[TallyId]) AS WeightInKg,
    (SELECT COALESCE(SUM((CAST([p2].[Quantity] AS decimal(18,2)) * [p2].[LengthInFeet]) * [p4].[WeightInLbsPerFoot]), 0.0)
    FROM [TallyPipe] AS [tp2]
    INNER JOIN [Pipe] AS [p2] ON [tp2].[PipeId] = [p2].[PipeId]
    INNER JOIN [PipeDefinition] AS [pd2] ON [p2].[PipeDefinitionId] = [pd2].[PipeDefinitionId]
    LEFT JOIN [PipeProperty_Weight] AS [p4] ON [pd2].[WeightId] = [p4].[PipeProperty_WeightId]
    WHERE [tp2].[TallyId] = [t].[TallyId]) AS WeightInLbs
FROM [Tally] AS [t]
INNER JOIN [Customer] AS [c] ON [t].[CustomerId] = [c].[CustomerId]
INNER JOIN [ShopLocation] AS [s] ON [t].[ShopLocationId] = [s].[ShopLocationId]
WHERE [t].[TallyId] = @p0";

            var dtoList = new List<DtoTally_WithPipeAndCustomer>();

            using (var command = _context.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = sql; // Your SQL query here
                command.Parameters.Add(new SqlParameter("@p0", guid)); // Add parameters as needed

                _context.Database.OpenConnection();

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var dtoTally = new DtoTally_WithPipeAndCustomer
                        {
                            TallyId = reader.GetGuid(reader.GetOrdinal("TallyId")),
                            TallyNumber = reader.GetString(reader.GetOrdinal("TallyNumber")),
                            CustomerId = reader.GetGuid(reader.GetOrdinal("CustomerId")),
                            CustomerName = reader.GetString(reader.GetOrdinal("CustomerName")),
                            ShopLocationId = reader.GetGuid(reader.GetOrdinal("ShopLocationId")),
                            ShopLocationName = reader.GetString(reader.GetOrdinal("ShopLocationName")),
                            TallyType = (ApplicationEnums.TallyTypes)reader.GetInt32(reader.GetOrdinal("TallyType")),
                            DateOfCreation = (DateTimeOffset)reader.GetValue(reader.GetOrdinal("DateOfCreation")),
                            Notes = reader.IsDBNull(reader.GetOrdinal("Notes")) ? null : reader.GetString(reader.GetOrdinal("Notes")),
                            InvoiceNumber = reader.GetString(reader.GetOrdinal("InvoiceNumber")),
                            TalliedByUserId = reader.GetGuid(reader.GetOrdinal("TalliedByUserId")),
                            CarrierName = reader.IsDBNull(reader.GetOrdinal("CarrierName")) ? null : reader.GetString(reader.GetOrdinal("CarrierName")),
                            PipeList = GetPipeList(reader.GetGuid(reader.GetOrdinal("TallyId")))
                        };

                        dtoList.Add(dtoTally);
                    }
                }
            }

            return dtoList.AsQueryable();
        }

        // Create a method to get the pipe list based on TallyId
        private List<DtoPipe> GetPipeList(Guid tallyId)
        {
            // Create a parameterized SQL query to get the pipe list for a specific TallyId
            var sql = @"SELECT 
    [p].[PipeId], 
    [p].[PipeDefinitionId], 
    [pd].[PipeDefinitionId] AS [PipeDefinitionId0], 
    [p].[TierId], 
    [p].[LengthInMeters], 
    [p].[LengthInFeet], 
    [p].[Quantity], 
    [pd].[IsActive], 
    [pd].[CategoryId], 
    [pd].[ConditionId], 
    [pd].[GradeId], 
    [pd].[RangeId], 
    [pd].[SizeId], 
    [pd].[ThreadId], 
    [pd].[WallId], 
    [pd].[WeightId], 
    [ppc].[PipeProperty_CategoryId], 
    [ppc].[Name] AS [Name0], 
    [ppcon].[PipeProperty_ConditionId], 
    [ppcon].[Name] AS [Name1], 
    [ppg].[PipeProperty_GradeId], 
    [ppg].[Name] AS [Name2], 
    [ppr].[PipeProperty_RangeId], 
    [ppr].[Name] AS [Name3], 
    [pps].[PipeProperty_SizeId], 
    [pps].[SizeImperial], 
    [pps].[SizeMetric], 
    [ppt].[PipeProperty_ThreadId], 
    [ppt].[Name] AS [Name4], 
    [ppw].[PipeProperty_WallId], 
    [ppw].[WallImperial], 
    [ppw].[WallMetric], 
    [ppwei].[PipeProperty_WeightId], 
    [ppwei].[WeightInLbsPerFoot], 
    [ppwei].[WeightInKgPerMeter]
FROM [TallyPipe] AS [tp]
INNER JOIN [Pipe] AS [p] ON [tp].[PipeId] = [p].[PipeId]
INNER JOIN [PipeDefinition] AS [pd] ON [p].[PipeDefinitionId] = [pd].[PipeDefinitionId]
LEFT JOIN [PipeProperty_Category] AS [ppc] ON [pd].[CategoryId] = [ppc].[PipeProperty_CategoryId]
LEFT JOIN [PipeProperty_Condition] AS [ppcon] ON [pd].[ConditionId] = [ppcon].[PipeProperty_ConditionId]
LEFT JOIN [PipeProperty_Grade] AS [ppg] ON [pd].[GradeId] = [ppg].[PipeProperty_GradeId]
LEFT JOIN [PipeProperty_Range] AS [ppr] ON [pd].[RangeId] = [ppr].[PipeProperty_RangeId]
LEFT JOIN [PipeProperty_Size] AS [pps] ON [pd].[SizeId] = [pps].[PipeProperty_SizeId]
LEFT JOIN [PipeProperty_Thread] AS [ppt] ON [pd].[ThreadId] = [ppt].[PipeProperty_ThreadId]
LEFT JOIN [PipeProperty_Wall] AS [ppw] ON [pd].[WallId] = [ppw].[PipeProperty_WallId]
LEFT JOIN [PipeProperty_Weight] AS [ppwei] ON [pd].[WeightId] = [ppwei].[PipeProperty_WeightId]
WHERE [tp].[TallyId] = @p0";

            // Execute the SQL query using FromSqlRaw
            var pipeList = _context.Pipe.FromSqlRaw(sql, tallyId);

            // Perform the DTO projection for the pipe list
            var dtoPipeList = pipeList.Select(tp => new DtoPipe
            {
                PipeId = tp.PipeId,
                PipeDefinitionId = tp.PipeDefinitionId,
                PipeDefinition = new DtoPipeDefinition
                {
                    PipeDefinitionId = tp.PipeDefinitionId,
                    CategoryId = tp.PipeDefinition.CategoryId,
                    ConditionId = tp.PipeDefinition.ConditionId,
                    GradeId = tp.PipeDefinition.GradeId,
                    RangeId = tp.PipeDefinition.RangeId,
                    SizeId = tp.PipeDefinition.SizeId,
                    ThreadId = tp.PipeDefinition.ThreadId,
                    WallId = tp.PipeDefinition.WallId,
                    WeightId = tp.PipeDefinition.WeightId,
                    Category = new PipeProperty_Category
                    {
                        PipeProperty_CategoryId = (Guid)tp.PipeDefinition.CategoryId,
                        Name = tp.PipeDefinition.Category.Name
                    },
                    Condition = new PipeProperty_Condition
                    {
                        PipeProperty_ConditionId = (Guid)tp.PipeDefinition.ConditionId,
                        Name = tp.PipeDefinition.Condition.Name
                    },
                    Grade = new PipeProperty_Grade
                    {
                        PipeProperty_GradeId = (Guid)tp.PipeDefinition.GradeId,
                        Name = tp.PipeDefinition.Grade.Name
                    },
                    Range = new PipeProperty_Range
                    {
                        PipeProperty_RangeId = (Guid)tp.PipeDefinition.RangeId,
                        Name = tp.PipeDefinition.Range.Name
                    },
                    Size = new PipeProperty_Size
                    {
                        PipeProperty_SizeId = (Guid)tp.PipeDefinition.SizeId,
                        SizeImperial = tp.PipeDefinition.Size.SizeImperial,
                        SizeMetric = tp.PipeDefinition.Size.SizeMetric
                    },
                    Thread = new PipeProperty_Thread
                    {
                        PipeProperty_ThreadId = (Guid)tp.PipeDefinition.ThreadId,
                        Name = tp.PipeDefinition.Thread.Name
                    },
                    Wall = new PipeProperty_Wall
                    {
                        PipeProperty_WallId = (Guid)tp.PipeDefinition.WallId,
                        WallImperial = tp.PipeDefinition.Wall.WallImperial,
                        WallMetric = tp.PipeDefinition.Wall.WallMetric
                    },
                    Weight = new PipeProperty_Weight
                    {
                        PipeProperty_WeightId = (Guid)tp.PipeDefinition.WeightId,
                        WeightInLbsPerFoot = tp.PipeDefinition.Weight.WeightInLbsPerFoot,
                        WeightInKgPerMeter = tp.PipeDefinition.Weight.WeightInKgPerMeter
                    }
                },
                TierId = tp.TierId,
                LengthInMeters = tp.LengthInMeters,
                LengthInFeet = tp.LengthInFeet,
                Quantity = tp.Quantity
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
