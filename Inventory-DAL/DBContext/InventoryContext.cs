using Inventory_DAL.Entities.PipeProperties;
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
        //Add-Migration 20240813_InitialCreate -Context InventoryContext -OutputDir Migrations/CJCSM_Inventory_Migrations
        //Update-Database

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
        public virtual DbSet<ShopLocation> ShopLocation { get; set; }
        public virtual DbSet<Rack> Rack { get; set; }
        public virtual DbSet<Tier> Tier { get; set; }
        public virtual DbSet<PipeDefinition> PipeDefinition { get; set; }
        public virtual DbSet<Pipe> Pipe { get; set; }
        public virtual DbSet<Tally> Tally { get; set; }
        public virtual DbSet<TallyPipe> TallyPipe { get; set; }

      public virtual DbSet<PipeForTally> PipeForTally { get; set; }
      public virtual DbSet<EquipmentForTally> EquipmentForTally { get; set; }


      public virtual DbSet<Equipment> Equipment { get; set; }
        public virtual DbSet<EquipmentDefinition> EquipmentDefinition { get; set; }
        public virtual DbSet<TallyEquipment> TallyEquipment { get; set; }

        public virtual DbSet<PipeProperty_Category> PipeProperty_Category { get; set; }
        public virtual DbSet<PipeProperty_Coating> PipeProperty_Coating { get; set; }
        public virtual DbSet<PipeProperty_Condition> PipeProperty_Condition { get; set; }
        public virtual DbSet<PipeProperty_Grade> PipeProperty_Grade { get; set; }
        public virtual DbSet<PipeProperty_Range> PipeProperty_Range { get; set; }
        public virtual DbSet<PipeProperty_Size> PipeProperty_Size { get; set; }
        public virtual DbSet<PipeProperty_Thread> PipeProperty_Thread { get; set; }
        public virtual DbSet<PipeProperty_Wall> PipeProperty_Wall { get; set; }
        public virtual DbSet<PipeProperty_Weight> PipeProperty_Weight { get; set; }



        // Since we are using DI, this will only be called during migrations. DI provides the configuration, so it doesn't need to call it during runtime.
        // This is called when a DbContext object is required by EF Core. We also only need to provide the development connection string since migrations are only run during development.
        // We specificy the connection string differently when we deploy in production using the EF Core bundle.
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            string connectionString = _configuration.GetConnectionString("defaultConnection")!;

            Console.WriteLine("Connetion String OnConfiguring: " + connectionString);
            options.UseSqlServer(connectionString);

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Composite key for TallyPipe
            modelBuilder.Entity<TallyPipe>()
                .HasKey(tp => new { tp.TallyId, tp.PipeId });

            modelBuilder.Entity<TallyEquipment>()
                .HasKey(te => new { te.TallyId, te.EquipmentId });

            modelBuilder.Entity<Pipe>()
                .Property(p => p.LengthInFeet)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Pipe>()
                .Property(p => p.LengthInMeters)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Equipment>()
                .Property(p => p.LengthInFeet)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Equipment>()
                .Property(p => p.LengthInMeters)
                .HasPrecision(18, 2);

        }
    }
}
