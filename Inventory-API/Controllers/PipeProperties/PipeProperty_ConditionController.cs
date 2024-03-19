using Inventory_BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Inventory_Dto.Dto;

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
        public IActionResult Get(Guid key)
        {
            try
            {
                DtoPipeProperty_Condition? condition = _pipePropertyConditionBl.GetConditionById(key);
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
        public IActionResult Post([FromBody] DtoPipeProperty_Condition condition)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DtoPipeProperty_Condition createdCondition;
            try
            {
                createdCondition = _pipePropertyConditionBl.CreateCondition(condition);
            }
            catch (Exception e)
            {
                _logger.LogError($"CreateCondition: " + e.Message);
                return BadRequest("There was a problem creating the condition.");
            }

            return CreatedAtAction("Get", new { key = createdCondition.PipeProperty_ConditionId }, createdCondition);
        }

        [HttpPut("{key}")]
        public IActionResult Put(Guid key, [FromBody] DtoPipeProperty_ConditionUpdate condition)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _pipePropertyConditionBl.UpdateCondition(condition, key);
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

            return NoContent();
        }

        [HttpDelete("{key}")]
        public IActionResult Delete(Guid key)
        {
            try
            {
                _pipePropertyConditionBl.DeactivateCondition(key);
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

            return NoContent();
        }
    }
}
