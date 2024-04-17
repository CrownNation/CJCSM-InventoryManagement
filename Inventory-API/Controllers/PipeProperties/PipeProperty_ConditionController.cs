using Inventory_BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Inventory_Dto.Dto;
using Inventory_BLL.BL;
using Microsoft.AspNetCore.OData.Query;

namespace Inventory_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PipeProperty_ConditionController : ODataController
    {
        private readonly ILogger<PipeProperty_ConditionController> _logger;
        private readonly IPipeProperty_ConditionBL _pipePropertyConditionBl;

        public PipeProperty_ConditionController(ILogger<PipeProperty_ConditionController> logger, IPipeProperty_ConditionBL pipePropertyConditionBl)
        {
            _logger = logger;
            _pipePropertyConditionBl = pipePropertyConditionBl;
        }

        [HttpGet]
        public IActionResult Get(ODataQueryOptions<DtoPipeProperty_Condition> options)
        {
            try
            {
                IQueryable<DtoPipeProperty_Condition> conditions = _pipePropertyConditionBl.GetConditions();
                return Ok(options.ApplyTo(conditions));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetConditions: " + e.Message);
                return BadRequest("There was a problem querying for conditions.");
            }
        }


        [HttpGet("{key}")]
        public async Task<IActionResult> Get(Guid key)
        {
            try
            {
                var condition = await _pipePropertyConditionBl.GetConditionByIdAsync(key);
                if (condition != null)
                {
                    return Ok(condition);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"GetConditionById: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"GetConditionById: " + e.Message);
                return BadRequest($"There was a problem querying for the condition with id {key}.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DtoPipeProperty_Condition conditionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var createdCondition = await _pipePropertyConditionBl.CreateConditionAsync(conditionDto);
                return CreatedAtAction("Get", new { key = createdCondition.PipeProperty_ConditionId }, createdCondition);
            }
            catch (Exception e)
            {
                _logger.LogError($"CreateCondition: " + e.Message);
                return BadRequest("There was a problem creating the condition.");
            }
        }

        [HttpPut("{key}")]
        public async Task<IActionResult> Put(Guid key, [FromBody] DtoPipeProperty_ConditionUpdate conditionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _pipePropertyConditionBl.UpdateConditionAsync(conditionDto, key);
                return NoContent();
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"UpdateCondition: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"UpdateCondition: " + e.Message);
                return BadRequest("There was a problem updating the condition.");
            }
        }

        [HttpDelete("{key}")]
        public async Task<IActionResult> Delete(Guid key)
        {
            try
            {
                await _pipePropertyConditionBl.DeactivateConditionAsync(key);
                return NoContent();
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"DeleteCondition: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"DeleteCondition: " + e.Message);
                return BadRequest("There was a problem deleting the condition.");
            }
        }
    }
}
