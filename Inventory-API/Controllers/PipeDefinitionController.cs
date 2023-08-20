using Inventory_BLL.Interfaces;
using Inventory_Dto.Dto;
using Inventory_Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using System.Linq.Expressions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Inventory_API.Controllers
{
   [ApiController]
   [Route("[controller]")]
   public class PipeDefinitionController : ODataController
   {

      private readonly ILogger<PipeDefinitionController> _logger;
      private readonly IPipeDefinitionBL _pipeDefinitionBl;
      
      public PipeDefinitionController(ILogger<PipeDefinitionController> logger, IPipeDefinitionBL pipeDefinitionBl)
      {
         _logger = logger;
         _pipeDefinitionBl = pipeDefinitionBl;
      }

      [HttpGet]
      public IActionResult Get(ODataQueryOptions<DtoPipeDefinition> options)
      {

         try
         {
            IQueryable<DtoPipeDefinition>? pipeDefinitions = _pipeDefinitionBl.GetPipeDefintions();
            return Ok(options.ApplyTo(pipeDefinitions));
         }
         catch(Exception e)
         {
            _logger.LogError($"GetPipeDefinitions: " + e.Message);
            throw new Exception("There was a problem querying for pipe defintinos.");
         }
      }

      [HttpGet("{key}")]
      public IActionResult Get(Guid key, ODataQueryOptions<DtoPipeDefinition> options)
      {
         try
         {
            IQueryable<DtoPipeDefinition>? pipeDefinition = _pipeDefinitionBl.GetPipeDefinitionById(key);
            return Ok(options.ApplyTo(pipeDefinition));
         }
         catch (KeyNotFoundException e)
         {
            return NotFound();
         }
         catch (Exception e)
         {
            _logger.LogError($"GetPipeDefinitionById: " + e.Message);
            throw new Exception($"There was a problem querying for the PipeDefinition with id {key}.");
         }
      }

      [HttpPost]
      public async Task<IActionResult> Post([FromBody] DtoPipeDefinitionCreate pipeDefinition)
      {
         if (!ModelState.IsValid)
         {
            return BadRequest(ModelState);
         }

            DtoPipeDefinition DtoPipeDefinition;
         try
         {
                DtoPipeDefinition = await _pipeDefinitionBl.CreatePipeDefinition(pipeDefinition);
         }
         catch (Exception e)
         {
            _logger.LogError($"CreatePipeDefinition: " + e.Message);
            throw new Exception($"There was a problem creating PipeDefinition.");
         }

         // Todo: This is not creating the correct odata path. The one below creates the regular endpoint, which works, just not odata, which is fine for now.
         //return CreatedAtAction(nameof(GetCustomerById), new { key = customerDto.CustomerId, odataPath = $"Customer/{customerDto.CustomerId}" }, customerDto);
         return CreatedAtAction("Get", new { key = DtoPipeDefinition.PipeDefinitionId }, DtoPipeDefinition);
      }

      [HttpPut("{key}")]
      public IActionResult Put(Guid key, [FromBody] DtoPipeDefinitionUpdate pipeDefinition)
      {
         if (!ModelState.IsValid)
         {
            return BadRequest(ModelState);
         }

         try
         {
                _pipeDefinitionBl.UpdatePipeDefinition(pipeDefinition, key);
         }
         catch (KeyNotFoundException e)
         {
            return NotFound();
         }
         catch (Exception e)
         {
            _logger.LogError($"UpdatePipeDefinitionr: " + e.Message);
            throw new Exception($"There was a problem updating the PipeDefinition with id {key}");
         }

         return NoContent();
      }


      [HttpDelete("{key}")]
      public IActionResult Delete(Guid key)
      {
         try
         {
                _pipeDefinitionBl.DeletePipeDefinition(key);
         }
         catch (KeyNotFoundException e)
         {
            return NotFound();
         }
         catch (Exception e)
         {
            _logger.LogError($"DeletePipeDefinition: " + e.Message);
            throw new Exception($"There was a problem deleting the PipeDefinition with id {key}");
         }

         return NoContent();
      }


   }
}
