using Inventory_BLL.Interfaces;
using Inventory_Dto.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace Inventory_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RackController : ODataController
    {

        private readonly ILogger<RackController> _logger;
        private readonly IRackBL _rackBl;

        public RackController(ILogger<RackController> logger, IRackBL rackBl)
        {
            _logger = logger;
        _rackBl = rackBl;
        }

        [HttpGet]
        public async Task<IActionResult> Get(ODataQueryOptions<DtoRack> options)
        {
            try
            {
                IQueryable<DtoRack>? racks = await _rackBl.GetRackList();
                return Ok(options.ApplyTo(racks));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetRacks: " + e.Message);
                throw new Exception("There was a problem querying for Racks.");
            }
        }

      /* Tally
       * TallyType
       * StartDate
       * EndDate
       * TallyNumber
       * Customer (this is provided in the actual URL)
       */

      /* Customer
       * List of customer
       * This shows a list of their pipe
       */

      /* Rack
       * A list of racks
       */

        [HttpGet("{key}")]
        public async Task<IActionResult> Get(Guid key, ODataQueryOptions<DtoRack> options)
        {
            try
            {
                DtoRack? rack = await _rackBl.GetRackById(key);

                if (rack == null)
                {
                    return NotFound();
                }

                // Step 1: Create a new list with the single 'rack' object
                var rackList = new List<DtoRack> { rack };

                // Step 2: Convert that list into an IQueryable
                var queryableRack = rackList.AsQueryable();

                // Step 3: Apply the OData options and return
                // Returning a 200 OK response, where the content of the response is the result of options.ApplyTo(queryableRack).
                // The options.ApplyTo() method is from the OData library and it applies the specified OData query
                // options (like filtering, sorting, etc.) to the provided IQueryable source.
                return Ok(options.ApplyTo(queryableRack));
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"GetRackById: " + e.Message);
                throw new Exception($"There was a problem querying for the rack with id {key}.");
            }
        }

        [HttpGet("WithPipe/{locationId}")]
        public async Task<IActionResult> GetRackListWithPipeAndCustomerByLocation(Guid locationId, ODataQueryOptions<DtoRack_WithPipe> options)
        {
            try
            {
                if (_rackBl == null)
                {
                    return NotFound();
                }

                IQueryable<DtoRack_WithPipe>? rackList = await _rackBl.GetRackListWithPipeAndCustomerByLocation(locationId);

                if (rackList == null)
                {
                    return NotFound();
                }

                // Step 2: Convert that list into an IQueryable
                var queryableRack = rackList.AsQueryable();

                // Step 3: Apply the OData options and return
                // Returning a 200 OK response, where the content of the response is the result of options.ApplyTo(queryableRack).
                // The options.ApplyTo() method is from the OData library and it applies the specified OData query
                // options (like filtering, sorting, etc.) to the provided IQueryable source.
                return Ok(options.ApplyTo(queryableRack));


            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"GetRackById: " + e.Message);
                throw new Exception($"There was a problem querying for the rack with LocationID: {locationId}.");
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DtoRackCreate rack)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DtoRack DtoRack;
            try
            {
                DtoRack = await _rackBl.CreateRack(rack);
            }
            catch (Exception e)
            {
                _logger.LogError($"CreateRack: " + e.Message);
                throw new Exception($"There was a problem creating rack.");
            }

            return CreatedAtAction("Get", new { key = DtoRack.RackId }, DtoRack);
        }
        

        [HttpPut("{key}")]
        public async Task<IActionResult> Put(Guid key, [FromBody] DtoRackUpdate dtoRack)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _rackBl.UpdateRack(dtoRack, key); // Call the asynchronous business logic method
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"UpdateRack: " + e.Message);
                throw new Exception($"There was a problem updating the rack with id {key}");
            }

            return NoContent();
        }


        [HttpDelete("{key}")]
        public IActionResult Delete(Guid key)
        {
            try
            {
                _rackBl.DeleteRack(key);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"DeleteRack: " + e.Message);
                throw new Exception($"There was a problem deleting the rack with id {key}");
            }

            return NoContent();
        }

        [HttpGet("dummy/{key}")]
        public IActionResult GetDummy(ODataQueryOptions<DtoRack> options)
        {
            DtoRack rack = new DtoRack();
            rack.RackId = Guid.NewGuid();
            rack.Name = "RackTest01";

            return Ok(rack);
        }


        [HttpGet("dummy")]
        public IActionResult GetDummies(ODataQueryOptions<List<DtoRack>> options)
        {
            DtoRack rack1 = new DtoRack();
            rack1.RackId = new Guid("2fcad579-f74b-4904-b50e-42735a02b2a1");
            rack1.Name = "RackTest01";
            rack1.ShopLocationId = Guid.NewGuid();

            DtoRack rack2 = new DtoRack();
            rack2.RackId = new Guid("69000f48-ce88-4bd0-af30-fde2cacf41eb");
            rack2.Name = "RackTest02";
            rack2.ShopLocationId = Guid.NewGuid();

            DtoRack rack3 = new DtoRack();
            rack3.RackId = new Guid("eb9160a6-3c03-426f-867f-82888051a564");
            rack3.Name = "RackTest03";
            rack3.ShopLocationId = Guid.NewGuid();

            List<DtoRack> racks = new List<DtoRack>();
            racks.Add(rack1);
            racks.Add(rack2);
            racks.Add(rack3);

            return Ok(racks);
        }



    }
}
