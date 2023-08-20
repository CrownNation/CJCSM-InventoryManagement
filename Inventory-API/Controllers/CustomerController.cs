using Inventory_BLL.Interfaces;
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
   public class CustomerController : ODataController
   {

      private readonly ILogger<CustomerController> _logger;
      private readonly ICustomerBL _customerBl;
      
      public CustomerController(ILogger<CustomerController> logger, ICustomerBL customerBl)
      {
         _logger = logger;
         _customerBl = customerBl;
      }

      [HttpGet]
      public IActionResult Get(ODataQueryOptions<CustomerDto> options)
      {

         try
         {
            IQueryable<CustomerDto>? customers = _customerBl.GetCustomers();
            return Ok(options.ApplyTo(customers));
         }
         catch(Exception e)
         {
            _logger.LogError($"GetCustomers: " + e.Message);
            throw new Exception("There was a problem querying for customers.");
         }
      }

      [HttpGet("{key}")]
      public IActionResult Get(Guid key, ODataQueryOptions<CustomerDto> options)
      {
         try
         {
            IQueryable<CustomerDto>? customer = _customerBl.GetCustomerById(key);
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
         if (!ModelState.IsValid)
         {
            return BadRequest(ModelState);
         }

         CustomerDto customerDto;
         try
         {
            customerDto = await _customerBl.CreateCustomer(customer);
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
         //return CreatedAtAction(nameof(GetCustomerById), new { key = customerDto.CustomerId, odataPath = $"Customer/{customerDto.CustomerId}" }, customerDto);
         return CreatedAtAction("Get", new { key = customerDto.CustomerId }, customerDto);
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
