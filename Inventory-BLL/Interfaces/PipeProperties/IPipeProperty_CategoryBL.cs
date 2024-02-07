using System;
using System.Linq;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface IPipeProperty_CategoryBL
    {
        // Gets all PipeProperty_Category entities as an IQueryable
        IQueryable<PipeProperty_Category> GetCategories();

        // Gets a single PipeProperty_Category entity by its ID
        IQueryable<PipeProperty_Category>? GetCategoryById(Guid guid);

        // Creates a new PipeProperty_Category entity
        PipeProperty_Category CreateCategory(PipeProperty_Category category);

        // Updates an existing PipeProperty_Category entity identified by its ID
        void UpdateCategory(DtoPipeProperty_CategoryUpdate category, Guid guid);

        // Deletes a PipeProperty_Category entity identified by its ID
        void DeactivateCategory(Guid guid);
    }
}
