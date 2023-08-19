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
   public class RackController : ODataController
   {

      private readonly ILogger<RackController> _logger;
      private readonly IRackBL _rackBl;
      
      public RackController(ILogger<RackController> logger, IRackBL rackBl)
      {
         _logger = logger;
         _rackBl = rackBl;
      }

      [HttpGet("dummy/{key}")]
      public IActionResult GetDummy(ODataQueryOptions<RackDto> options)
      {
         RackDto rack = new RackDto();
         rack.RackId = Guid.NewGuid();
         rack.Name = "RackTest01";

         return Ok(rack);
      }


      [HttpGet("dummy")]
      public IActionResult GetDummies(ODataQueryOptions<List<RackDto>> options)
      {
         RackDto rack1 = new RackDto();
         rack1.RackId = Guid.NewGuid();
         rack1.Name = "RackTest01";

         RackDto rack2 = new RackDto();
         rack2.RackId = Guid.NewGuid();
         rack2.Name = "RackTest02";

         RackDto rack3 = new RackDto();
         rack3.RackId = Guid.NewGuid();
         rack3.Name = "RackTest03";

         List<RackDto> racks = new List<RackDto>();
         racks.Add(rack1);
         racks.Add(rack2);
         racks.Add(rack3);

         return Ok(racks);
      }

      [HttpGet]
      public IActionResult Get(ODataQueryOptions<RackDto> options)
      {

         try
         {
            IQueryable<RackDto>? racks = _rackBl.GetRacks();
            return Ok(options.ApplyTo(racks));
         }
         catch(Exception e)
         {
            _logger.LogError($"GetRacks: " + e.Message);
            throw new Exception("There was a problem querying for Rrcks.");
         }
      }

      [HttpGet("{key}")]
      public IActionResult Get(Guid key, ODataQueryOptions<RackDto> options)
      {
         try
         {
            IQueryable<RackDto>? rack = _rackBl.GetRackById(key);
            return Ok(options.ApplyTo(rack));
         }
         catch (KeyNotFoundException e)
         {
            return NotFound();
         }
         catch (Exception e)
         {
            _logger.LogError($"GetRackById: " + e.Message);
            throw new Exception($"There was a problem querying for the rack with id {key}.");
         }
      }

      [HttpPost]
      public async Task<IActionResult> Post([FromBody] RackCreateDto rack)
      {
         if (!ModelState.IsValid)
         {
            return BadRequest(ModelState);
         }

         RackDto rackDto;
         try
         {
            rackDto = await _rackBl.CreateRack(rack);
         }
         catch (Exception e)
         {
            _logger.LogError($"CreateRack: " + e.Message);
            throw new Exception($"There was a problem creating rack.");
         }

         // Todo: This is not creating the correct odata path. The one below creates the regular endpoint, which works, just not odata, which is fine for now.
         //return CreatedAtAction(nameof(GetRackById), new { key = rackDto.RackId, odataPath = $"Rack/{rackDto.RackId}" }, rackDto);
         return CreatedAtAction("Get", new { key = rackDto.RackId }, rackDto);
      }

      [HttpPut("{key}")]
      public IActionResult Put(Guid key, [FromBody] RackUpdateDto rack)
      {
         if (!ModelState.IsValid)
         {
            return BadRequest(ModelState);
         }

         try
         {
            _rackBl.UpdateRack(rack, key);
         }
         catch (KeyNotFoundException e)
         {
            return NotFound();
         }
         catch (Exception e)
         {
            _logger.LogError($"UpdateRack: " + e.Message);
            throw new Exception($"There was a problem updating the rack with id {key}");
         }

         return NoContent();
      }


      [HttpDelete("{key}")]
      public IActionResult Delete(Guid key)
      {
         try
         {
            _rackBl.DeleteRack(key);
         }
         catch (KeyNotFoundException e)
         {
            return NotFound();
         }
         catch (Exception e)
         {
            _logger.LogError($"DeleteRack: " + e.Message);
            throw new Exception($"There was a problem deleting the rack with id {key}");
         }

         return NoContent();
      }


   }
}
