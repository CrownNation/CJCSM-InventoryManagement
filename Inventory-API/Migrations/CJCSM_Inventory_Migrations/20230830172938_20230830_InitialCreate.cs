using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryAPI.Migrations.CJCSMInventoryMigrations
{
    /// <inheritdoc />
    public partial class _20230830InitialCreate : Migration
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
                    Province = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: true),
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Customer");
        }
    }
}
