using Inventory_BLL.Interfaces;
using Inventory_Dto.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace Inventory_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PipeProperty_WallController : ODataController
    {
        private readonly ILogger<PipeProperty_WallController> _logger;
        private readonly IPipeProperty_WallBL _pipePropertyWallBl;

        public PipeProperty_WallController(ILogger<PipeProperty_WallController> logger, IPipeProperty_WallBL pipePropertyWallBl)
        {
            _logger = logger;
            _pipePropertyWallBl = pipePropertyWallBl;
        }

        [HttpGet]
        public IActionResult Get(ODataQueryOptions<DtoPipeProperty_Wall> options)
        {
            try
            {
                var walls = _pipePropertyWallBl.GetWalls();
                return Ok(options.ApplyTo(walls));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetWalls: " + e.Message);
                return BadRequest("There was a problem querying for walls.");
            }
        }

        [HttpGet("{key}")]
        public async Task<IActionResult> Get(Guid key)
        {
            try
            {
                var wall = await _pipePropertyWallBl.GetWallById(key);
                if (wall != null)
                {
                    return Ok(wall);
                }
                else
                {
                    _logger.LogInformation($"GetWallById: Wall with id {key} not found.");
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                _logger.LogError($"GetWallById: " + e.Message);
                return BadRequest($"There was a problem querying for the wall with id {key}.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DtoPipeProperty_Wall wall)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var createdWall = await _pipePropertyWallBl.CreateWall(wall);
                return CreatedAtAction("Get", new { key = createdWall.PipeProperty_WallId }, createdWall);
            }
            catch (Exception e)
            {
                _logger.LogError($"CreateWall: " + e.Message);
                return BadRequest("There was a problem creating the wall.");
            }
        }

        [HttpPut("{key}")]
        public async Task<IActionResult> Put(Guid key, [FromBody] DtoPipeProperty_WallUpdate wall)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _pipePropertyWallBl.UpdateWall(wall, key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"UpdateWall: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"UpdateWall: " + e.Message);
                return BadRequest("There was a problem updating the wall.");
            }

            return NoContent();
        }

        [HttpDelete("{key}")]
        public async Task<IActionResult> Delete(Guid key)
        {
            try
            {
                await _pipePropertyWallBl.DeactivateWall(key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"DeleteWall: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"DeleteWall: " + e.Message);
                return BadRequest("There was a problem deleting the wall.");
            }

            return NoContent();
        }
    }
}
