using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace Inventory_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PipeProperty_CoatingController : ODataController
    {
        private readonly ILogger<PipeProperty_CoatingController> _logger;
        private readonly IPipeProperty_CoatingBL _pipePropertyCoatingBl;

        public PipeProperty_CoatingController(ILogger<PipeProperty_CoatingController> logger, IPipeProperty_CoatingBL pipePropertyCoatingBl)
        {
            _logger = logger;
            _pipePropertyCoatingBl = pipePropertyCoatingBl;
        }

        [HttpGet]
        public IActionResult Get(ODataQueryOptions<DtoPipeProperty_Coating> options)
        {
            try
            {
                IQueryable<DtoPipeProperty_Coating> coatings = _pipePropertyCoatingBl.GetCoatings();
                return Ok(options.ApplyTo(coatings));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetCoatings: " + e.Message);
                return BadRequest("There was a problem querying for coatings.");
            }
        }

        [HttpGet("{key}")]
        public IActionResult Get(Guid key)
        {
            try
            {
                DtoPipeProperty_Coating? coating = _pipePropertyCoatingBl.GetCoatingById(key);
                return Ok(coating);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"GetCoatingById: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"GetCoatingById: " + e.Message);
                return BadRequest($"There was a problem querying for the coating with id {key}.");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] DtoPipeProperty_Coating coating)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DtoPipeProperty_Coating createdCoating;
            try
            {
                createdCoating = _pipePropertyCoatingBl.CreateCoating(coating);
            }
            catch (Exception e)
            {
                _logger.LogError($"CreateCoating: " + e.Message);
                return BadRequest("There was a problem creating the coating.");
            }

            return CreatedAtAction("Get", new { key = createdCoating.PipeProperty_CoatingId }, createdCoating);
        }

        [HttpPut("{key}")]
        public IActionResult Put(Guid key, [FromBody] DtoPipeProperty_CoatingUpdate coating)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _pipePropertyCoatingBl.UpdateCoating(coating, key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"UpdateCoating: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"UpdateCoating: " + e.Message);
                return BadRequest("There was a problem updating the coating.");
            }

            return NoContent();
        }

        [HttpDelete("{key}")]
        public IActionResult Delete(Guid key)
        {
            try
            {
                _pipePropertyCoatingBl.DeactivateCoating(key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"DeleteCoating: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"DeleteCoating: " + e.Message);
                return BadRequest("There was a problem deleting the coating.");
            }

            return NoContent();
        }
    }
}
