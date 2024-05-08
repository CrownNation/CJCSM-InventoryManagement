using Inventory_Dto.Dto;
﻿using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace Inventory_Documents
{
    public class TallyPDFGenerator
    {
        string path = Path.GetFullPath("CJCSM_Logo_Transparent_ORIGINAL.png");
        decimal totalPipeDefinitionLength = 0;
        int totalNumberPipeDefinitionLength = 0;
        decimal totalNumberPipeWeightDefinitionLength = 0;
        List<DtoPipe> pipeListSubset;
        List<DtoEquipment> equipListSubset = new List<DtoEquipment>();
        public Stream GenerateTallyPDFDocuemnt(DtoTally_WithPipeAndCustomer dtoTally)
        {
            System.Diagnostics.Debug.WriteLine("IN TallyPDFGenerator");

            Document document = Document.Create(container =>
            {
                List<DtoPipe> pipeList = new List<DtoPipe>();
                bool isEquipment = true;
                int Modulus = 0;
                int NumberOfRows = 0;
                int NumberOfPages = 1;
                DtoEquipment equipment;
                DtoPipe test;

                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(2, Unit.Centimetre);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontSize(20));

                    page.Header()
                        .Text($"Tally #: {dtoTally.TallyNumber}")
                        .SemiBold().FontSize(36).FontColor(Colors.Blue.Medium);

                    page.Content()
                        .PaddingVertical(1, Unit.Centimetre)
                        .Column(x =>
                        {
                            x.Spacing(20);

                            x.Item().Text($"Customer: {dtoTally.CustomerName}");
                            x.Item().Image(Placeholders.Image(200, 100));
                        });

                    page.Footer()
                        .AlignCenter();

                    page.Header().Column(column =>
                    {
                        //column.Item().SkipOnce().Element(ComposePipeHeader);
                        //column.Item().ShowOnce().Element(ComposeEquipmentHeader);
                    });

                    page.Content()
                           .PaddingVertical(0.25f, Unit.Centimetre)
                           .Column(column =>
                           {
                               /*           for (int i = 0; i < 4; i++)
                                          {
                                              Guid id = Guid.NewGuid();
                                              Random rnd = new Random();
                                              decimal length = rnd.Next(18, 23);
                                              //int blah = rnd.Next(18, 26);
                                              int size = rnd.Next(5, 15);
                                              int weight = rnd.Next(10, 15);
                                              int blah = 16;
                                              for (int k = 1; k < blah; k++)
                                              {
                                                  test = new DtoPipe();
                                                  test.IndexOfPipe = k;
                                                  test.LengthInFeet = length;
                                                  test.PipeDefinitionId = id;
                                                  test.PipeDefinition = new DtoPipeDefinition();
                                                  test.PipeDefinition.Size = new PipeProperty_Size();
                                                  test.PipeDefinition.Size.SizeImperial = size;
                                                  test.PipeDefinition.Weight = new PipeProperty_Weight();
                                                  test.PipeDefinition.Weight.WeightInKgPerMeter = weight;
                                                  dtoTally.PipeList.Add(test);
                                              }
                                          }

                                          equipment = new DtoEquipment();
                                          equipment.Quantity = 3;
                                          equipment.Description = "4 1/2 Polycore Drift";
                                          equipListSubset.Add(equipment);

                                          equipment = new DtoEquipment();
                                          equipment.Quantity = 1;
                                          equipment.Description = "4 1/2 Polycore Lined 4' Pup Joint";
                                          equipListSubset.Add(equipment);

                                          equipment = new DtoEquipment();
                                          equipment.Quantity = 10;
                                          equipment.Description = "4 1/2 Stabbing Guide";
                                          equipListSubset.Add(equipment);

                                          equipment = new DtoEquipment();
                                          equipment.Quantity = 5;
                                          equipment.Description = "4 1/2 Polycore Lined 2' Pup Joint";
                                          equipListSubset.Add(equipment);*/

                               column.Item().Element(ComposePipeHeader);
                               column.Item().Text(x =>
                               {
                                   x.Span("").FontSize(10);
                               });

                               List<Guid> ids = dtoTally.PipeList.Select(ids => ids.PipeDefinitionId).Distinct().ToList();

                               for (int i = 0; i < ids.Count; i++)
                               {
                                   pipeListSubset = dtoTally.PipeList.Where(p => p.PipeDefinitionId == ids[i]).ToList();
                                   Modulus = (pipeListSubset.Count + 3) / 4;
                                   Modulus += 4;

                                   if (NumberOfRows + Modulus > 25)
                                   {
                                       NumberOfRows = 0;
                                       column.Item().PageBreak();
                                       column.Item().Element(ComposePipeHeader);
                                       column.Item().Text(x =>
                                       {
                                           x.Span("").FontSize(10);
                                       });
                                       NumberOfPages++;
                                   }
                                   column.Item().Element(ComposeTableHeader);

                                   column.Item().Row(row =>
                                       {
                                           totalPipeDefinitionLength = pipeListSubset.Sum(x => x.LengthInFeet);
                                           totalNumberPipeDefinitionLength = pipeListSubset.Count();
                                           totalNumberPipeWeightDefinitionLength = totalNumberPipeDefinitionLength * pipeListSubset[0].PipeDefinition.Weight.WeightInKgPerMeter;

                                           row.RelativeItem().Component(new CreatePipeTableComponent(pipeListSubset));
                                           NumberOfRows += Modulus;
                                           pipeListSubset.Clear();
                                       });

                                   column.Item().Element(ComposeTableFooter);
                                   column.Item().Text(x =>
                                   {
                                       x.Span("").FontSize(10);
                                   });
                                   Modulus++;
                               }
                               column.Item().Element(ComposeFooter);

                               if (isEquipment == true)
                               {
                                   isEquipment = true;
                                   column.Item().PageBreak();
                                   column.Item().Element(ComposeEquipmentHeader);
                                   column.Item().Component(new CreateEquipmentTableComponent(equipListSubset));
                                   column.Item().Element(ComposeEquipmentFooter);
                               }
                           });

                    page.Footer().Column(column =>
                    {
                        column.Item().AlignCenter()
                        .Text(x =>
                        {
                            x.Span("Page ");
                            x.CurrentPageNumber();
                        });
                    });
                });

                void ComposeTableHeader(QuestPDF.Infrastructure.IContainer container)
                {
                    var tableFontSize = 11;

                    container.Column(column =>
                    {
                        column.Item().Border(1).Table(table =>
                        {
                            table.ColumnsDefinition(columns =>
                            {
                                columns.ConstantColumn(88);
                                columns.ConstantColumn(89);
                                columns.ConstantColumn(88);
                                columns.ConstantColumn(89);
                                columns.ConstantColumn(88);
                                columns.RelativeColumn();
                            });

                            table.Cell().Element(LabelStyle).AlignRight().Text("Size:").FontSize(tableFontSize);
                            table.Cell().Element(InfoStyle).AlignRight().Text($"{pipeListSubset[0].PipeDefinition.Size.SizeImperial}").FontSize(tableFontSize);
                            table.Cell().Element(LabelStyle).Text("Weight:").FontSize(tableFontSize);
                            table.Cell().Element(InfoStyle).Text($"{dtoTally.TalliedByUserName}").FontSize(tableFontSize);
                            table.Cell().Element(LabelStyle).Text("Unit:").FontSize(tableFontSize);
                            table.Cell().BorderRight(1).Element(InfoStyle).Text($"01/27/24").FontSize(tableFontSize);
                            table.Cell().Element(LabelStyle).Text("Grade:").FontSize(tableFontSize);
                            table.Cell().Element(InfoStyle).Text($"Lading #").FontSize(tableFontSize);
                            table.Cell().Element(LabelStyle).AlignRight().Text("Thread:").FontSize(tableFontSize);
                            table.Cell().Element(InfoStyle).AlignRight().Text($"{dtoTally.CarrierName}").FontSize(tableFontSize);
                            table.Cell().Element(LabelStyle).Text("Range:").FontSize(tableFontSize);
                            table.Cell().Element(InfoStyle).Text($"{dtoTally.ShopLocationName}").FontSize(tableFontSize);
                            table.Cell().Element(LabelStyle).Text("Condition:").FontSize(tableFontSize);
                            table.Cell().Element(InfoStyle).Text($"Used").FontSize(tableFontSize);

                            static QuestPDF.Infrastructure.IContainer LabelStyle(QuestPDF.Infrastructure.IContainer container)
                            {
                                return container.Background(Colors.Grey.Lighten2).AlignLeft().MinHeight(20);
                            }

                            static QuestPDF.Infrastructure.IContainer InfoStyle(QuestPDF.Infrastructure.IContainer container)
                            {
                                return container.Background(Colors.White).AlignLeft().MinHeight(20);
                            }
                        });
                    });
                }

                void ComposeTableFooter(QuestPDF.Infrastructure.IContainer container)
                {
                    var tableFontSize = 11;

                    container.Column(column =>
                    {

                        column.Item().Table(table =>
                        {
                            table.ColumnsDefinition(columns =>
                            {
                                columns.ConstantColumn(210);
                                columns.ConstantColumn(55);
                                columns.RelativeColumn();
                                columns.ConstantColumn(55);
                                columns.RelativeColumn();
                                columns.ConstantColumn(55);
                                columns.RelativeColumn();
                            });

                            table.Cell().Element(InfoStyle).Text("").FontSize(11);
                            table.Cell().BorderLeft(1).BorderBottom(1).Element(LabelStyle).Text("# JTs:").FontSize(14);
                            table.Cell().BorderBottom(1).Element(InfoStyle).Text(totalNumberPipeDefinitionLength.ToString()).FontSize(14);
                            table.Cell().BorderBottom(1).Element(LabelStyle).Text("Length:").FontSize(14);
                            table.Cell().BorderBottom(1).Element(InfoStyle).Text(totalPipeDefinitionLength.ToString()).FontSize(14);
                            table.Cell().BorderBottom(1).Element(LabelStyle).Text("Weight:").FontSize(14);
                            table.Cell().BorderRight(1).BorderBottom(1).Element(InfoStyle).Text(totalNumberPipeWeightDefinitionLength.ToString()).FontSize(14);

                            static QuestPDF.Infrastructure.IContainer LabelStyle(QuestPDF.Infrastructure.IContainer container)
                            {
                                return container.Background(Colors.Grey.Lighten2).AlignCenter().AlignMiddle().PaddingLeft(2);
                            }

                            static QuestPDF.Infrastructure.IContainer InfoStyle(QuestPDF.Infrastructure.IContainer container)
                            {
                                return container.Background(Colors.White).AlignLeft().AlignMiddle();
                            }
                        });

                    });
                }

                void ComposePipeHeader(QuestPDF.Infrastructure.IContainer container)
                {
                    var titleStyle = TextStyle.Default.FontSize(25).SemiBold();
                    var tableFontSize = 11;

                    container.Column(column =>
                    {
                        column.Item().Row(row =>
                        {
                            row.RelativeItem(.75f).Width(8, Unit.Centimetre).Image(path);

                            row.RelativeItem().MinHeight(50).MinWidth(300).AlignLeft()
                                .Text($"{dtoTally.TallyType}  Tally #{dtoTally.TallyNumber}")
                                .BackgroundColor(Colors.Grey.Darken1)
                                .Style(titleStyle);
                        });

                        column.Item().Table(table =>
                {
                    table.ColumnsDefinition(columns =>
                {
                    columns.ConstantColumn(88);
                    columns.ConstantColumn(88);
                    columns.ConstantColumn(88);
                    columns.ConstantColumn(88);
                    columns.ConstantColumn(88);
                    columns.ConstantColumn(88);
                });

                    table.Cell().Element(LabelStyle).AlignRight().Text("Invoice Number:").FontSize(tableFontSize);
                    table.Cell().Element(InfoStyle).AlignRight().Text($"{dtoTally.InvoiceNumber}").FontSize(tableFontSize);
                    table.Cell().Element(LabelStyle).Text("Tallied by:").FontSize(tableFontSize);
                    table.Cell().Element(InfoStyle).Text($"{dtoTally.TalliedByUserName}").FontSize(tableFontSize);
                    table.Cell().Element(LabelStyle).Text("Date:").FontSize(tableFontSize);
                    table.Cell().Element(InfoStyle).Text($"01/27/24").FontSize(tableFontSize);
                    table.Cell().Element(LabelStyle).Text("Bill Lading:").FontSize(tableFontSize);
                    table.Cell().Element(InfoStyle).Text($"Lading #").FontSize(tableFontSize);
                    table.Cell().Element(LabelStyle).AlignRight().Text("Carrier Name:").FontSize(tableFontSize);
                    table.Cell().Element(InfoStyle).AlignRight().Text($"{dtoTally.CarrierName}").FontSize(tableFontSize);
                    table.Cell().Element(LabelStyle).Text("Yard:").FontSize(tableFontSize);
                    table.Cell().Element(InfoStyle).Text($"{dtoTally.ShopLocationName}").FontSize(tableFontSize);
                    table.Cell().Element(LabelStyle).Text("Rack:").FontSize(tableFontSize);
                    table.Cell().Element(InfoStyle).Text($"1").FontSize(tableFontSize);
                    table.Cell().Element(LabelStyle).AlignRight().Text("Customer Name:").FontSize(tableFontSize);
                    table.Cell().Element(InfoStyle).AlignRight().Text($"{dtoTally.CustomerName}").FontSize(tableFontSize);
                    table.Cell().Element(LabelStyle).AlignRight().Text("Length:").FontSize(tableFontSize);
                    table.Cell().Element(InfoStyle).AlignRight().Text($"1000 m").FontSize(tableFontSize);
                    table.Cell().Element(LabelStyle).AlignRight().Text("Pieces:").FontSize(tableFontSize);
                    table.Cell().Element(InfoStyle).AlignRight().Text($"10").FontSize(tableFontSize);
                    table.Cell().Element(LabelStyle).AlignRight().Text("Weight:").FontSize(tableFontSize);
                    table.Cell().Element(InfoStyle).AlignRight().Text($"{dtoTally.WeightInKg} Kgs").FontSize(tableFontSize);
                    table.Cell().Element(LabelStyle).AlignRight().Text("Weight:").FontSize(tableFontSize);
                    table.Cell().Element(InfoStyle).AlignRight().Text($"{Math.Round(dtoTally.WeightInLbs, 5, MidpointRounding.ToZero)} lbs").FontSize(tableFontSize);


                    static QuestPDF.Infrastructure.IContainer LabelStyle(QuestPDF.Infrastructure.IContainer container)
                    {
                        return container.Background(Colors.Grey.Lighten2).AlignLeft().MinHeight(20);
                    }

                    static QuestPDF.Infrastructure.IContainer InfoStyle(QuestPDF.Infrastructure.IContainer container)
                    {
                        return container.Background(Colors.White).AlignLeft().MinHeight(20);
                    }
                });
                    });
                }

                void ComposeFooter(QuestPDF.Infrastructure.IContainer container)
                {
                    container.Column(column =>
                    {
                        column.Spacing(10);
                        if (!string.IsNullOrWhiteSpace(dtoTally.Notes))
                            column.Item().PaddingTop(0.25f).Element(ComposeComments);

                        column.Spacing(5);

                        column.Item().Table(table =>
                        {
                            table.ColumnsDefinition(columns =>
                            {
                                columns.ConstantColumn(51);
                                columns.ConstantColumn(40);
                                columns.ConstantColumn(5);
                                columns.ConstantColumn(91);
                                columns.ConstantColumn(5);
                                columns.ConstantColumn(40);
                                columns.RelativeColumn();
                                columns.ConstantColumn(50);
                                columns.RelativeColumn();
                                columns.ConstantColumn(50);
                                columns.RelativeColumn();
                            });

                            table.Cell().Element(LabelStyle).Text("Charge To:").FontSize(10);
                            table.Cell().BorderBottom(1).Element(CellStyle).Text("").FontSize(11);
                            table.Cell().BorderBottom(1).Element(CellStyle).Text("").FontSize(11);
                            table.Cell().BorderBottom(1).Element(CellStyle).Text("").FontSize(11);
                            table.Cell().Element(CellStyle).Text("").FontSize(10);
                            table.Cell().RowSpan(2).Element(LabelStyle).Text("# JTs:").FontSize(11);
                            table.Cell().RowSpan(2).Element(InfoStyle).Text(totalNumberPipeDefinitionLength.ToString()).FontSize(10);
                            table.Cell().RowSpan(2).Element(LabelStyle).Text("Length:").FontSize(11);
                            table.Cell().RowSpan(2).Element(InfoStyle).Text(totalPipeDefinitionLength.ToString()).FontSize(10);
                            table.Cell().RowSpan(2).Element(LabelStyle).Text("Weight:").FontSize(11);
                            table.Cell().RowSpan(2).Element(InfoStyle).Text(totalNumberPipeWeightDefinitionLength.ToString()).FontSize(10);
                            table.Cell().ColumnSpan(2).BorderBottom(1).Element(CellStyle).Text("Driver").ExtraLight().FontSize(8);
                            table.Cell().Element(CellStyle).Text("").FontSize(10);
                            table.Cell().BorderBottom(1).Element(CellStyle).Text("Received").ExtraLight().FontSize(8);
                            table.Cell().Element(CellStyle).Text("").FontSize(10);
                            table.Cell().Element(InfoStyle).Text("").FontSize(10);
                            table.Cell().Element(InfoStyle).Text("").FontSize(10);
                            table.Cell().Element(InfoStyle).Text("").FontSize(10);
                            table.Cell().Element(InfoStyle).Text("").FontSize(10);
                            table.Cell().Element(InfoStyle).Text("").FontSize(10);
                            table.Cell().Element(InfoStyle).Text("").FontSize(10);

                            static QuestPDF.Infrastructure.IContainer CellStyle(QuestPDF.Infrastructure.IContainer container)
                            {
                                return container.AlignCenter().MinHeight(11);
                            }

                            static QuestPDF.Infrastructure.IContainer LabelStyle(QuestPDF.Infrastructure.IContainer container)
                            {
                                return container.Background(Colors.Grey.Lighten2).AlignLeft().AlignMiddle();
                            }

                            static QuestPDF.Infrastructure.IContainer InfoStyle(QuestPDF.Infrastructure.IContainer container)
                            {
                                return container.Background(Colors.White).AlignLeft().AlignMiddle();
                            }
                        });
                    });
                }

                void ComposeComments(QuestPDF.Infrastructure.IContainer container)
                {
                    container.Background(Colors.Grey.Lighten3).MinHeight(60).Column(column =>
                    {
                        column.Item().Text("Notes").FontSize(11);
                        column.Item().Text(dtoTally.Notes).FontSize(9);
                        column.Spacing(2);
                    });
                }

                void ComposeEquipmentHeader(QuestPDF.Infrastructure.IContainer container)
                {
                    var titleStyle = TextStyle.Default.FontSize(25).SemiBold();
                    var tableFontSize = 11;

                    container.Column(column =>
                    {
                        column.Item().Row(row =>
                        {
                            row.RelativeItem(.75f).Width(8, Unit.Centimetre).Image(path);

                            row.RelativeItem().MinHeight(50).MinWidth(300).AlignLeft()
                                .Text($"{dtoTally.TallyType}  Tally #{dtoTally.TallyNumber}")
                                .BackgroundColor(Colors.Grey.Darken1)
                                .Style(titleStyle);
                        });

                        column.Item().Table(table =>
                        {
                            table.ColumnsDefinition(columns =>
                            {
                                columns.ConstantColumn(88);
                                columns.ConstantColumn(88);
                                columns.ConstantColumn(88);
                                columns.ConstantColumn(88);
                                columns.ConstantColumn(88);
                                columns.ConstantColumn(88);
                            });
                            table.Cell().Element(LabelStyle).AlignRight().Text("From:").FontSize(tableFontSize);
                            table.Cell().Element(InfoStyle).AlignRight().Text($"{dtoTally.InvoiceNumber}").FontSize(tableFontSize);
                            table.Cell().Element(LabelStyle).Text("Ship Date:").FontSize(tableFontSize);
                            table.Cell().Element(InfoStyle).Text($"{dtoTally.TalliedByUserName}").FontSize(tableFontSize);
                            table.Cell().Element(LabelStyle).Text("Tracking:").FontSize(tableFontSize);
                            table.Cell().Element(InfoStyle).Text($"01/27/24").FontSize(tableFontSize);
                            table.Cell().Element(LabelStyle).Text("Ship To:").FontSize(tableFontSize);
                            table.Cell().Element(InfoStyle).Text($"Lading #").FontSize(tableFontSize);
                            table.Cell().Element(LabelStyle).AlignRight().Text("Location:").FontSize(tableFontSize);
                            table.Cell().Element(InfoStyle).AlignRight().Text($"{dtoTally.CarrierName}").FontSize(tableFontSize);
                            table.Cell().Element(LabelStyle).Text("AFE No.:").FontSize(tableFontSize);
                            table.Cell().Element(InfoStyle).Text($"{dtoTally.ShopLocationName}").FontSize(tableFontSize);
                            table.Cell().Element(LabelStyle).Text("Dispacher:").FontSize(tableFontSize);
                            table.Cell().Element(InfoStyle).Text($"1").FontSize(tableFontSize);

                            static QuestPDF.Infrastructure.IContainer LabelStyle(QuestPDF.Infrastructure.IContainer container)
                            {
                                return container.Background(Colors.Grey.Lighten2).AlignLeft().MinHeight(20);
                            }

                            static QuestPDF.Infrastructure.IContainer InfoStyle(QuestPDF.Infrastructure.IContainer container)
                            {
                                return container.Background(Colors.White).AlignLeft().MinHeight(20);
                            }
                        });
                    });
                }

                void ComposeEquipmentFooter(QuestPDF.Infrastructure.IContainer container)
                {
                    container.Column(column =>
                    {
                        column.Item().Table(table =>
                        {
                            table.ColumnsDefinition(columns =>
                            {
                                columns.RelativeColumn();
                                columns.ConstantColumn(50);
                                columns.RelativeColumn();
                            });

                            table.Cell().BorderBottom(1).Element(CellStyle).Text("").FontSize(15);
                            table.Cell().Element(CellStyle).Text("").FontSize(15);
                            table.Cell().BorderBottom(1).Element(CellStyle).Text("").FontSize(15);
                            table.Cell().Element(CellStyle).Text("Material Received").FontSize(11);
                            table.Cell().Element(CellStyle).Text("").FontSize(15);
                            table.Cell().Element(CellStyle).Text("Material Delivered").FontSize(11);
                            table.Cell().BorderBottom(1).Element(CellStyle).Text("").FontSize(15);
                            table.Cell().Element(CellStyle).Text("").FontSize(15);
                            table.Cell().BorderBottom(1).Element(CellStyle).Text("").FontSize(15);
                            table.Cell().Element(CellStyle).Text("Date").FontSize(11);
                            table.Cell().Element(CellStyle).Text("").FontSize(15);
                            table.Cell().Element(CellStyle).Text("Date").FontSize(11);

                            static QuestPDF.Infrastructure.IContainer CellStyle(QuestPDF.Infrastructure.IContainer container)
                            {
                                return container.AlignCenter().MinHeight(11);
                            }
                        });
                    });
                }
            });
            MemoryStream stream = new MemoryStream(document.GeneratePdf());
            return stream;
        }
    }
}