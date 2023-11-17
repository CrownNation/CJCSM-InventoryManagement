using AutoMapper;
using CJCSM_Common;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;
using Inventory_Models.Dto;
using Inventory_Models.DTO.CustomerQuery;
using Microsoft.EntityFrameworkCore;

namespace Inventory_BLL.BL
{
    public class CustomerBL : ICustomerBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;


        public CustomerBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Task<IQueryable<DtoCustomer>> GetCustomers()
        {
            IQueryable<Customer> entity = _context.Customer.AsQueryable();
            IQueryable<DtoCustomer> customers = _mapper.ProjectTo<DtoCustomer>(entity);

            return Task.FromResult(customers);
        }

        public async Task<IQueryable<DtoCustomer>?> GetCustomerById(Guid guid)
        {
            try
            {
                IQueryable<Customer>? customer = _context.Customer.Where(x => x.CustomerId == guid);
                if (customer.Any())
                {
                    IQueryable<DtoCustomer> DtoCustomer = _mapper.ProjectTo<DtoCustomer>(customer);
                    return await Task.FromResult(DtoCustomer);
                }

                throw new KeyNotFoundException($"No customer with guid {guid} can be found.");
            }
            catch (KeyNotFoundException)
            {
                throw; // Re-throw the exception to let it propagate up the call stack
            }
        }


        public async Task<DtoCustomer> CreateCustomer(DtoCustomerCreate DtoCustomer)
        {
            if (DtoCustomer == null)
                throw new ArgumentNullException("Create Customer failed. The customer data is null");
            if (String.IsNullOrEmpty(DtoCustomer.Name))
                throw new ArgumentNullException("Create Customer failed. The customer name cannot be null or empty.");

            Customer customer = _mapper.Map<Customer>(DtoCustomer);

            customer.CustomerId = Guid.NewGuid(); // Todo: Might be set by the database, can remove it db creates it
            customer.IsActive = true;
            customer.DateOfCreation = DateTimeOffset.Now;
            customer.DateOfLastUpdate = DateTimeOffset.Now;
            _context.Customer.Add(customer);
            await _context.SaveChangesAsync();

            return _mapper.Map<DtoCustomer>(customer);
        }

        public async Task UpdateCustomer(DtoCustomerUpdate dtoCustomerUpdate, Guid guid)
        {
            Customer? customer = await _context.Customer.FindAsync(guid);

            if (customer == null)
                throw new KeyNotFoundException($"No customer with guid {guid} can be found.");

            _mapper.Map<DtoCustomerUpdate, Customer>(dtoCustomerUpdate, customer);
            customer.DateOfLastUpdate = DateTimeOffset.Now;
            await _context.SaveChangesAsync();
        }

        public void DeleteCustomer(Guid guid)
        {
            Customer? customer = _context.Customer.Find(guid);

            if (customer == null)
                throw new KeyNotFoundException($"No customer with guid {guid} can be found.");

            _context.Customer.Remove(customer);
            _context.SaveChanges();
        }

        public async Task<DtoCustomer_WithPipe> GetCustomerWithPipeByCustomerId(Guid customerId)
        {
            try
            {
                var dtoCustomerWithPipeQuery = from customer in _context.Customer
                                               where customer.CustomerId == customerId
                                               select new
                                               {
                                                   Customer = customer,
                                                   Pipes = (from pipe in _context.Pipe
                                                            where pipe.CustomerId == customerId
                                                            join pd in _context.PipeDefinition on pipe.PipeDefinitionId equals pd.PipeDefinitionId
                                                            join t in _context.Tier on pipe.TierId equals t.TierId
                                                            join ppc in _context.PipeProperty_Category on pd.CategoryId equals ppc.PipeProperty_CategoryId
                                                            join ppcon in _context.PipeProperty_Condition on pd.ConditionId equals ppcon.PipeProperty_ConditionId
                                                            join ppgr in _context.PipeProperty_Grade on pd.GradeId equals ppgr.PipeProperty_GradeId
                                                            join ppr in _context.PipeProperty_Range on pd.RangeId equals ppr.PipeProperty_RangeId
                                                            join pps in _context.PipeProperty_Size on pd.SizeId equals pps.PipeProperty_SizeId
                                                            join ppt in _context.PipeProperty_Thread on pd.ThreadId equals ppt.PipeProperty_ThreadId
                                                            join ppw in _context.PipeProperty_Wall on pd.WallId equals ppw.PipeProperty_WallId
                                                            join ppwe in _context.PipeProperty_Weight on pd.WeightId equals ppwe.PipeProperty_WeightId
                                                            join r in _context.Rack on t.RackId equals r.RackId
                                                            orderby pipe.IndexOfPipe ascending
                                                            select new
                                                            {
                                                                Pipe = pipe,
                                                                PipeDefinition = pd,
                                                                Tier = t,
                                                                Category = ppc,
                                                                Condition = ppcon,
                                                                Grade = ppgr,
                                                                Range = ppr,
                                                                Size = pps,
                                                                Thread = ppt,
                                                                Wall = ppw,
                                                                Weight = ppwe,
                                                                Rack = r
                                                            }).ToList()
                                               };

                var data = await dtoCustomerWithPipeQuery.SingleOrDefaultAsync();

                if (data == null)
                {
                    return null;
                }

                var dtoCustomerWithPipe = new DtoCustomer_WithPipe
                {
                    CustomerId = data.Customer.CustomerId,
                    Customer = new DtoCustomer // Map other properties as needed
                    {
                        CustomerId = data.Customer.CustomerId,
                        Name = data.Customer.Name,
                        Address1 = data.Customer.Address1,
                        Address2 = data.Customer.Address2,
                        City = data.Customer.City,
                        ProvinceState = data.Customer.ProvinceState,
                        Country = data.Customer.Country,
                        PostalCode = data.Customer.PostalCode,
                        Email = data.Customer.Email,
                        IsActive = data.Customer.IsActive,
                        DateOfCreation = data.Customer.DateOfCreation,
                        DateOfLastUpdate = data.Customer.DateOfLastUpdate
                    },
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
                        RackName = pipeData.Rack.Name,
                        IndexOfPipe = pipeData.Pipe.IndexOfPipe,
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
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"An error occurred in GetCustomerWithPipeById: {ex.Message}");
                throw; // Rethrow the exception to let it propagate up the call stack
            }
        }


        /*
        public IQueryable<DtoCustomer_WithPipe> GetCustomerWithPipeById(Guid customerId)
        {
            try
            {
                var dtoCustomerWithPipeQuery = from customer in _context.Customer
                                               where customer.CustomerId == customerId
                                               select new
                                               {
                                                   Customer = customer,
                                                   Pipes = (from pipe in _context.Pipe
                                                           where pipe.CustomerId == customerId
                                                           join pd in _context.PipeDefinition on pipe.PipeDefinitionId equals pd.PipeDefinitionId
                                                           join t in _context.Tier on pipe.TierId equals t.TierId
                                                            join ppc in _context.PipeProperty_Category on pd.CategoryId equals ppc.PipeProperty_CategoryId
                                                            join ppcon in _context.PipeProperty_Condition on pd.ConditionId equals ppcon.PipeProperty_ConditionId
                                                            join ppgr in _context.PipeProperty_Grade on pd.GradeId equals ppgr.PipeProperty_GradeId
                                                            join ppr in _context.PipeProperty_Range on pd.RangeId equals ppr.PipeProperty_RangeId
                                                            join pps in _context.PipeProperty_Size on pd.SizeId equals pps.PipeProperty_SizeId
                                                            join ppt in _context.PipeProperty_Thread on pd.ThreadId equals ppt.PipeProperty_ThreadId
                                                            join ppw in _context.PipeProperty_Wall on pd.WallId equals ppw.PipeProperty_WallId
                                                            join ppwe in _context.PipeProperty_Weight on pd.WeightId equals ppwe.PipeProperty_WeightId
                                                            join r in _context.Rack on t.RackId equals r.RackId
                                                            select new
                                                            {
                                                                Pipe = pipe,
                                                                PipeDefinition = pd,
                                                                Tier = t,
                                                                Category = ppc,
                                                                Condition = ppcon,
                                                                Grade = ppgr,
                                                                Range = ppr,
                                                                Size = pps,
                                                                Thread = ppt,
                                                                Wall = ppw,
                                                                Weight = ppwe,
                                                                Rack = r
                                                            }).ToList()
                                               };

                var dtoList = dtoCustomerWithPipeQuery.AsEnumerable().Select(data =>
                {
                    if (data == null)
                    {
                        System.Diagnostics.Debug.WriteLine("Data is null");
                        return null;
                    }

                    var dtoCustomerWithPipe = new DtoCustomer_WithPipe
                    {
                        CustomerId = data.Customer.CustomerId,
                        Customer = new DtoCustomer // Map other properties as needed
                        {
                            CustomerId = data.Customer.CustomerId,
                            Name = data.Customer.Name,
                            Address1 = data.Customer.Address1,
                            Address2 = data.Customer.Address2,
                            City = data.Customer.City,
                            ProvinceState = data.Customer.ProvinceState,
                            Country = data.Customer.Country,
                            PostalCode = data.Customer.PostalCode,
                            Email = data.Customer.Email,
                            IsActive = data.Customer.IsActive,
                            DateOfCreation = data.Customer.DateOfCreation,
                            DateOfLastUpdate = data.Customer.DateOfLastUpdate
                        },
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
                            RackName = pipeData.Rack.Name,
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

                return dtoList;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"An error occurred in GetCustomerWithPipeById: {ex.Message}");
                throw; // Rethrow the exception to let it propagate up the call stack
            }
        }
        */

    }
}
