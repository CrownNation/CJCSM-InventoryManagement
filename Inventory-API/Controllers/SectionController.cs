using Inventory_BLL.Interfaces;
using Inventory_Dto.Dto;
using Inventory_Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using System.Linq.Expressions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Inventory_API.Controllers
{
   [ApiController]
   [Route("[controller]")]
   public class SectionController : ODataController
   {

      private readonly ILogger<SectionController> _logger;
      private readonly ISectionBL _sectionBl;
      
      public SectionController(ILogger<SectionController> logger, ISectionBL sectionBl)
      {
         _logger = logger;
         _sectionBl = sectionBl;
      }

      [HttpGet]
      public IActionResult Get(ODataQueryOptions<SectionDto> options)
      {

         try
         {
            IQueryable<SectionDto>? sections = _sectionBl.GetSections();
            return Ok(options.ApplyTo(sections));
         }
         catch(Exception e)
         {
            _logger.LogError($"GetSections: " + e.Message);
            throw new Exception("There was a problem querying for sections.");
         }
      }

      [HttpGet("{key}")]
      public IActionResult Get(Guid key, ODataQueryOptions<SectionDto> options)
      {
         try
         {
            IQueryable<SectionDto>? section = _sectionBl.GetSectionById(key);
            return Ok(options.ApplyTo(section));
         }
         catch (KeyNotFoundException e)
         {
            return NotFound();
         }
         catch (Exception e)
         {
            _logger.LogError($"GetSectionById: " + e.Message);
            throw new Exception($"There was a problem querying for the section with id {key}.");
         }
      }

      [HttpPost]
      public async Task<IActionResult> Post([FromBody] SectionCreateDto section)
      {
         if (!ModelState.IsValid)
         {
            return BadRequest(ModelState);
         }

         SectionDto sectionDto;
         try
         {
            sectionDto = await _sectionBl.CreateSection(section);
         }
         catch (Exception e)
         {
            _logger.LogError($"CreateSection: " + e.Message);
            throw new Exception($"There was a problem creating section.");
         }

         // Todo: This is not creating the correct odata path. The one below creates the regular endpoint, which works, just not odata, which is fine for now.
         //return CreatedAtAction(nameof(GetSectionById), new { key = sectionDto.SectionId, odataPath = $"Section/{sectionDto.SectionId}" }, sectionDto);
         return CreatedAtAction("Get", new { key = sectionDto.SectionId }, sectionDto);
      }

      [HttpPut("{key}")]
      public IActionResult Put(Guid key, [FromBody] SectionUpdateDto section)
      {
         if (!ModelState.IsValid)
         {
            return BadRequest(ModelState);
         }

         try
         {
            _sectionBl.UpdateSection(section, key);
         }
         catch (KeyNotFoundException e)
         {
            return NotFound();
         }
         catch (Exception e)
         {
            _logger.LogError($"UpdateSection: " + e.Message);
            throw new Exception($"There was a problem updating the section with id {key}");
         }

         return NoContent();
      }


      [HttpDelete("{key}")]
      public IActionResult Delete(Guid key)
      {
         try
         {
            _sectionBl.DeleteSection(key);
         }
         catch (KeyNotFoundException e)
         {
            return NotFound();
         }
         catch (Exception e)
         {
            _logger.LogError($"DeleteSection: " + e.Message);
            throw new Exception($"There was a problem deleting the section with id {key}");
         }

         return NoContent();
      }


   }
}
