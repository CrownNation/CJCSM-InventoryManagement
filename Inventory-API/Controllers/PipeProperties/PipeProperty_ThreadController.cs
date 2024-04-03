using Inventory_BLL.Interfaces;
using Inventory_Dto.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace Inventory_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PipeProperty_ThreadController : ODataController
    {
        private readonly ILogger<PipeProperty_ThreadController> _logger;
        private readonly IPipeProperty_ThreadBL _pipePropertyThreadBl;

        public PipeProperty_ThreadController(ILogger<PipeProperty_ThreadController> logger, IPipeProperty_ThreadBL pipePropertyThreadBl)
        {
            _logger = logger;
            _pipePropertyThreadBl = pipePropertyThreadBl;
        }

        [HttpGet]
        public IActionResult Get(ODataQueryOptions<DtoPipeProperty_Thread> options)
        {
            try
            {
                var threads = _pipePropertyThreadBl.GetThreads();
                return Ok(options.ApplyTo(threads));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetThreads: " + e.Message);
                return BadRequest("There was a problem querying for threads.");
            }
        }

        [HttpGet("{key}")]
        public async Task<IActionResult> Get(Guid key)
        {
            try
            {
                var thread = await _pipePropertyThreadBl.GetThreadById(key);
                if (thread != null)
                {
                    return Ok(thread);
                }
                else
                {
                    _logger.LogInformation($"GetThreadById: Thread with id {key} not found.");
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"GetThreadById: " + e.Message);
                return BadRequest($"There was a problem querying for the thread with id {key}.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DtoPipeProperty_Thread thread)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var createdThread = await _pipePropertyThreadBl.CreateThread(thread);
                return CreatedAtAction("Get", new { key = createdThread.PipeProperty_ThreadId }, createdThread);
            }
            catch (Exception e)
            {
                _logger.LogError($"CreateThread: " + e.Message);
                return BadRequest("There was a problem creating the thread.");
            }
        }

        [HttpPut("{key}")]
        public async Task<IActionResult> Put(Guid key, [FromBody] DtoPipeProperty_ThreadUpdate thread)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _pipePropertyThreadBl.UpdateThread(thread, key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"UpdateThread: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"UpdateThread: " + e.Message);
                return BadRequest("There was a problem updating the thread.");
            }

            return NoContent();
        }

        [HttpDelete("{key}")]
        public async Task<IActionResult> Delete(Guid key)
        {
            try
            {
                await _pipePropertyThreadBl.DeactivateThread(key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"DeleteThread: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"DeleteThread: " + e.Message);
                return BadRequest("There was a problem deleting the thread.");
            }

            return NoContent();
        }
    }
}
