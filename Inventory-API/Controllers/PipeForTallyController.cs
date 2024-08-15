using Inventory_BLL.Interfaces;
using Inventory_Dto.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace Inventory_API.Controllers
{
   [ApiController]
   [Route("[controller]")]
   public class PipeForTallyController : ODataController
   {
      private readonly ILogger<PipeForTallyController> _logger;
      private readonly IPipeForTallyBL _pipeForTallyBl;

      public PipeForTallyController(ILogger<PipeForTallyController> logger, IPipeForTallyBL pipeForTallyBl)
      {
         _logger = logger;
         _pipeForTallyBl = pipeForTallyBl;
      }


      [HttpGet("{tallyId}")]
      public IActionResult Get(Guid tallyId, ODataQueryOptions<DtoPipeForTally> options)
      {
         try
         {
            IQueryable<DtoPipeForTally>? pipe = _pipeForTallyBl.GetPipeForTallyByTallyId(tallyId);
            return Ok(options.ApplyTo(pipe));
         }
         catch (KeyNotFoundException e)
         {
            _logger.LogInformation($"GetPipeForTallyById: " + e.Message);
            return NotFound();
         }
         catch (Exception e)
         {
            _logger.LogError($"GetPipeForTallyById: " + e.Message);
            throw new Exception($"There was a problem querying for the pipe for tally with id {tallyId}.");
         }
      }

      [HttpGet("{tallyId}/withDefinition")]
      public async Task<IActionResult> GetPipeForTallyWithDefinitionList(Guid tallyId, ODataQueryOptions<DtoPipeForTally> options)
      {
         try
         {
            IQueryable<DtoPipeForTally>? pipes = await _pipeForTallyBl.GetPipeForTallyWithDefinitionListByTallyId(tallyId);
            return Ok(options.ApplyTo(pipes));
         }
         catch (Exception e)
         {
            _logger.LogError($"GetPipesForTallyWithDefinition: " + e.Message);
            throw new Exception("There was a problem querying for pipes for tally with definitions.");
         }
      }

      [HttpPost]
      public async Task<IActionResult> Post([FromBody] DtoPipeForTallyCreate pipeForTally)
      {
         if (!ModelState.IsValid)
         {
            return BadRequest(ModelState);
         }

         DtoPipeForTally DtoPipeForTally;
         try
         {
            DtoPipeForTally = await _pipeForTallyBl.CreatePipeForTally(pipeForTally);
         }
         catch (ArgumentNullException e)
         {
            _logger.LogError($"CreatePipeForTally: " + e.Message);
            return BadRequest(e.Message);
         }
         catch (Exception e)
         {
            _logger.LogError($"CreatePipeForTally: " + e.Message);
            throw new Exception("There was a problem creating the pipe for tally.");
         }

         return CreatedAtAction("Get", new { key = DtoPipeForTally.PipeForTallyId }, DtoPipeForTally);
      }


      [HttpDelete("{key}")]
      public IActionResult Delete(Guid key)
      {
         try
         {
            _pipeForTallyBl.DeletePipeForTally(key);
         }
         catch (KeyNotFoundException e)
         {
            _logger.LogInformation($"DeletePipeForTally: " + e.Message);
            return NotFound();
         }
         catch (Exception e)
         {
            _logger.LogError($"DeletePipeForTally: " + e.Message);
            throw new Exception($"There was a problem deleting the pipe for tally with id {key}.");
         }

         return NoContent();
      }
   }
}
