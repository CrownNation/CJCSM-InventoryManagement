using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using Inventory_Dto.Dto;
using Newtonsoft.Json;

namespace Inventory_API.Controllers
{
   [ApiController]
   [Route("[controller]")]
   public class EquipmentDefinitionController : ODataController
   {
      private readonly ILogger<EquipmentDefinitionController> _logger;
      private readonly IEquipmentDefinitionBL _equipmentDefinitionBL;

      public EquipmentDefinitionController(ILogger<EquipmentDefinitionController> logger, IEquipmentDefinitionBL equipmentDefinitionBL)
      {
         _logger = logger;
         _equipmentDefinitionBL = equipmentDefinitionBL;
      }

      [HttpGet]
      public IActionResult Get(ODataQueryOptions<DtoEquipmentDefinition> options)
      {
         try
         {
            IQueryable<DtoEquipmentDefinition>? equipmentDefinitions = _equipmentDefinitionBL.GetEquipmentDefinitions();
            return Ok(options.ApplyTo(equipmentDefinitions));
         }
         catch (Exception e)
         {
            _logger.LogError($"GetEquipmentDefinitions: " + e.Message);
            return BadRequest("There was a problem querying for equipment definitions.");
         }
      }

      [HttpPost("check-exists")]
      public IActionResult CheckEquipmentDefinitionExists([FromBody] DtoEquipmentDefinitionSearchParams equipmentDefinitionDto)
      {
         System.Diagnostics.Debug.WriteLine($"Received equipment definition check request with data: {JsonConvert.SerializeObject(equipmentDefinitionDto)}");

         if (equipmentDefinitionDto == null)
         {
            System.Diagnostics.Debug.WriteLine("Equipment definition data is null.");
            return BadRequest("Invalid equipment definition data.");
         }

         try
         {
            bool exists = _equipmentDefinitionBL.CheckIfEquipmentDefinitionExists(equipmentDefinitionDto);
            System.Diagnostics.Debug.WriteLine($"Check exists result: {exists}");

            return Ok(new { Exists = exists });
         }
         catch (Exception e)
         {
            System.Diagnostics.Debug.WriteLine($"Error checking if equipment definition exists: {e}");
            return StatusCode(500, "There was a problem checking if the EquipmentDefinition exists.");
         }
      }


      [HttpGet("{key}")]
      public IActionResult Get(Guid key)
      {
         try
         {
            IQueryable<DtoEquipmentDefinition> equipmentDefinition = _equipmentDefinitionBL.GetEquipmentDefinitionById(key);
            if (equipmentDefinition != null)
            {
               return Ok(equipmentDefinition);
            }
            else
            {
               _logger.LogInformation($"GetEquipmentDefinitionById: Equipment Definition with id {key} not found.");
               return NotFound();
            }
         }
         catch (Exception e)
         {
            _logger.LogError($"GetEquipmentDefinitionById: " + e.Message);
            return BadRequest($"There was a problem querying for the equipment definition with id {key}.");
         }
      }

      [HttpPost]
      public async Task<IActionResult> Post([FromBody] DtoEquipmentDefinitionCreate dtoEquipmentDefinitionCreate)
      {
         System.Diagnostics.Debug.WriteLine($"ATTEMPTING TO CREATE NEW EQUIPMENT DEFINITION.");

         if (!ModelState.IsValid)
         {
            System.Diagnostics.Debug.WriteLine($"Validation failed: {JsonConvert.SerializeObject(ModelState)}");
            return BadRequest(ModelState);
         }
         else
         {
            System.Diagnostics.Debug.WriteLine($"Validation passed.");
         }


         try
         {
            // Create the equipment definition asynchronously and await the result
            var createdEquipmentDefinition = await _equipmentDefinitionBL.CreateEquipmentDefinition(dtoEquipmentDefinitionCreate);

            // Return a CreatedAtAction response with the new equipment definition
            return CreatedAtAction("Get", new { key = createdEquipmentDefinition.EquipmentDefinitionId }, createdEquipmentDefinition);
         }
         catch (Exception e)
         {
            // Log the error
            _logger.LogError($"CreateEquipmentDefinition: {e.Message}");

            // Return a 500 Internal Server Error
            return StatusCode(500, "There was a problem creating the Equipment Definition.");
         }
      }


      [HttpPut("{key}")]
      public IActionResult Put(Guid key, [FromBody] DtoEquipmentDefinitionUpdate dtoEquipmentDefinitionUpdate)
      {

         if (!ModelState.IsValid)
         {
            return BadRequest(ModelState);
         }

         try
         {
            _equipmentDefinitionBL.UpdateEquipmentDefinition(key, dtoEquipmentDefinitionUpdate);
         }
         catch (KeyNotFoundException e)
         {
            _logger.LogInformation($"UpdateEquipmentDefinition: " + e.Message);
            return NotFound();
         }
         catch (Exception e)
         {
            _logger.LogError($"UpdateEquipmentDefinition: " + e.Message);
            return BadRequest("There was a problem updating the equipment definition.");
         }

         return NoContent();
      }

      [HttpDelete("{key}")]
      public IActionResult Delete(Guid key)
      {
         try
         {
            _equipmentDefinitionBL.DeactivateEquipmentDefinition(key);
         }
         catch (KeyNotFoundException e)
         {
            _logger.LogInformation($"DeleteEquipmentDefinition: " + e.Message);
            return NotFound();
         }
         catch (Exception e)
         {
            _logger.LogError($"DeleteEquipmentDefinition: " + e.Message);
            return BadRequest("There was a problem deleting the equipment definition.");
         }

         return NoContent();
      }
   }
}
