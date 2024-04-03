using Inventory_BLL.Interfaces;
using Inventory_Dto.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace Inventory_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PipeProperty_SizeController : ODataController
    {
        private readonly ILogger<PipeProperty_SizeController> _logger;
        private readonly IPipeProperty_SizeBL _pipePropertySizeBl;

        public PipeProperty_SizeController(ILogger<PipeProperty_SizeController> logger, IPipeProperty_SizeBL pipePropertySizeBl)
        {
            _logger = logger;
            _pipePropertySizeBl = pipePropertySizeBl;
        }

        [HttpGet]
        public IActionResult Get(ODataQueryOptions<DtoPipeProperty_Size> options)
        {
            try
            {
                var sizes = _pipePropertySizeBl.GetSizes();
                return Ok(options.ApplyTo(sizes));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetSizes: " + e.Message);
                return BadRequest("There was a problem querying for sizes.");
            }
        }

        [HttpGet("{key}")]
        public async Task<IActionResult> Get(Guid key)
        {
            try
            {
                var size = await _pipePropertySizeBl.GetSizeById(key);
                if (size != null)
                {
                    return Ok(size);
                }
                else
                {
                    _logger.LogInformation($"GetSizeById: Size with id {key} not found.");
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"GetSizeById: " + e.Message);
                return BadRequest($"There was a problem querying for the size with id {key}.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DtoPipeProperty_Size size)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var createdSize = await _pipePropertySizeBl.CreateSize(size);
                return CreatedAtAction("Get", new { key = createdSize.PipeProperty_SizeId }, createdSize);
            }
            catch (Exception e)
            {
                _logger.LogError($"CreateSize: " + e.Message);
                return BadRequest("There was a problem creating the size.");
            }
        }

        [HttpPut("{key}")]
        public async Task<IActionResult> Put(Guid key, [FromBody] DtoPipeProperty_SizeUpdate size)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _pipePropertySizeBl.UpdateSize(size, key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"UpdateSize: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"UpdateSize: " + e.Message);
                return BadRequest("There was a problem updating the size.");
            }

            return NoContent();
        }

        [HttpDelete("{key}")]
        public async Task<IActionResult> Delete(Guid key)
        {
            try
            {
                await _pipePropertySizeBl.DeactivateSize(key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"DeleteSize: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"DeleteSize: " + e.Message);
                return BadRequest("There was a problem deleting the size.");
            }

            return NoContent();
        }
    }
}
