using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryAPI.Migrations.CJCSMInventoryMigrations
{
    /// <inheritdoc />
    public partial class _20230902AddPipeDefinitionIsActive : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PidpeSizeId",
                table: "PipeDefinition",
                newName: "PipeSizeId");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "PipeDefinition",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "PipeDefinition");

            migrationBuilder.RenameColumn(
                name: "PipeSizeId",
                table: "PipeDefinition",
                newName: "PidpeSizeId");
        }
    }
}
