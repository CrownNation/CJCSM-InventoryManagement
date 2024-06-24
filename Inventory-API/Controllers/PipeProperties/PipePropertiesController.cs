using Inventory_BLL.Interfaces;
using Inventory_Dto.Dto;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Inventory_API.Controllers
{
   [ApiController]
   [Route("[controller]")]
   public class PipePropertiesController : ControllerBase
   {
      private readonly ILogger<PipePropertiesController> _logger;
      private readonly IPipePropertiesBL _pipePropertiesBl;

      public PipePropertiesController(ILogger<PipePropertiesController> logger, IPipePropertiesBL pipePropertiesBl)
      {
         _logger = logger;
         _pipePropertiesBl = pipePropertiesBl;
      }

      [HttpGet]
      public async Task<IActionResult> GetAllPipeProperties()
      {
         try
         {
            var allPipeProperties = await _pipePropertiesBl.GetAllPipeProperties();
            return Ok(allPipeProperties);
         }
         catch (Exception e)
         {
            _logger.LogError("GetAllPipeProperties failed: " + e.Message);
            return StatusCode(500, "Internal server error");
         }
      }
   }
}
