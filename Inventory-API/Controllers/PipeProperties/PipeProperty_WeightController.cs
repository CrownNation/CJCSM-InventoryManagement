using Inventory_BLL.Interfaces;
using Inventory_Dto.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace Inventory_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PipeProperty_WeightController : ODataController
    {
        private readonly ILogger<PipeProperty_WeightController> _logger;
        private readonly IPipeProperty_WeightBL _pipePropertyWeightBl;

        public PipeProperty_WeightController(ILogger<PipeProperty_WeightController> logger, IPipeProperty_WeightBL pipePropertyWeightBl)
        {
            _logger = logger;
            _pipePropertyWeightBl = pipePropertyWeightBl;
        }

        [HttpGet]
        public IActionResult Get(ODataQueryOptions<DtoPipeProperty_Weight> options)
        {
            try
            {
                var weights = _pipePropertyWeightBl.GetWeights();
                return Ok(options.ApplyTo(weights));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetWeights: " + e.Message);
                return BadRequest("There was a problem querying for weights.");
            }
        }

        [HttpGet("{key}")]
        public async Task<IActionResult> Get(Guid key)
        {
            try
            {
                var weight = await _pipePropertyWeightBl.GetWeightById(key);
                if (weight != null)
                {
                    return Ok(weight);
                }
                else
                {
                    _logger.LogInformation($"GetWeightById: Weight with id {key} not found.");
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"GetWeightById: " + e.Message);
                return BadRequest($"There was a problem querying for the weight with id {key}.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DtoPipeProperty_Weight weight)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var createdWeight = await _pipePropertyWeightBl.CreateWeight(weight);
                return CreatedAtAction("Get", new { key = createdWeight.PipeProperty_WeightId }, createdWeight);
            }
            catch (Exception e)
            {
                _logger.LogError($"CreateWeight: " + e.Message);
                return BadRequest("There was a problem creating the weight.");
            }
        }

        [HttpPut("{key}")]
        public async Task<IActionResult> Put(Guid key, [FromBody] DtoPipeProperty_WeightUpdate weight)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _pipePropertyWeightBl.UpdateWeight(weight, key);
                return NoContent();
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"UpdateWeight: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"UpdateWeight: " + e.Message);
                return BadRequest("There was a problem updating the weight.");
            }
        }

        [HttpDelete("{key}")]
        public async Task<IActionResult> Delete(Guid key)
        {
            try
            {
                await _pipePropertyWeightBl.DeactivateWeight(key);
                return NoContent();
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"DeleteWeight: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"DeleteWeight: " + e.Message);
                return BadRequest("There was a problem deleting the weight.");
            }
        }
    }
}
