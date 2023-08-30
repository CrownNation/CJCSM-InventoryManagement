using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_DAL.Entities
{
    public class InventoryContext : DbContext
    {
        //Migration Command
        //add-migration
        //add-migration [vxxxx_to_vxxxx_CamelCaseDescription_Project] -Context CjcsmSqliteContext -Output Migrations/ProjectMigrations

        //This command is used with the Package Manager Console(PMC) in Visual Studio
        //Add-Migration 20230820_InitialCreate -Context InventoryContext -OutputDir Migrations/CJCSM_Inventory_Migrations


        //This command is used in the command-line interface (CLI) outside of Visual Studio.
        //dotnet ef migrations add 20230820_InitialCreate --context InventoryContext --output-dir Migrations/CJCSM_Inventory_Migrations

        // Entity Framework
        //https://www.talkingdotnet.com/create-sqlite-db-entity-framework-core-code-first/
        //http://bekenty.com/use-sqlite-in-net-core-3-with-entity-framework-core/

        // Migrations
        //https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=vs
        //https://www.learnentityframeworkcore.com/migrations

        // Dpendency Injection
        //https://marcominerva.wordpress.com/2019/03/06/using-net-core-3-0-dependency-injection-and-service-provider-with-wpf/


        private readonly IConfiguration _configuration;

        public InventoryContext(DbContextOptions<InventoryContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration;
        }
        public virtual DbSet<Customer> Customer { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            //IsConfigured it false if called from the Package Manager Console, but will be true if called from code.
            //If called from Package Manager Console, we need to provied a path for the db to create a migration.

            Console.WriteLine("options.IsConfigurd: " + options.IsConfigured);

            //if (options.IsConfigured == false)
            //{
                string connectionString = _configuration.GetConnectionString("developmentConnection")!;

                Console.WriteLine("CONNECTION STRING ONCONFIGURING: " + connectionString);

                options.UseSqlServer(connectionString);
            //}
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


        }

    }




}
