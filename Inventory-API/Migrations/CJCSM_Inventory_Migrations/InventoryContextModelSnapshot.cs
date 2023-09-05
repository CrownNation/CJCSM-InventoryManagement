﻿// <auto-generated />
using System;
using Inventory_DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace InventoryAPI.Migrations.CJCSMInventoryMigrations
{
    [DbContext(typeof(InventoryContext))]
    partial class InventoryContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Inventory_DAL.Entities.Customer", b =>
                {
                    b.Property<Guid>("CustomerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Address1")
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<string>("Address2")
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<string>("City")
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<DateTimeOffset>("DateOfCreation")
                        .HasColumnType("datetimeoffset");

                    b.Property<DateTimeOffset>("DateOfLastUpdate")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("Email")
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("PostalCode")
                        .HasMaxLength(6)
                        .HasColumnType("nvarchar(6)");

                    b.Property<string>("ProvinceState")
                        .HasMaxLength(2)
                        .HasColumnType("nvarchar(2)");

                    b.HasKey("CustomerId");

                    b.ToTable("Customer");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.PipeDefinition", b =>
                {
                    b.Property<Guid>("PipeDefinitionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<Guid>("PipeCoatingId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PipeConditionId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PipeGradeId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PipeSizeId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PipeThreadId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<float>("WallSizeMetric")
                        .HasColumnType("real");

                    b.Property<float>("Weight")
                        .HasColumnType("real");

                    b.HasKey("PipeDefinitionId");

                    b.ToTable("PipeDefinition");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.Rack", b =>
                {
                    b.Property<Guid>("RackId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<Guid>("ShopLocationId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("RackId");

                    b.ToTable("Rack");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.Section", b =>
                {
                    b.Property<Guid>("SectionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CustomerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("TierId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("SectionId");

                    b.ToTable("Section");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.Tier", b =>
                {
                    b.Property<Guid>("TierId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<Guid>("RackId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("TierId");

                    b.ToTable("Tier");
                });
#pragma warning restore 612, 618
        }
    }
}
