using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace Inventory_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EquipmentController : ODataController
    {
        private readonly ILogger<EquipmentController> _logger;
        private readonly IEquipmentBL _equipmentBL;

        public EquipmentController(ILogger<EquipmentController> logger, IEquipmentBL equipmentBL)
        {
            _logger = logger;
            _equipmentBL = equipmentBL;
        }

        [HttpGet]
        public IActionResult Get(ODataQueryOptions<Equipment> options)
        {
            try
            {
                var equipments = _equipmentBL.GetEquipments();
                return Ok(options.ApplyTo(equipments));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetEquipments: " + e.Message);
                return BadRequest("There was a problem querying for equipments.");
            }
        }

        [HttpGet("{key}")]
        public IActionResult Get(Guid key)
        {
            try
            {
                var equipment = _equipmentBL.GetEquipmentById(key);
                if (equipment != null)
                {
                    return Ok(equipment);
                }
                else
                {
                    _logger.LogInformation($"GetEquipmentById: Equipment with id {key} not found.");
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"GetEquipmentById: " + e.Message);
                return BadRequest($"There was a problem querying for the equipment with id {key}.");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] DtoEquipmentCreate dtoEquipmentCreate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var createdEquipment = _equipmentBL.CreateEquipment(dtoEquipmentCreate);
                return CreatedAtAction("Get", new { key = createdEquipment.EquipmentDefinitionId }, createdEquipment);
            }
            catch (Exception e)
            {
                _logger.LogError($"CreateEquipment: " + e.Message);
                return BadRequest("There was a problem creating the equipment.");
            }
        }

        [HttpPut("{key}")]
        public IActionResult Put(Guid key, [FromBody] DtoEquipmentUpdate dtoEquipmentUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _equipmentBL.UpdateEquipment(key, dtoEquipmentUpdate);
                return NoContent();
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"UpdateEquipment: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"UpdateEquipment: " + e.Message);
                return BadRequest("There was a problem updating the equipment.");
            }
        }

        [HttpDelete("{key}")]
        public IActionResult Delete(Guid key)
        {
            try
            {
                _equipmentBL.DeactivateEquipment(key);
                return NoContent();
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"DeleteEquipment: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"DeleteEquipment: " + e.Message);
                return BadRequest("There was a problem deleting the equipment.");
            }
        }
    }
}
