using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_DAL.Entities
{
   public class InventoryContext : DbContext
   {
      public InventoryContext(DbContextOptions options) : base(options) { }

      public virtual DbSet<Customer> Customer { get; set; }



      protected override void OnModelCreating(ModelBuilder modelBuilder)
      {


      }

   }




}
