using Inventory_BLL.BL;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Documents;
using Inventory_Dto.Dto;
using Inventory_Models.DTO.Basic;
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

        //Get all equipment WITHOUT equipment definitions and apply odata filters to it.
        [HttpGet]
        public IActionResult Get(ODataQueryOptions<Equipment> options)
        {
            try
            {
                IQueryable<Equipment> equipmentList = _equipmentBL.GetEquipmentList();
                return Ok(options.ApplyTo(equipmentList));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetEquipments: " + e.Message);
                return BadRequest("There was a problem querying for equipments.");
            }
        }

        // Get all equipment WITH equipment definitions and apply odata filters to it.
        [HttpGet("withDefinition")]
        public IActionResult GetEquipmentWithDefinitionList(ODataQueryOptions<DtoEquipment> options)
        {
            try
            {
                IQueryable<DtoEquipment> equipmentQuery = _equipmentBL.GetEquipmentWithDefinitionList();
                return Ok(options.ApplyTo(equipmentQuery));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetEquipments: " + e.Message);
                return BadRequest("There was a problem querying for equipments.");
            }
        }

        //Get a specific piece of equipment with the associated definition.
        [HttpGet("{key}")]
        public IActionResult Get(Guid key)
        {
            try
            {
                Equipment equipment = _equipmentBL.GetEquipmentById(key);
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

        [HttpGet("{key}/withDefinition")]
        public IActionResult GetEquipmentWithDefinitionById(Guid key)
        {
            try
            {
                IQueryable<DtoEquipment> equipment = _equipmentBL.GetEquipmentWithDefinitionById(key);
                if (equipment != null)
                {
                    return Ok(equipment);
                }
                else
                {
                    _logger.LogInformation($"GetEquipmentWithDefinitionById: Equipment with id {key} not found.");
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"GetEquipmentWithDefinitionById: " + e.Message);
                return BadRequest($"There was a problem querying for the equipment with id {key}.");
            }
        }


        [HttpGet("GenerateEquipmentSummaryPdf")]
        public IActionResult GeneratePdf()
        {
            try
            {
                IQueryable<DtoEquipment> equipmentQuery =_equipmentBL.GetEquipmentWithDefinitionList();

                List<DtoEquipment> equipmentList = equipmentQuery.ToList();

                if (equipmentList == null)
                    return NotFound();

                EquipmentPdfGenerator generator = new EquipmentPdfGenerator();

                Stream pdfStream = generator.GenerateEquipmentSummaryPDFDocuemnt(equipmentList);

                String filename = $"EquipmentReport_{DateTime.Now.ToString("yyyy-MM-dd.HH-mm")}.pdf";
                return File(pdfStream, "application/pdf", filename);
            }
            catch (Exception e)
            {
                _logger.LogError($"Rack GeneratePdf: " + e.Message);
                return StatusCode(500, e.Message);
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
