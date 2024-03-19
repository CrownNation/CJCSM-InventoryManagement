using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;

namespace Inventory_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PipeProperty_RangeController : ODataController
    {
        private readonly ILogger<PipeProperty_RangeController> _logger;
        private readonly IPipeProperty_RangeBL _pipePropertyRangeBl;

        public PipeProperty_RangeController(ILogger<PipeProperty_RangeController> logger, IPipeProperty_RangeBL pipePropertyRangeBl)
        {
            _logger = logger;
            _pipePropertyRangeBl = pipePropertyRangeBl;
        }

        [HttpGet]
        public IActionResult Get(ODataQueryOptions<DtoPipeProperty_Range> options)
        {
            try
            {
                var ranges = _pipePropertyRangeBl.GetRanges();
                return Ok(options.ApplyTo(ranges));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetRanges: " + e.Message);
                return BadRequest("There was a problem querying for ranges.");
            }
        }

        [HttpGet("{key}")]
        public async Task<IActionResult> Get(Guid key)
        {
            try
            {
                var range = await _pipePropertyRangeBl.GetRangeById(key);
                if (range != null)
                {
                    return Ok(range);
                }
                else
                {
                    _logger.LogInformation($"GetRangeById: Range with id {key} not found.");
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"GetRangeById: " + e.Message);
                return BadRequest($"There was a problem querying for the range with id {key}.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DtoPipeProperty_Range range)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var createdRange = await _pipePropertyRangeBl.CreateRange(range);
                return CreatedAtAction("Get", new { key = createdRange.PipeProperty_RangeId }, createdRange);
            }
            catch (Exception e)
            {
                _logger.LogError($"CreateRange: " + e.Message);
                return BadRequest("There was a problem creating the range.");
            }
        }

        [HttpPut("{key}")]
        public async Task<IActionResult> Put(Guid key, [FromBody] DtoPipeProperty_RangeUpdate range)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _pipePropertyRangeBl.UpdateRange(range, key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"UpdateRange: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"UpdateRange: " + e.Message);
                return BadRequest("There was a problem updating the range.");
            }

            return NoContent();
        }

        [HttpDelete("{key}")]
        public async Task<IActionResult> Delete(Guid key)
        {
            try
            {
                await _pipePropertyRangeBl.DeactivateRange(key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"DeleteRange: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"DeleteRange: " + e.Message);
                return BadRequest("There was a problem deleting the range.");
            }

            return NoContent();
        }
    }
}
