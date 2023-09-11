using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryAPI.Migrations.CJCSMInventoryMigrations
{
    /// <inheritdoc />
    public partial class _20230906InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customer",
                columns: table => new
                {
                    CustomerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Address1 = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    Address2 = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    City = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    ProvinceState = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    DateOfCreation = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    DateOfLastUpdate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.CustomerId);
                });

            migrationBuilder.CreateTable(
                name: "Pipe",
                columns: table => new
                {
                    PipeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PipeDefinitionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SectionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Length = table.Column<float>(type: "real", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pipe", x => x.PipeId);
                });

            migrationBuilder.CreateTable(
                name: "PipeDefinition",
                columns: table => new
                {
                    PipeDefinitionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PipeSizeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PipeConditionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PipeThreadId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PipeGradeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PipeCoatingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Weight = table.Column<float>(type: "real", nullable: false),
                    WallSizeMetric = table.Column<float>(type: "real", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PipeDefinition", x => x.PipeDefinitionId);
                });

            migrationBuilder.CreateTable(
                name: "Rack",
                columns: table => new
                {
                    RackId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ShopLocationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rack", x => x.RackId);
                });

            migrationBuilder.CreateTable(
                name: "Section",
                columns: table => new
                {
                    SectionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TierId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CustomerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Section", x => x.SectionId);
                });

            migrationBuilder.CreateTable(
                name: "Tally",
                columns: table => new
                {
                    TallyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CustomerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ShopLocationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TallyType = table.Column<int>(type: "int", nullable: false),
                    DateOfCreation = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tally", x => x.TallyId);
                });

            migrationBuilder.CreateTable(
                name: "TallyPipe",
                columns: table => new
                {
                    TallyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PipeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TallyPipe", x => new { x.TallyId, x.PipeId });
                });

            migrationBuilder.CreateTable(
                name: "Tier",
                columns: table => new
                {
                    TierId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RackId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Number = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tier", x => x.TierId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Customer");

            migrationBuilder.DropTable(
                name: "Pipe");

            migrationBuilder.DropTable(
                name: "PipeDefinition");

            migrationBuilder.DropTable(
                name: "Rack");

            migrationBuilder.DropTable(
                name: "Section");

            migrationBuilder.DropTable(
                name: "Tally");

            migrationBuilder.DropTable(
                name: "TallyPipe");

            migrationBuilder.DropTable(
                name: "Tier");
        }
    }
}
