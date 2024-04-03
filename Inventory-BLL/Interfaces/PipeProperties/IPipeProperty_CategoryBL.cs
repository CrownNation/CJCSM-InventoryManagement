using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface IPipeProperty_CategoryBL
    {
        // Gets all PipeProperty_Category entities as an IQueryable
        IQueryable<PipeProperty_Category> GetCategories();

        // Gets a single PipeProperty_Category entity by its ID asynchronously
        Task<DtoPipeProperty_Category> GetCategoryById(Guid id);

        // Creates a new PipeProperty_Category entity asynchronously
        Task<PipeProperty_Category> CreateCategory(PipeProperty_Category category);

        // Updates an existing PipeProperty_Category entity identified by its ID asynchronously
        Task UpdateCategory(DtoPipeProperty_CategoryUpdate category, Guid id);

        // Deletes a PipeProperty_Category entity identified by its ID asynchronously
        Task DeactivateCategory(Guid id);
    }
}
