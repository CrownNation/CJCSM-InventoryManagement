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
        //Migration Command
        //add-migration
        //add-migration [vxxxx_to_vxxxx_CamelCaseDescription_Project] -Context CjcsmSqliteContext -Output Migrations/ProjectMigrations

        //This command is used with the Package Manager Console(PMC) in Visual Studio
        //add-migration 20230820_InitialCreate --context InventoryContext --output-dir Migrations/CJCSM_Inventory_Migrations
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

        public InventoryContext(DbContextOptions options) : base(options) { }

        public virtual DbSet<Customer> Customer { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            //IsConfigured it false if called from the Package Manager Console, but will be true if called from code.
            //If called from Package Manager Console, we need to provied a path for the db to create a migration.
            //This database is just temp and can be deleted since it isn't used in the actual project, it's only used for migration creation.
            if (options.IsConfigured == false)
            {
                String directory = System.IO.Directory.GetCurrentDirectory() + "\\Data";
                if (System.IO.Directory.Exists(directory) == false)
                {
                    System.IO.Directory.CreateDirectory(directory);
                }

                string connectionString = @"Data Source=" + directory + "\\cjcsm_inventory.db";
                Console.Write(connectionString);

                options.UseSqlServer(connectionString);
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


        }

    }




}
