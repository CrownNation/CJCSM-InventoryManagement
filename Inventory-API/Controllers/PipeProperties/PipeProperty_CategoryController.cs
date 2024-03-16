using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;
using Inventory_Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using System.ComponentModel.DataAnnotations;

namespace Inventory_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PipeProperty_CategoryController : ODataController
    {
        private readonly ILogger<PipeProperty_CategoryController> _logger;
        private readonly IPipeProperty_CategoryBL _pipePropertyCategoryBl;

        public PipeProperty_CategoryController(ILogger<PipeProperty_CategoryController> logger, IPipeProperty_CategoryBL pipePropertyCategoryBl)
        {
            _logger = logger;
            _pipePropertyCategoryBl = pipePropertyCategoryBl;
        }

        [HttpGet]
        public IActionResult Get(ODataQueryOptions<PipeProperty_Category> options)
        {
            try
            {
                IQueryable<PipeProperty_Category>? categories = _pipePropertyCategoryBl.GetCategories();
                return Ok(options.ApplyTo(categories));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetCategories: " + e.Message);
                return BadRequest("There was a problem querying for categories.");
            }
        }

        [HttpGet("{key}")]
        public IActionResult Get(Guid key)
        {
            try
            {
                DtoPipeProperty_Category category = _pipePropertyCategoryBl.GetCategoryById(key);
                return Ok(category);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"GetCategoryById: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"GetCategoryById: " + e.Message);
                return BadRequest($"There was a problem querying for the category with id {key}.");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] PipeProperty_Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            PipeProperty_Category createdCategory;
            try
            {
                createdCategory = _pipePropertyCategoryBl.CreateCategory(category);
            }
            catch (Exception e)
            {
                _logger.LogError($"CreateCategory: " + e.Message);
                return BadRequest("There was a problem creating the category.");
            }

            return CreatedAtAction("Get", new { key = createdCategory.PipeProperty_CategoryId }, createdCategory);
        }

        [HttpPut("{key}")]
        public IActionResult Put(Guid key, [FromBody] DtoPipeProperty_CategoryUpdate category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _pipePropertyCategoryBl.UpdateCategory(category, key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"UpdateCategory: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"UpdateCategory: " + e.Message);
                return BadRequest("There was a problem updating the category.");
            }

            return NoContent();
        }

        [HttpDelete("{key}")]
        public IActionResult Delete(Guid key)
        {
            try
            {
                _pipePropertyCategoryBl.DeactivateCategory(key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"DeleteCategory: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"DeleteCategory: " + e.Message);
                return BadRequest("There was a problem deleting the category.");
            }

            return NoContent();
        }
    }
}
