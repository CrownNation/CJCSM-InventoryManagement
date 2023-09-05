using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryAPI.Migrations.CJCSMInventoryMigrations
{
    /// <inheritdoc />
    public partial class _20230902AddPipeDefinition : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PipeDefinition",
                columns: table => new
                {
                    PipeDefinitionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PidpeSizeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PipeConditionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PipeThreadId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PipeGradeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PipeCoatingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Weight = table.Column<float>(type: "real", nullable: false),
                    WallSizeMetric = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PipeDefinition", x => x.PipeDefinitionId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PipeDefinition");
        }
    }
}
