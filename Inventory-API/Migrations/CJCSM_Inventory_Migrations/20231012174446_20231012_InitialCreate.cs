using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryAPI.Migrations.CJCSMInventoryMigrations
{
    /// <inheritdoc />
    public partial class _20231012InitialCreate : Migration
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
                    TierId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Length = table.Column<float>(type: "real", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pipe", x => x.PipeId);
                });

            migrationBuilder.CreateTable(
                name: "PipeProperty_Category",
                columns: table => new
                {
                    PipePropertyCategoryId = table.Column<Guid>(name: "PipeProperty_CategoryId", type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PipeProperty_Category", x => x.PipePropertyCategoryId);
                });

            migrationBuilder.CreateTable(
                name: "PipeProperty_Condition",
                columns: table => new
                {
                    PipePropertyCategoryId = table.Column<Guid>(name: "PipeProperty_CategoryId", type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PipeProperty_Condition", x => x.PipePropertyCategoryId);
                });

            migrationBuilder.CreateTable(
                name: "PipeProperty_Grade",
                columns: table => new
                {
                    PipePropertyGradeId = table.Column<Guid>(name: "PipeProperty_GradeId", type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PipeProperty_Grade", x => x.PipePropertyGradeId);
                });

            migrationBuilder.CreateTable(
                name: "PipeProperty_Range",
                columns: table => new
                {
                    PipePropertyRangeId = table.Column<Guid>(name: "PipeProperty_RangeId", type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PipeProperty_Range", x => x.PipePropertyRangeId);
                });

            migrationBuilder.CreateTable(
                name: "PipeProperty_Size",
                columns: table => new
                {
                    PipePropertySizeId = table.Column<Guid>(name: "PipeProperty_SizeId", type: "uniqueidentifier", nullable: false),
                    SizeMetric = table.Column<decimal>(type: "decimal(6,2)", nullable: false),
                    SizeImperial = table.Column<decimal>(type: "decimal(6,3)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PipeProperty_Size", x => x.PipePropertySizeId);
                });

            migrationBuilder.CreateTable(
                name: "PipeProperty_Thread",
                columns: table => new
                {
                    PipePropertyThreadID = table.Column<Guid>(name: "PipeProperty_ThreadID", type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PipeProperty_Thread", x => x.PipePropertyThreadID);
                });

            migrationBuilder.CreateTable(
                name: "PipeProperty_Wall",
                columns: table => new
                {
                    PipePropertyWallId = table.Column<Guid>(name: "PipeProperty_WallId", type: "uniqueidentifier", nullable: false),
                    WallMetric = table.Column<decimal>(type: "decimal(5,2)", nullable: false),
                    WallImperial = table.Column<decimal>(type: "decimal(4,3)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PipeProperty_Wall", x => x.PipePropertyWallId);
                });

            migrationBuilder.CreateTable(
                name: "PipeProperty_Weight",
                columns: table => new
                {
                    PipePropertyWeightId = table.Column<Guid>(name: "PipeProperty_WeightId", type: "uniqueidentifier", nullable: false),
                    WeightMetric = table.Column<decimal>(type: "decimal(6,2)", nullable: false),
                    WeightImperial = table.Column<decimal>(type: "decimal(6,3)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PipeProperty_Weight", x => x.PipePropertyWeightId);
                });

            migrationBuilder.CreateTable(
                name: "ShopLocation",
                columns: table => new
                {
                    ShopLocationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Address1 = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    Address2 = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    City = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    ProvinceState = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    FaxNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShopLocation", x => x.ShopLocationId);
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
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TallyNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TalliedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CarrierName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tally", x => x.TallyId);
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

            migrationBuilder.CreateTable(
                name: "PipeDefinition",
                columns: table => new
                {
                    PipeDefinitionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ConditionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GradeId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    RangeId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    SizeId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ThreadId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    WallId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    WeightId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PipeDefinition", x => x.PipeDefinitionId);
                    table.ForeignKey(
                        name: "FK_PipeDefinition_PipeProperty_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "PipeProperty_Category",
                        principalColumn: "PipeProperty_CategoryId");
                    table.ForeignKey(
                        name: "FK_PipeDefinition_PipeProperty_Condition_ConditionId",
                        column: x => x.ConditionId,
                        principalTable: "PipeProperty_Condition",
                        principalColumn: "PipeProperty_CategoryId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PipeDefinition_PipeProperty_Grade_GradeId",
                        column: x => x.GradeId,
                        principalTable: "PipeProperty_Grade",
                        principalColumn: "PipeProperty_GradeId");
                    table.ForeignKey(
                        name: "FK_PipeDefinition_PipeProperty_Range_RangeId",
                        column: x => x.RangeId,
                        principalTable: "PipeProperty_Range",
                        principalColumn: "PipeProperty_RangeId");
                    table.ForeignKey(
                        name: "FK_PipeDefinition_PipeProperty_Size_SizeId",
                        column: x => x.SizeId,
                        principalTable: "PipeProperty_Size",
                        principalColumn: "PipeProperty_SizeId");
                    table.ForeignKey(
                        name: "FK_PipeDefinition_PipeProperty_Thread_ThreadId",
                        column: x => x.ThreadId,
                        principalTable: "PipeProperty_Thread",
                        principalColumn: "PipeProperty_ThreadID");
                    table.ForeignKey(
                        name: "FK_PipeDefinition_PipeProperty_Wall_WallId",
                        column: x => x.WallId,
                        principalTable: "PipeProperty_Wall",
                        principalColumn: "PipeProperty_WallId");
                    table.ForeignKey(
                        name: "FK_PipeDefinition_PipeProperty_Weight_WeightId",
                        column: x => x.WeightId,
                        principalTable: "PipeProperty_Weight",
                        principalColumn: "PipeProperty_WeightId");
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
                    table.ForeignKey(
                        name: "FK_Rack_ShopLocation_ShopLocationId",
                        column: x => x.ShopLocationId,
                        principalTable: "ShopLocation",
                        principalColumn: "ShopLocationId",
                        onDelete: ReferentialAction.Cascade);
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
                    table.ForeignKey(
                        name: "FK_TallyPipe_Pipe_PipeId",
                        column: x => x.PipeId,
                        principalTable: "Pipe",
                        principalColumn: "PipeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TallyPipe_Tally_TallyId",
                        column: x => x.TallyId,
                        principalTable: "Tally",
                        principalColumn: "TallyId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PipeDefinition_CategoryId",
                table: "PipeDefinition",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_PipeDefinition_ConditionId",
                table: "PipeDefinition",
                column: "ConditionId");

            migrationBuilder.CreateIndex(
                name: "IX_PipeDefinition_GradeId",
                table: "PipeDefinition",
                column: "GradeId");

            migrationBuilder.CreateIndex(
                name: "IX_PipeDefinition_RangeId",
                table: "PipeDefinition",
                column: "RangeId");

            migrationBuilder.CreateIndex(
                name: "IX_PipeDefinition_SizeId",
                table: "PipeDefinition",
                column: "SizeId");

            migrationBuilder.CreateIndex(
                name: "IX_PipeDefinition_ThreadId",
                table: "PipeDefinition",
                column: "ThreadId");

            migrationBuilder.CreateIndex(
                name: "IX_PipeDefinition_WallId",
                table: "PipeDefinition",
                column: "WallId");

            migrationBuilder.CreateIndex(
                name: "IX_PipeDefinition_WeightId",
                table: "PipeDefinition",
                column: "WeightId");

            migrationBuilder.CreateIndex(
                name: "IX_Rack_ShopLocationId",
                table: "Rack",
                column: "ShopLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_TallyPipe_PipeId",
                table: "TallyPipe",
                column: "PipeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Customer");

            migrationBuilder.DropTable(
                name: "PipeDefinition");

            migrationBuilder.DropTable(
                name: "Rack");

            migrationBuilder.DropTable(
                name: "TallyPipe");

            migrationBuilder.DropTable(
                name: "Tier");

            migrationBuilder.DropTable(
                name: "PipeProperty_Category");

            migrationBuilder.DropTable(
                name: "PipeProperty_Condition");

            migrationBuilder.DropTable(
                name: "PipeProperty_Grade");

            migrationBuilder.DropTable(
                name: "PipeProperty_Range");

            migrationBuilder.DropTable(
                name: "PipeProperty_Size");

            migrationBuilder.DropTable(
                name: "PipeProperty_Thread");

            migrationBuilder.DropTable(
                name: "PipeProperty_Wall");

            migrationBuilder.DropTable(
                name: "PipeProperty_Weight");

            migrationBuilder.DropTable(
                name: "ShopLocation");

            migrationBuilder.DropTable(
                name: "Pipe");

            migrationBuilder.DropTable(
                name: "Tally");
        }
    }
}
