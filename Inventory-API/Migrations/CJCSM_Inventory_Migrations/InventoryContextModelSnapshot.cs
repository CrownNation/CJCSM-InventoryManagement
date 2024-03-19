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

                    b.Property<string>("Country")
                        .HasMaxLength(2)
                        .HasColumnType("nvarchar(2)");

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

            modelBuilder.Entity("Inventory_DAL.Entities.Equipment", b =>
                {
                    b.Property<Guid>("EquipmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CustomerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("EquipmentDefinitionId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("LengthInFeet")
                        .HasPrecision(18, 2)
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("LengthInMeters")
                        .HasPrecision(18, 2)
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<Guid>("RackId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ShopLocationId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("EquipmentId");

                    b.ToTable("Equipment");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.EquipmentDefinition", b =>
                {
                    b.Property<Guid>("EquipmentDefinitionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("nvarchar(25)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Notes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("PipeProperty_GradeId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PipeProperty_SizeId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("EquipmentDefinitionId");

                    b.HasIndex("PipeProperty_GradeId");

                    b.HasIndex("PipeProperty_SizeId");

                    b.ToTable("EquipmentDefinition");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.Pipe", b =>
                {
                    b.Property<Guid>("PipeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CustomerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("IndexOfPipe")
                        .HasColumnType("int");

                    b.Property<decimal>("LengthInFeet")
                        .HasPrecision(18, 2)
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("LengthInMeters")
                        .HasPrecision(18, 2)
                        .HasColumnType("decimal(18,2)");

                    b.Property<Guid>("PipeDefinitionId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<Guid>("TierId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("PipeId");

                    b.ToTable("Pipe");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.PipeDefinition", b =>
                {
                    b.Property<Guid>("PipeDefinitionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CategoryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CoatingId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("ConditionId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("GradeId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<Guid?>("RangeId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("SizeId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("ThreadId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("WallId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("WeightId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("PipeDefinitionId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("CoatingId");

                    b.HasIndex("ConditionId");

                    b.HasIndex("GradeId");

                    b.HasIndex("RangeId");

                    b.HasIndex("SizeId");

                    b.HasIndex("ThreadId");

                    b.HasIndex("WallId");

                    b.HasIndex("WeightId");

                    b.ToTable("PipeDefinition");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.PipeProperties.PipeProperty_Category", b =>
                {
                    b.Property<Guid>("PipeProperty_CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.HasKey("PipeProperty_CategoryId");

                    b.ToTable("PipeProperty_Category");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.PipeProperties.PipeProperty_Coating", b =>
                {
                    b.Property<Guid>("PipeProperty_CoatingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("nvarchar(25)");

                    b.HasKey("PipeProperty_CoatingId");

                    b.ToTable("PipeProperty_Coating");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.PipeProperties.PipeProperty_Condition", b =>
                {
                    b.Property<Guid>("PipeProperty_ConditionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("nvarchar(25)");

                    b.HasKey("PipeProperty_ConditionId");

                    b.ToTable("PipeProperty_Condition");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.PipeProperties.PipeProperty_Grade", b =>
                {
                    b.Property<Guid>("PipeProperty_GradeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.HasKey("PipeProperty_GradeId");

                    b.ToTable("PipeProperty_Grade");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.PipeProperties.PipeProperty_Range", b =>
                {
                    b.Property<Guid>("PipeProperty_RangeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.HasKey("PipeProperty_RangeId");

                    b.ToTable("PipeProperty_Range");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.PipeProperties.PipeProperty_Size", b =>
                {
                    b.Property<Guid>("PipeProperty_SizeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("SizeImperial")
                        .HasColumnType("decimal(6, 3)");

                    b.Property<decimal>("SizeMetric")
                        .HasColumnType("decimal(6, 2)");

                    b.HasKey("PipeProperty_SizeId");

                    b.ToTable("PipeProperty_Size");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.PipeProperties.PipeProperty_Thread", b =>
                {
                    b.Property<Guid>("PipeProperty_ThreadId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.HasKey("PipeProperty_ThreadId");

                    b.ToTable("PipeProperty_Thread");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.PipeProperties.PipeProperty_Wall", b =>
                {
                    b.Property<Guid>("PipeProperty_WallId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("WallImperial")
                        .HasColumnType("decimal(4, 3)");

                    b.Property<decimal>("WallMetric")
                        .HasColumnType("decimal(5, 2)");

                    b.HasKey("PipeProperty_WallId");

                    b.ToTable("PipeProperty_Wall");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.PipeProperties.PipeProperty_Weight", b =>
                {
                    b.Property<Guid>("PipeProperty_WeightId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("WeightInKgPerMeter")
                        .HasColumnType("decimal(6, 2)");

                    b.Property<decimal>("WeightInLbsPerFoot")
                        .HasColumnType("decimal(6, 3)");

                    b.HasKey("PipeProperty_WeightId");

                    b.ToTable("PipeProperty_Weight");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.Rack", b =>
                {
                    b.Property<Guid>("RackId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(5000)
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<int>("JointsPerTier")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<Guid>("ShopLocationId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("RackId");

                    b.HasIndex("ShopLocationId");

                    b.ToTable("Rack");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.ShopLocation", b =>
                {
                    b.Property<Guid>("ShopLocationId")
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

                    b.Property<string>("Country")
                        .HasMaxLength(2)
                        .HasColumnType("nvarchar(2)");

                    b.Property<string>("FaxNumber")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("PhoneNumber")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("PostalCode")
                        .HasMaxLength(6)
                        .HasColumnType("nvarchar(6)");

                    b.Property<string>("ProvinceState")
                        .HasMaxLength(2)
                        .HasColumnType("nvarchar(2)");

                    b.HasKey("ShopLocationId");

                    b.ToTable("ShopLocation");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.Tally", b =>
                {
                    b.Property<Guid>("TallyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CarrierName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("CustomerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTimeOffset>("DateOfCreation")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("InvoiceNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Notes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("ShopLocationId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("TalliedByUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("TallyNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TallyType")
                        .HasColumnType("int");

                    b.HasKey("TallyId");

                    b.ToTable("Tally");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.TallyEquipment", b =>
                {
                    b.Property<Guid>("TallyId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("EquipmentId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("TallyId", "EquipmentId");

                    b.HasIndex("EquipmentId");

                    b.ToTable("TallyEquipment");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.TallyPipe", b =>
                {
                    b.Property<Guid>("TallyId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PipeId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("TallyId", "PipeId");

                    b.HasIndex("PipeId");

                    b.ToTable("TallyPipe");
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

            modelBuilder.Entity("Inventory_DAL.Entities.EquipmentDefinition", b =>
                {
                    b.HasOne("Inventory_DAL.Entities.PipeProperties.PipeProperty_Grade", "Grade")
                        .WithMany()
                        .HasForeignKey("PipeProperty_GradeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Inventory_DAL.Entities.PipeProperties.PipeProperty_Size", "Size")
                        .WithMany()
                        .HasForeignKey("PipeProperty_SizeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Grade");

                    b.Navigation("Size");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.PipeDefinition", b =>
                {
                    b.HasOne("Inventory_DAL.Entities.PipeProperties.PipeProperty_Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");

                    b.HasOne("Inventory_DAL.Entities.PipeProperties.PipeProperty_Coating", "Coating")
                        .WithMany()
                        .HasForeignKey("CoatingId");

                    b.HasOne("Inventory_DAL.Entities.PipeProperties.PipeProperty_Condition", "Condition")
                        .WithMany()
                        .HasForeignKey("ConditionId");

                    b.HasOne("Inventory_DAL.Entities.PipeProperties.PipeProperty_Grade", "Grade")
                        .WithMany()
                        .HasForeignKey("GradeId");

                    b.HasOne("Inventory_DAL.Entities.PipeProperties.PipeProperty_Range", "Range")
                        .WithMany()
                        .HasForeignKey("RangeId");

                    b.HasOne("Inventory_DAL.Entities.PipeProperties.PipeProperty_Size", "Size")
                        .WithMany()
                        .HasForeignKey("SizeId");

                    b.HasOne("Inventory_DAL.Entities.PipeProperties.PipeProperty_Thread", "Thread")
                        .WithMany()
                        .HasForeignKey("ThreadId");

                    b.HasOne("Inventory_DAL.Entities.PipeProperties.PipeProperty_Wall", "Wall")
                        .WithMany()
                        .HasForeignKey("WallId");

                    b.HasOne("Inventory_DAL.Entities.PipeProperties.PipeProperty_Weight", "Weight")
                        .WithMany()
                        .HasForeignKey("WeightId");

                    b.Navigation("Category");

                    b.Navigation("Coating");

                    b.Navigation("Condition");

                    b.Navigation("Grade");

                    b.Navigation("Range");

                    b.Navigation("Size");

                    b.Navigation("Thread");

                    b.Navigation("Wall");

                    b.Navigation("Weight");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.Rack", b =>
                {
                    b.HasOne("Inventory_DAL.Entities.ShopLocation", "ShopLocation")
                        .WithMany()
                        .HasForeignKey("ShopLocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ShopLocation");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.TallyEquipment", b =>
                {
                    b.HasOne("Inventory_DAL.Entities.Equipment", "Equipment")
                        .WithMany()
                        .HasForeignKey("EquipmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Inventory_DAL.Entities.Tally", "Tally")
                        .WithMany()
                        .HasForeignKey("TallyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Equipment");

                    b.Navigation("Tally");
                });

            modelBuilder.Entity("Inventory_DAL.Entities.TallyPipe", b =>
                {
                    b.HasOne("Inventory_DAL.Entities.Pipe", "Pipe")
                        .WithMany()
                        .HasForeignKey("PipeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Inventory_DAL.Entities.Tally", "Tally")
                        .WithMany()
                        .HasForeignKey("TallyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pipe");

                    b.Navigation("Tally");
                });
#pragma warning restore 612, 618
        }
    }
}
