using Inventory_DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace Inventory_API.Controllers
{
   [ApiController]
   [Route("[controller]")]
   public class CustomerController : Controller
   {

      private readonly ILogger<CustomerController> _logger;
      private readonly InventoryContext _context;

      public CustomerController(ILogger<CustomerController> logger, InventoryContext context)
      {
         _logger = logger;
         _context = context;
      }

      [HttpGet]
      [EnableQuery]
      public ActionResult Get()
      {
         return Ok(_context.Customer);

      }

      [HttpGet("{guid}")]
      [EnableQuery]

      public ActionResult Get(Guid key)
      {
         return Ok(_context.Customer.Where(x => x.CustomerId == key));
      }

   }
}
