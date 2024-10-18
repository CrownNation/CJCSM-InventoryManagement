using Inventory_BLL.Interfaces;
using Inventory_Models.DTO.Basic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace Inventory_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
   public class TallyEquipmentController : ODataController
    {
        private readonly ILogger<TallyEquipmentController> _logger;
        private readonly ITallyEquipmentBL _tallyEquipmentBL;

        public TallyEquipmentController(ILogger<TallyEquipmentController> logger, ITallyEquipmentBL tallyEquipmentBL)
        {
            _logger = logger;
            _tallyEquipmentBL = tallyEquipmentBL;
        }

        [HttpGet]
        public IActionResult GetAll(ODataQueryOptions<DtoTallyEquipment> options)
        {
            try
            {
                IQueryable<DtoTallyEquipment>? tallyEquipments = _tallyEquipmentBL.GetTallyEquipmentList();
                return Ok(options.ApplyTo(tallyEquipments));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetTallyEquipmentList: " + e.Message);
                return BadRequest("There was a problem querying for tally equipments.");
            }
        }

        [HttpGet("{tallyId}/{equipmentId}")]
        public IActionResult Get(Guid tallyId, Guid equipmentId, ODataQueryOptions<DtoTallyEquipment> options)
        {
            try
            {
                IQueryable<DtoTallyEquipment>? tallyEquipment = _tallyEquipmentBL.GetTallyEquipmentByCompositeKey(tallyId, equipmentId);
                if (tallyEquipment != null)
                {
                    return Ok(options.ApplyTo(tallyEquipment));
                }
                return NotFound();
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"GetTallyEquipmentByCompositeKey: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"GetTallyEquipmentByCompositeKey: " + e.Message);
                return BadRequest($"There was a problem querying for the tally equipment with TallyId {tallyId} and EquipmentId {equipmentId}.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DtoTallyEquipment dtoTallyEquipment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                DtoTallyEquipment createdTallyEquipment = await _tallyEquipmentBL.CreateTallyEquipment(dtoTallyEquipment);
                return CreatedAtAction("Get", new { tallyId = createdTallyEquipment.TallyId, equipmentId = createdTallyEquipment.EquipmentId }, createdTallyEquipment);
            }
            catch (ArgumentNullException e)
            {
                _logger.LogError($"CreateTallyEquipment: " + e.Message);
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError($"CreateTallyEquipment: " + e.Message);
                return BadRequest("There was a problem creating the tally equipment.");
            }
        }

        [HttpPut("{tallyId}/{equipmentId}")]
        public IActionResult Put(Guid tallyId, Guid equipmentId, [FromBody] DtoTallyEquipment dtoTallyEquipment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _tallyEquipmentBL.UpdateTallyEquipment(dtoTallyEquipment, tallyId, equipmentId);
                return NoContent();
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"UpdateTallyEquipment: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"UpdateTallyEquipment: " + e.Message);
                return BadRequest($"There was a problem updating the tally equipment with TallyId {tallyId} and EquipmentId {equipmentId}.");
            }
        }

        [HttpDelete("{tallyId}/{equipmentId}")]
        public IActionResult Delete(Guid tallyId, Guid equipmentId)
        {
            try
            {
                _tallyEquipmentBL.DeleteTallyEquipment(tallyId, equipmentId);
                return NoContent();
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"DeleteTallyEquipment: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"DeleteTallyEquipment: " + e.Message);
                return BadRequest("There was a problem deleting the tally equipment with TallyId {tallyId} and EquipmentId {equipmentId}.");
            }
        }
    }
}
