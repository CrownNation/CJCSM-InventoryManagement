using Inventory_BLL.Interfaces;
using Inventory_Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace Inventory_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShopLocationController : ODataController
    {
        private readonly ILogger<ShopLocationController> _logger;
        private readonly IShopLocationBL _shopLocationBl;

        public ShopLocationController(ILogger<ShopLocationController> logger, IShopLocationBL shopLocationBl)
        {
            System.Diagnostics.Debug.WriteLine("INJECTING INTO SHOP LOCATION CONTROLLER");
            _logger = logger;
            _shopLocationBl = shopLocationBl;
        }

        [HttpGet]
        public IActionResult Get(ODataQueryOptions<DtoShopLocation> options)
        {
            try
            {
                IQueryable<DtoShopLocation>? shopLocations = _shopLocationBl.GetShopLocations();
                return Ok(options.ApplyTo(shopLocations));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetShopLocations: " + e.Message);
                throw new Exception("There was a problem querying for shop locations.");
            }
        }

        [HttpGet("{key}")]
        public IActionResult Get(Guid key, ODataQueryOptions<DtoShopLocation> options)
        {
            try
            {
                IQueryable<DtoShopLocation>? shopLocation = _shopLocationBl.GetShopLocationById(key);
                return Ok(options.ApplyTo(shopLocation));
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"GetShopLocationById: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"GetShopLocationById: " + e.Message);
                throw new Exception($"There was a problem querying for the shop location with id {key}.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DtoShopLocationCreateAndUpdate shopLocation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DtoShopLocation DtoShopLocation;
            try
            {
                DtoShopLocation = await _shopLocationBl.CreateShopLocation(shopLocation);
            }
            catch (ArgumentNullException e)
            {
                _logger.LogError($"CreateShopLocation: " + e.Message);
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError($"CreateShopLocation: " + e.Message);
                throw new Exception($"There was a problem creating shop location.");
            }

            return CreatedAtAction("Get", new { key = DtoShopLocation.ShopLocationId }, DtoShopLocation);
        }

        [HttpPut("{key}")]
        public IActionResult Put(Guid key, [FromBody] DtoShopLocationCreateAndUpdate shopLocation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _shopLocationBl.UpdateShopLocation(shopLocation, key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"UpdateShopLocation: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"UpdateShopLocation: " + e.Message);
                throw new Exception($"There was a problem updating the shop location with id {key}");
            }

            return NoContent();
        }

        [HttpDelete("{key}")]
        public IActionResult Delete(Guid key)
        {
            try
            {
                _shopLocationBl.DeleteShopLocation(key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"DeleteShopLocation: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"DeleteShopLocation: " + e.Message);
                throw new Exception($"There was a problem deleting the shop location with id {key}");
            }

            return NoContent();
        }
    }
}
