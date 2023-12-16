using Inventory_BLL.BL;
using Inventory_BLL.Interfaces;
using Inventory_Dto.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Inventory_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TallyController : ODataController
    {
        private readonly ILogger<TallyController> _logger;
        private readonly ITallyBL _tallyBl;

        public TallyController(ILogger<TallyController> logger, ITallyBL tallyBl)
        {
            _logger = logger;
            _tallyBl = tallyBl;
        }

        [HttpGet]
        public IActionResult GetTallyWithFilters(ODataQueryOptions<DtoTally_WithPipeAndCustomer> options)
        {
            try
            {
                IQueryable<DtoTally_WithPipeAndCustomer> tallyQuery = _tallyBl.GetTallyWithPipeQuery();

                if (tallyQuery == null)
                {
                    return NotFound();
                }

                return Ok(options.ApplyTo(tallyQuery));
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"GetTallyWithFilters: " + e.Message);
                throw new Exception($"There was a problem querying for the tally with filters. " + e.Message);
            }
        }

        [HttpGet("Basic")]
        public async Task<IActionResult> Get(ODataQueryOptions<DtoTally_WithPipeAndCustomer> options)
        {
            try
            {
                IQueryable<DtoTally_WithPipeAndCustomer>? tallies = await _tallyBl.GetTallies();
                return Ok(options.ApplyTo(tallies));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetTallies: " + e.Message);
                throw new Exception("There was a problem querying for tallies.");
            }
        }


        [HttpGet("{key}")]
        public async Task<IActionResult> Get(Guid key, ODataQueryOptions<DtoTally_WithPipeAndCustomer> options)
        {
            try
            {
                DtoTally_WithPipeAndCustomer tally = await _tallyBl.GetTallyById(key);

                return Ok(tally);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"GetTallyById: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"GetTallyById: " + e.Message);
                throw new Exception($"There was a problem querying for the tally with id {key}.");
            }
        }

        /* ------Create Tally ------ */
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DtoTallyCreate tally)  
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DtoTally_WithPipeAndCustomer DtoTally;
            try
            {
                DtoTally = await _tallyBl.CreateTallyWithPipe(tally);
            }
            catch (ArgumentNullException e)
            {
                _logger.LogError($"CreateTally: " + e.Message);
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError($"CreateTally: " + e.Message);
                throw new Exception("There was a problem creating tally.");
            }

            return CreatedAtAction("Get", new { key = DtoTally.TallyId }, DtoTally);
        }

  
        [HttpPut("{key}")]
        public async Task<IActionResult> Put(Guid key, [FromBody] DtoTallyUpdate tally)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _tallyBl.UpdateTally(tally, key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"UpdateTally: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"UpdateTally: " + e.Message);
                throw new Exception($"There was a problem updating the tally with id {key}.");
            }

            return NoContent();
        }

        [HttpDelete("{key}")]
        public IActionResult Delete(Guid key)
        {
            try
            {
                _tallyBl.DeleteTally(key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"DeleteTally: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"DeleteTally: " + e.Message);
                throw new Exception($"There was a problem deleting the tally with id {key}.");
            }

            return NoContent();
        }
    }
}
