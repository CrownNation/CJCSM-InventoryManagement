using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory_BLL.BL
{
   public class PipePropertiesBL : IPipePropertiesBL
   {
      private readonly InventoryContext _context;
      private readonly IMapper _mapper;

      public PipePropertiesBL(InventoryContext context, IMapper mapper)
      {
         _context = context;
         _mapper = mapper;
      }

      public async Task<DtoPipePropertiesAll> GetAllPipeProperties()
      {
         var categories = await _context.PipeProperty_Category
                                        .Select(c => _mapper.Map<DtoPipeProperty_Category>(c))
                                        .ToListAsync();
         var coatings = await _context.PipeProperty_Coating
                                      .Select(c => _mapper.Map<DtoPipeProperty_Coating>(c))
                                      .ToListAsync();
         var conditions = await _context.PipeProperty_Condition
                                        .Select(c => _mapper.Map<DtoPipeProperty_Condition>(c))
                                        .ToListAsync();
         var grades = await _context.PipeProperty_Grade
                                    .Select(c => _mapper.Map<DtoPipeProperty_Grade>(c))
                                    .ToListAsync();
         var ranges = await _context.PipeProperty_Range
                                    .Select(c => _mapper.Map<DtoPipeProperty_Range>(c))
                                    .ToListAsync();
         var sizes = await _context.PipeProperty_Size
                                   .Select(c => _mapper.Map<DtoPipeProperty_Size>(c))
                                   .ToListAsync();
         var threads = await _context.PipeProperty_Thread
                                     .Select(c => _mapper.Map<DtoPipeProperty_Thread>(c))
                                     .ToListAsync();
         var walls = await _context.PipeProperty_Wall
                                   .Select(c => _mapper.Map<DtoPipeProperty_Wall>(c))
                                   .ToListAsync();
         var weights = await _context.PipeProperty_Weight
                                     .Select(c => _mapper.Map<DtoPipeProperty_Weight>(c))
                                     .ToListAsync();

         return new DtoPipePropertiesAll
         {
            Categories = categories,
            Coatings = coatings,
            Conditions = conditions,
            Grades = grades,
            Ranges = ranges,
            Sizes = sizes,
            Threads = threads,
            Walls = walls,
            Weights = weights
         };
      }

   }
}
