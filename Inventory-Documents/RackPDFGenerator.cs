using Inventory_Dto.Dto;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System.Diagnostics.Metrics;

namespace Inventory_Documents
{
    public class RackPDFGenerator
    {
        string path = Path.GetFullPath("CJCSM_Logo_Transparent_ORIGINAL.png");
        int headerFontSize = 11;
        int contentFontSize = 11;
 
        public Stream GenerateRackSummaryPDFDocuemnt(List<DtoRack_WithPipe> dtoRack_WithPipeList)
        {

            Document document = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizeExtensions.Landscape(PageSizes.A4));
                    page.Margin(0.2f, Unit.Centimetre);
                    page.PageColor(Colors.White);

                    page.Content()
                        .PaddingVertical(1, Unit.Centimetre)
                         .Column(column =>
                          {
                              column.Item().Element(ComposeRackTableHeader);
                         });
                });
            });


            void ComposeRackTableHeader(QuestPDF.Infrastructure.IContainer container)
            {
                var titleStyle = TextStyle.Default.FontSize(20).SemiBold();
                var tableFontSize = 11;

                container.Column(column =>
                {
                    column.Item().Row(row =>
                    {
                        row.ConstantItem(200).Width(6, Unit.Centimetre).Image(path);
                        row.RelativeItem().MinHeight(20)
                            .Text($"Rack Alphatbetic List Report").FontSize(25);

                        row.RelativeItem(.10f).MinHeight(10)
                            .Text($"Date: ");

                        row.RelativeItem(.25f).MinHeight(10)
                            .Text($"{DateTime.Now.Date}");

                    });

                    column.Item().Table(table =>
                    {
                        table.ColumnsDefinition(columns =>
                        {
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.ConstantColumn(60);
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                        });

                        table.Header(header =>
                        {
                            header.Cell().BorderTop(1).Element(CellStyle).Text(" Rack #").FontSize(headerFontSize);
                            header.Cell().BorderTop(1).Element(CellStyle).Text(" Tier #").FontSize(headerFontSize);
                            header.Cell().BorderTop(1).Element(CellStyle).Text(" Owner").FontSize(headerFontSize);
                            header.Cell().BorderTop(1).Element(CellStyle).Text(" Size").FontSize(headerFontSize);
                            header.Cell().BorderTop(1).Element(CellStyle).Text(" Weight").FontSize(headerFontSize);
                            header.Cell().BorderTop(1).Element(CellStyle).Text(" Wall").FontSize(headerFontSize);
                            header.Cell().BorderTop(1).Element(CellStyle).Text(" Grade").FontSize(headerFontSize);
                            header.Cell().BorderTop(1).Element(CellStyle).Text(" Thread").FontSize(headerFontSize);
                            header.Cell().BorderTop(1).Element(CellStyle).Text(" Rng.").FontSize(headerFontSize);
                            header.Cell().BorderTop(1).Element(CellStyle).Text(" Condition").FontSize(headerFontSize);
                            header.Cell().BorderTop(1).Element(CellStyle).Text(" Other").FontSize(headerFontSize);
                            header.Cell().BorderTop(1).Element(CellStyle).Text(" Stock PO").FontSize(headerFontSize);
                            header.Cell().BorderTop(1).Element(CellStyle).Text(" Stckcrd").FontSize(headerFontSize);
                            header.Cell().BorderTop(1).Element(CellStyle).Text(" #JTs").FontSize(headerFontSize);
                            header.Cell().BorderTop(1).Element(CellStyle).Text(" Weight").FontSize(headerFontSize);
                            header.Cell().BorderTop(1).Element(CellStyle).Text(" Length").FontSize(headerFontSize);

                            static IContainer CellStyle(IContainer container)
                            {
                                return container.DefaultTextStyle(x => x.SemiBold()).PaddingVertical(1).BorderBottom(1).BorderColor(Colors.Black);
                            }
                        });


                        for(int i = 0; i < dtoRack_WithPipeList.Count; i++)
                        {
                            for (int j = 0; j < dtoRack_WithPipeList[i].PipeList.Count; j++)
                            {
                                table.Cell().Text(dtoRack_WithPipeList[i].PipeList[j].RackName.ToString()).FontSize(contentFontSize);
                                table.Cell().Text(dtoRack_WithPipeList[i].PipeList[j].TierNumber.ToString()).FontSize(contentFontSize);
                                table.Cell().Text(" ").FontSize(contentFontSize);
                                table.Cell().Text(dtoRack_WithPipeList[i].PipeList[j].PipeDefinition.Size.SizeMetric.ToString()).FontSize(contentFontSize);
                                table.Cell().Text(dtoRack_WithPipeList[i].PipeList[j].PipeDefinition.Weight.WeightInKgPerMeter.ToString()).FontSize(contentFontSize);
                                table.Cell().Text(dtoRack_WithPipeList[i].PipeList[j].PipeDefinition.Wall.WallMetric.ToString()).FontSize(contentFontSize);
                                table.Cell().Text(dtoRack_WithPipeList[i].PipeList[j].PipeDefinition.Grade.Name.ToString()).FontSize(contentFontSize);
                                table.Cell().Text(dtoRack_WithPipeList[i].PipeList[j].PipeDefinition.Thread.Name.ToString()).FontSize(contentFontSize);
                                table.Cell().Text(dtoRack_WithPipeList[i].PipeList[j].PipeDefinition.Range.Name.ToString()).FontSize(contentFontSize);
                                table.Cell().Text(dtoRack_WithPipeList[i].PipeList[j].PipeDefinition.Condition.Name.ToString()).FontSize(contentFontSize);
                                table.Cell().Text(" Other ").FontSize(contentFontSize);
                                table.Cell().Text(" StockPO").FontSize(contentFontSize);
                                table.Cell().Text(" Stockcrd").FontSize(contentFontSize);
                                table.Cell().Text(dtoRack_WithPipeList[i].PipeList[j].Quantity.ToString()).FontSize(contentFontSize);
                                table.Cell().Text(dtoRack_WithPipeList[i].PipeList[j].PipeDefinition.Weight.WeightInKgPerMeter.ToString()).FontSize(contentFontSize);
                                table.Cell().Text(" Length").FontSize(contentFontSize);
                            }
                        }

                        //for (int i = 0; i < dtoEquipmentWithDefinitionsList.Count; i++)
                        //{
                         //   table.Cell().Element(LabelStyle).Text($" {dtoEquipmentWithDefinitionsList[i].EquipmentDefinition.Description}").FontSize(tableFontSize);
                         //   table.Cell().Element(InfoStyle).Text($" {dtoEquipmentWithDefinitionsList[i].Quantity}").FontSize(tableFontSize);
                        //}

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

            MemoryStream stream = new MemoryStream(document.GeneratePdf());
            return stream;
        }
    }
}
