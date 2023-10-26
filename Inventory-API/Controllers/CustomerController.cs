using Inventory_BLL.Interfaces;
using Inventory_Dto.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace Inventory_API.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class CustomerController : ODataController
    {
        // In an ASP.NET Core application, registering the ILogger is done automatically by the framework when you use Dependency Injection(DI)
        // to inject it into your classes.
        private readonly ILogger<CustomerController> _logger;
        private readonly ICustomerBL _customerBl;

        public CustomerController(ILogger<CustomerController> logger, ICustomerBL customerBl)
        {
            System.Diagnostics.Debug.WriteLine("INJECTING INTO CUSTOMER CONTROLLER");
            _logger = logger;
            _customerBl = customerBl;
        }

        [HttpGet]
        public IActionResult Get(ODataQueryOptions<DtoCustomer> options)
        {

            try
            {
                IQueryable<DtoCustomer>? customers = _customerBl.GetCustomers();
                return Ok(options.ApplyTo(customers));
            }
            catch (Exception e)
            {
                _logger.LogError($"GetCustomers: " + e.Message);
                throw new Exception("There was a problem querying for customers.");
            }
        }

        [HttpGet("{key}")]
        public IActionResult Get(Guid key, ODataQueryOptions<DtoCustomer> options)
        {
            try
            {
                IQueryable<DtoCustomer>? customer = _customerBl.GetCustomerById(key);
                // Todo: this should return a SingleResult
                return Ok(options.ApplyTo(customer));
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"GetCustomerById: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"GetCustomerById: " + e.Message);
                throw new Exception($"There was a problem querying for the customer with id {key}.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DtoCustomerCreate customer)
        {
            //This checks the incoming data based on the attributes in the DtoCustomerCreate class (eg. [StringLength(50)]). If the data is invalid, it returns a 400 Bad Request.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DtoCustomer DtoCustomer;
            try
            {
                DtoCustomer = await _customerBl.CreateCustomer(customer);
            }
            catch (ArgumentNullException e)
            {
                _logger.LogError($"CreateCustomer: " + e.Message);
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError($"CreateCustomer: " + e.Message);
                throw new Exception($"There was a problem creating customer.");
            }

            // Todo: This is not creating the correct odata path. The one below creates the regular endpoint, which works, just not odata, which is fine for now.
            //return CreatedAtAction(nameof(GetCustomerById), new { key = DtoCustomer.CustomerId, odataPath = $"Customer/{DtoCustomer.CustomerId}" }, DtoCustomer);
            return CreatedAtAction("Get", new { key = DtoCustomer.CustomerId }, DtoCustomer);
        }

        [HttpPut("{key}")]
        public IActionResult Put(Guid key, [FromBody] DtoCustomerUpdate customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _customerBl.UpdateCustomer(customer, key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"UpdateCustomer: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"UpdateCustomer: " + e.Message);
                throw new Exception($"There was a problem updating the customer with id {key}");
            }

            return NoContent();
        }


        [HttpDelete("{key}")]
        public IActionResult Delete(Guid key)
        {
            try
            {
                _customerBl.DeleteCustomer(key);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogInformation($"DeleteCustomer: " + e.Message);
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"DeleteCustomer: " + e.Message);
                throw new Exception($"There was a problem deleting the customer with id {key}");
            }

            return NoContent();
        }


    }
}
