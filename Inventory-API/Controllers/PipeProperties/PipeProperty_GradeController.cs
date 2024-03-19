using Inventory_BLL.Interfaces;
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
    public class PipeProperty_GradeController : ODataController
    {
        private readonly ILogger<PipeProperty_GradeController> _logger;
        private readonly IPipeProperty_GradeBL _pipePropertyGradeBl;

        public PipeProperty_GradeController(ILogger<PipeProperty_GradeController> logger, IPipeProperty_GradeBL pipePropertyGradeBl)
        {
            _logger = logger;
            _pipePropertyGradeBl = pipePropertyGradeBl;
        }

        [HttpGet]
        public IActionResult Get(ODataQueryOptions<DtoPipeProperty_Grade> options)
        {
            try
            {
                IQueryable<DtoPipeProperty_Grade> grades = _pipePropertyGradeBl.GetGrades();
                return Ok(options.ApplyTo(grades));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetGrades: " + e.Message);
                return BadRequest("There was a problem querying for grades.");
            }
        }

        [HttpGet("{key}")]
        public IActionResult Get(Guid key)
        {
            try
            {
                DtoPipeProperty_Grade? grade = _pipePropertyGradeBl.GetGradeById(key);
                return Ok(grade);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"GetGradeById: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"GetGradeById: " + e.Message);
                return BadRequest($"There was a problem querying for the grade with id {key}.");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] DtoPipeProperty_Grade grade)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DtoPipeProperty_Grade createdGrade;
            try
            {
                createdGrade = _pipePropertyGradeBl.CreateGrade(grade);
            }
            catch (Exception e)
            {
                _logger.LogError($"CreateGrade: " + e.Message);
                return BadRequest("There was a problem creating the grade.");
            }

            return CreatedAtAction("Get", new { key = createdGrade.PipeProperty_GradeId }, createdGrade);
        }

        [HttpPut("{key}")]
        public IActionResult Put(Guid key, [FromBody] DtoPipeProperty_GradeUpdate grade)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _pipePropertyGradeBl.UpdateGrade(grade, key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"UpdateGrade: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"UpdateGrade: " + e.Message);
                return BadRequest("There was a problem updating the grade.");
            }

            return NoContent();
        }

        [HttpDelete("{key}")]
        public IActionResult Delete(Guid key)
        {
            try
            {
                _pipePropertyGradeBl.DeactivateGrade(key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"DeleteGrade: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"DeleteGrade: " + e.Message);
                return BadRequest("There was a problem deleting the grade.");
            }

            return NoContent();
        }
    }
}
