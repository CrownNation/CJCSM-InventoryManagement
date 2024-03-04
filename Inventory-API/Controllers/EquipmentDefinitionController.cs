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
        public IActionResult Get(ODataQueryOptions<EquipmentDefinition> options)
        {
            try
            {
                IQueryable<EquipmentDefinition>? equipmentDefinitions = _equipmentDefinitionBL.GetEquipmentDefinitions();
                return Ok(options.ApplyTo(equipmentDefinitions));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetEquipmentDefinitions: " + e.Message);
                return BadRequest("There was a problem querying for equipment definitions.");
            }
        }

        [HttpGet("{key}")]
        public IActionResult Get(Guid key)
        {
            try
            {
                var equipmentDefinition = _equipmentDefinitionBL.GetEquipmentDefinitionById(key);
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
        public IActionResult Post([FromBody] DtoEquipmentDefinitionCreate dtoEquipmentDefinitionCreate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdEquipmentDefinition = _equipmentDefinitionBL.CreateEquipmentDefinition(dtoEquipmentDefinitionCreate);
            return CreatedAtAction("Get", new { key = createdEquipmentDefinition.EquipmentDefinitionId }, createdEquipmentDefinition);
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
