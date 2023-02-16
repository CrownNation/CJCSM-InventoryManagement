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
   public class TierController : ODataController
   {

      private readonly ILogger<TierController> _logger;
      private readonly ITierBL _tierBl;
      
      public TierController(ILogger<TierController> logger, ITierBL tierBl)
      {
         _logger = logger;
         _tierBl = tierBl;
      }

      [HttpGet]
      public IActionResult Get(ODataQueryOptions<TierDto> options)
      {

         try
         {
            IQueryable<TierDto>? tiers = _tierBl.GetTiers();
            return Ok(options.ApplyTo(tiers));
         }
         catch(Exception e)
         {
            _logger.LogError($"GetTiers: " + e.Message);
            throw new Exception("There was a problem querying for tiers.");
         }
      }

      [HttpGet("{key}")]
      public IActionResult Get(Guid key, ODataQueryOptions<TierDto> options)
      {
         try
         {
            IQueryable<TierDto>? tier = _tierBl.GetTierById(key);
            return Ok(options.ApplyTo(tier));
         }
         catch (KeyNotFoundException e)
         {
            return NotFound();
         }
         catch (Exception e)
         {
            _logger.LogError($"GetTierById: " + e.Message);
            throw new Exception($"There was a problem querying for the tier with id {key}.");
         }
      }

      [HttpPost]
      public async Task<IActionResult> Post([FromBody] TierCreateDto tier)
      {
         if (!ModelState.IsValid)
         {
            return BadRequest(ModelState);
         }

         TierDto tierDto;
         try
         {
            tierDto = await _tierBl.CreateTier(tier);
         }
         catch (Exception e)
         {
            _logger.LogError($"CreateTier: " + e.Message);
            throw new Exception($"There was a problem creating tier.");
         }

         // Todo: This is not creating the correct odata path. The one below creates the regular endpoint, which works, just not odata, which is fine for now.
         //return CreatedAtAction(nameof(GetTierById), new { key = tierDto.TierId, odataPath = $"Tier/{tierDto.TierId}" }, tierDto);
         return CreatedAtAction("Get", new { key = tierDto.TierId }, tierDto);
      }

      [HttpPut("{key}")]
      public IActionResult Put(Guid key, [FromBody] TierUpdateDto tier)
      {
         if (!ModelState.IsValid)
         {
            return BadRequest(ModelState);
         }

         try
         {
            _tierBl.UpdateTier(tier, key);
         }
         catch (KeyNotFoundException e)
         {
            return NotFound();
         }
         catch (Exception e)
         {
            _logger.LogError($"UpdateTier: " + e.Message);
            throw new Exception($"There was a problem updating the tier with id {key}");
         }

         return NoContent();
      }


      [HttpDelete("{key}")]
      public IActionResult Delete(Guid key)
      {
         try
         {
            _tierBl.DeleteTier(key);
         }
         catch (KeyNotFoundException e)
         {
            return NotFound();
         }
         catch (Exception e)
         {
            _logger.LogError($"DeleteTier: " + e.Message);
            throw new Exception($"There was a problem deleting the tier with id {key}");
         }

         return NoContent();
      }


   }
}
