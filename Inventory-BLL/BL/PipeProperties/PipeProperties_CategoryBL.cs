using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory_BLL.BL
{
    public class PipeProperty_CategoryBL : IPipeProperty_CategoryBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public PipeProperty_CategoryBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<PipeProperty_Category> GetCategories()
        {
            IQueryable<PipeProperty_Category> entity = _context.PipeProperty_Category.OrderBy(c => c.Name);
            return entity;
        }

        public async Task<DtoPipeProperty_Category> GetCategoryById(Guid id)
        {
            var entity = await _context.PipeProperty_Category.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No category with ID {id} can be found.");
            }
            return _mapper.Map<DtoPipeProperty_Category>(entity);
        }

        public async Task<PipeProperty_Category> CreateCategory(PipeProperty_Category category)
        {
            if (category == null)
                throw new ArgumentNullException("Create Category failed. The category data is null");

            category.PipeProperty_CategoryId = Guid.NewGuid();
            _context.PipeProperty_Category.Add(category);
            await _context.SaveChangesAsync();

            return category;
        }

        public async Task UpdateCategory(DtoPipeProperty_CategoryUpdate categoryDto, Guid guid)
        {
            PipeProperty_Category? existingCategory = await _context.PipeProperty_Category.FindAsync(guid);

            if (existingCategory == null)
                throw new KeyNotFoundException($"No category with guid {guid} can be found.");

            _mapper.Map(categoryDto, existingCategory);
            await _context.SaveChangesAsync();
        }

        public async Task DeactivateCategory(Guid guid)
        {
            PipeProperty_Category? category = await _context.PipeProperty_Category.FindAsync(guid);

            if (category == null)
                throw new KeyNotFoundException($"No category with guid {guid} can be found.");

            category.IsActive = false;
            await _context.SaveChangesAsync();
        }
    }
}
