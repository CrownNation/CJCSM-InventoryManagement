using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace Inventory_API.Controllers
{
   [ApiController]
   [Route("[controller]")]
   public class EquipmentForTallyController : ODataController
   {
      private readonly ILogger<EquipmentForTallyController> _logger;
      private readonly IEquipmentForTallyBL _equipmentForTallyBL;

      public EquipmentForTallyController(ILogger<EquipmentForTallyController> logger, IEquipmentForTallyBL equipmentForTallyBL)
      {
         _logger = logger;
         _equipmentForTallyBL = equipmentForTallyBL;
      }


      // Get all equipment for tally WITH definitions and apply odata filters to it.
      [HttpGet("{tallyId}/withDefinition")]
      public IActionResult GetEquipmentForTallyWithDefinitionList(Guid tallyId, ODataQueryOptions<DtoEquipmentForTally> options)
      {
         try
         {
            IQueryable<DtoEquipmentForTally> equipmentQuery = _equipmentForTallyBL.GetEquipmentForTallyWithDefinitionByTallyId(tallyId);
            return Ok(options.ApplyTo(equipmentQuery));
         }
         catch (Exception e)
         {
            _logger.LogError($"GetEquipmentsForTally: " + e.Message);
            return BadRequest("There was a problem querying for equipment for tally.");
         }
      }

      // Get a specific piece of equipment for tally by ID
      [HttpGet("{tallyId}")]
      public IActionResult Get(Guid tallyId)
      {
         try
         {
            IQueryable<DtoEquipmentForTally> equipment = _equipmentForTallyBL.GetEquipmentForTallyByTallyId(tallyId);
            if (equipment != null)
            {
               return Ok(equipment);
            }
            else
            {
               _logger.LogInformation($"GetEquipmentForTallyById: Equipment with id {tallyId} not found.");
               return NotFound();
            }
         }
         catch (Exception e)
         {
            _logger.LogError($"GetEquipmentForTallyById: " + e.Message);
            return BadRequest($"There was a problem querying for the equipment for tally with id {tallyId}.");
         }
      }

      //// Get a specific piece of equipment for tally with the associated definition.
      //[HttpGet("{tallyId}/withDefinition")]
      //public IActionResult GetEquipmentForTallyWithDefinitionById(Guid tallyId)
      //{
      //   try
      //   {
      //      IQueryable<DtoEquipmentForTally> equipment = _equipmentForTallyBL.GetEquipmentForTallyWithDefinitionByTallyId(tallyId);
      //      if (equipment != null)
      //      {
      //         return Ok(equipment);
      //      }
      //      else
      //      {
      //         _logger.LogInformation($"GetEquipmentForTallyWithDefinitionById: Equipment with id {tallyId} not found.");
      //         return NotFound();
      //      }
      //   }
      //   catch (Exception e)
      //   {
      //      _logger.LogError($"GetEquipmentForTallyWithDefinitionById: " + e.Message);
      //      return BadRequest($"There was a problem querying for the equipment for tally with id {tallyId}.");
      //   }
      //}

      [HttpPost]
      public IActionResult Post([FromBody] DtoEquipmentForTallyCreate dtoEquipmentForTallyCreate)
      {
         if (!ModelState.IsValid)
         {
            return BadRequest(ModelState);
         }

         try
         {
            var createdEquipment = _equipmentForTallyBL.CreateEquipmentForTally(dtoEquipmentForTallyCreate);
            return CreatedAtAction("Get", new { key = createdEquipment.EquipmentForTallyId}, createdEquipment);
         }
         catch (Exception e)
         {
            _logger.LogError($"CreateEquipmentForTally: " + e.Message);
            return BadRequest("There was a problem creating the equipment for tally.");
         }
      }

      [HttpDelete("{key}")]
      public IActionResult Delete(Guid key)
      {
         try
         {
            _equipmentForTallyBL.DeactivateEquipmentForTally(key);
            return NoContent();
         }
         catch (KeyNotFoundException e)
         {
            _logger.LogInformation($"DeleteEquipmentForTally: " + e.Message);
            return NotFound();
         }
         catch (Exception e)
         {
            _logger.LogError($"DeleteEquipmentForTally: " + e.Message);
            return BadRequest("There was a problem deleting the equipment for tally.");
         }
      }
   }
}
