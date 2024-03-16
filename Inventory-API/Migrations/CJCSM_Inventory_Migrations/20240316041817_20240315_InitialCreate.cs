using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryAPI.Migrations.CJCSMInventoryMigrations
{
    /// <inheritdoc />
    public partial class _20240315InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "PipeProperty_Condition",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "CoatingId",
                table: "PipeDefinition",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PipeProperty_Coating",
                columns: table => new
                {
                    PipePropertyCoatingId = table.Column<Guid>(name: "PipeProperty_CoatingId", type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PipeProperty_Coating", x => x.PipePropertyCoatingId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PipeDefinition_CoatingId",
                table: "PipeDefinition",
                column: "CoatingId");

            migrationBuilder.AddForeignKey(
                name: "FK_PipeDefinition_PipeProperty_Coating_CoatingId",
                table: "PipeDefinition",
                column: "CoatingId",
                principalTable: "PipeProperty_Coating",
                principalColumn: "PipeProperty_CoatingId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PipeDefinition_PipeProperty_Coating_CoatingId",
                table: "PipeDefinition");

            migrationBuilder.DropTable(
                name: "PipeProperty_Coating");

            migrationBuilder.DropIndex(
                name: "IX_PipeDefinition_CoatingId",
                table: "PipeDefinition");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "PipeProperty_Condition");

            migrationBuilder.DropColumn(
                name: "CoatingId",
                table: "PipeDefinition");
        }
    }
}
