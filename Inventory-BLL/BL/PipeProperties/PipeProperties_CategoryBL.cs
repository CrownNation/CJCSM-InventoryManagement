using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;
using System;
using System.Linq;

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
            IQueryable<PipeProperty_Category> entity = _context.PipeProperty_Category.AsQueryable();
            return entity;
        }

        public IQueryable<PipeProperty_Category>? GetCategoryById(Guid guid)
        {
            IQueryable<PipeProperty_Category>? category = _context.PipeProperty_Category.Where(x => x.PipeProperty_CategoryId == guid);
            if (category.Any())
            {
                return category;
            }

            throw new KeyNotFoundException($"No category with guid {guid} can be found.");
        }

        public PipeProperty_Category CreateCategory(PipeProperty_Category category)
        {
            if (category == null)
                throw new ArgumentNullException("Create Category failed. The category data is null");

            category.PipeProperty_CategoryId = Guid.NewGuid();
            _context.PipeProperty_Category.Add(category);
            _context.SaveChanges();

            return category;
        }

        public void UpdateCategory(DtoPipeProperty_CategoryUpdate category, Guid guid)
        {
            PipeProperty_Category? existingCategory = _context.PipeProperty_Category.Find(guid);

            if (existingCategory == null)
                throw new KeyNotFoundException($"No category with guid {guid} can be found.");

            _mapper.Map(category, existingCategory);
            _context.SaveChanges();
        }

        public void DeactivateCategory(Guid guid)
        {
            PipeProperty_Category? category = _context.PipeProperty_Category.Find(guid);

            if (category == null)
                throw new KeyNotFoundException($"No category with guid {guid} can be found.");

            // Set IsActive to false instead of removing the category
            category.IsActive = false;
            _context.SaveChanges();
        }
    }
}
