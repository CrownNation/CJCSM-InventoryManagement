using Inventory_BLL.Interfaces;
using Inventory_Dto.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;

namespace Inventory_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TallyPipeController : ODataController
    {
        private readonly ILogger<TallyPipeController> _logger;
        private readonly ITallyPipeBL _tallyPipeBl;

        public TallyPipeController(ILogger<TallyPipeController> logger, ITallyPipeBL tallyPipeBl)
        {
            _logger = logger;
            _tallyPipeBl = tallyPipeBl;
        }

        [HttpGet]
        public IActionResult GetAll(ODataQueryOptions<DtoTallyPipe> options)
        {
            try
            {
                IQueryable<DtoTallyPipe>? tallyPipes = _tallyPipeBl.GetTallyPipes();
                return Ok(options.ApplyTo(tallyPipes));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetTallyPipes: " + e.Message);
                throw new Exception("There was a problem querying for tally pipes.");
            }
        }

        [HttpGet("{tallyId}/{pipeId}")]
        public IActionResult Get(Guid tallyId, Guid pipeId, ODataQueryOptions<DtoTallyPipe> options)
        {
            try
            {
                IQueryable<DtoTallyPipe>? tallyPipe = _tallyPipeBl.GetTallyPipeByCompositeKey(tallyId, pipeId);
                return Ok(options.ApplyTo(tallyPipe));
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"GetTallyPipeByCompositeKey: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"GetTallyPipeByCompositeKey: " + e.Message);
                throw new Exception($"There was a problem querying for the tally pipe with TallyId {tallyId} and PipeId {pipeId}.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DtoTallyPipe tallyPipe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DtoTallyPipe DtoTallyPipe;
            try
            {
                DtoTallyPipe = await _tallyPipeBl.CreateTallyPipe(tallyPipe);
            }
            catch (ArgumentNullException e)
            {
                _logger.LogError($"CreateTallyPipe: " + e.Message);
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError($"CreateTallyPipe: " + e.Message);
                throw new Exception("There was a problem creating tally pipe.");
            }

            return CreatedAtAction("Get", new { tallyId = DtoTallyPipe.TallyId, pipeId = DtoTallyPipe.PipeId }, DtoTallyPipe);
        }

        [HttpPut("{tallyId}/{pipeId}")]
        public IActionResult Put(Guid tallyId, Guid pipeId, [FromBody] DtoTallyPipe tallyPipe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _tallyPipeBl.UpdateTallyPipe(tallyPipe, tallyId, pipeId);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"UpdateTallyPipe: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"UpdateTallyPipe: " + e.Message);
                throw new Exception($"There was a problem updating the tally pipe with TallyId {tallyId} and PipeId {pipeId}.");
            }

            return NoContent();
        }

        [HttpDelete("{tallyId}/{pipeId}")]
        public IActionResult Delete(Guid tallyId, Guid pipeId)
        {
            try
            {
                _tallyPipeBl.DeleteTallyPipe(tallyId, pipeId);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"DeleteTallyPipe: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"DeleteTallyPipe: " + e.Message);
                throw new Exception($"There was a problem deleting the tally pipe with TallyId {tallyId} and PipeId {pipeId}.");
            }

            return NoContent();
        }
    }
}
