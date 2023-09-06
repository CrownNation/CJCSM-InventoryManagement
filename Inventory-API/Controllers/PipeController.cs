using Inventory_BLL.Interfaces;
using Inventory_Dto.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace Inventory_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PipeController : ODataController
    {
        private readonly ILogger<PipeController> _logger;
        private readonly IPipeBL _pipeBl;

        public PipeController(ILogger<PipeController> logger, IPipeBL pipeBl)
        {
            _logger = logger;
            _pipeBl = pipeBl;
        }

        [HttpGet]
        public IActionResult Get(ODataQueryOptions<DtoPipe> options)
        {
            try
            {
                IQueryable<DtoPipe>? pipes = _pipeBl.GetPipes();
                return Ok(options.ApplyTo(pipes));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetPipes: " + e.Message);
                throw new Exception("There was a problem querying for pipes.");
            }
        }

        [HttpGet("{key}")]
        public IActionResult Get(Guid key, ODataQueryOptions<DtoPipe> options)
        {
            try
            {
                IQueryable<DtoPipe>? pipe = _pipeBl.GetPipeById(key);
                return Ok(options.ApplyTo(pipe));
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"GetPipeById: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"GetPipeById: " + e.Message);
                throw new Exception($"There was a problem querying for the pipe with id {key}.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DtoPipeCreate pipe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DtoPipe DtoPipe;
            try
            {
                DtoPipe = await _pipeBl.CreatePipe(pipe);
            }
            catch (ArgumentNullException e)
            {
                _logger.LogError($"CreatePipe: " + e.Message);
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError($"CreatePipe: " + e.Message);
                throw new Exception("There was a problem creating pipe.");
            }

            return CreatedAtAction("Get", new { key = DtoPipe.PipeId }, DtoPipe);
        }

        [HttpPut("{key}")]
        public IActionResult Put(Guid key, [FromBody] DtoPipeUpdate pipe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _pipeBl.UpdatePipe(pipe, key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"UpdatePipe: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"UpdatePipe: " + e.Message);
                throw new Exception($"There was a problem updating the pipe with id {key}.");
            }

            return NoContent();
        }

        [HttpDelete("{key}")]
        public IActionResult Delete(Guid key)
        {
            try
            {
                _pipeBl.DeletePipe(key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"DeletePipe: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"DeletePipe: " + e.Message);
                throw new Exception($"There was a problem deleting the pipe with id {key}.");
            }

            return NoContent();
        }
    }
}
