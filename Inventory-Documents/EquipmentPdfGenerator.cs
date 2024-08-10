using Inventory_Dto.Dto;
using Inventory_Models.Dto;
using Inventory_Models.DTO.Basic;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Documents
{
    public class EquipmentPdfGenerator
    {
        string path = Path.GetFullPath("CJCSM_Logo_Transparent_ORIGINAL.png");
        public Stream GenerateEquipmentSummaryPDFDocuemnt(List<DtoEquipment> dtoEquipmentWithDefinitionsList)
        {

            Document document = Document.Create(container =>
            {
                container.Page(page =>
                {

                    page.Content()
                         .PaddingVertical(1, Unit.Centimetre)
                           .Column(column =>
                          {
                              column.Item().Element(ComposePipeHeader);
                              // x.Spacing(20);

                              //  x.Item().Text($"Customer: {dtoTally.CustomerName}");
                              //    x.Item().Image(Placeholders.Image(200, 100));
                          });

                });
            });

            void ComposePipeHeader(QuestPDF.Infrastructure.IContainer container)
            {
                var titleStyle = TextStyle.Default.FontSize(20).SemiBold();
                var tableFontSize = 11;

                container.Column(column =>
                {
                    column.Item().Row(row =>
                    {
                        row.ConstantItem(200).Width(6, Unit.Centimetre).Image(path);
                        row.RelativeItem().MinHeight(20)
                            .Text($"Equipment Stock Report").FontSize(25);

                        row.RelativeItem(.10f).MinHeight(10)
                            .Text($"Date: ");

                        row.RelativeItem(.25f).MinHeight(10)
                            .Text($"{DateTime.Now.Date}");

                    });

                    column.Item().Row(row =>
                    {
                        row.RelativeItem(.20f).MinHeight(20)
                            .Text($"For owner:");

                        row.RelativeItem(.20f).MinHeight(10)
                            .Text($"Date");

                        row.RelativeItem(.20f).MinHeight(10)
                            .Text($"Standard Report");

                    });

                    column.Item().Table(table =>
                    {
                        table.ColumnsDefinition(columns =>
                        {
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                        });

                        table.Header(header =>
                        {
                            header.Cell().BorderTop(1).Element(CellStyle).Text(" Decription").FontSize(12);
                            header.Cell().BorderTop(1).Element(CellStyle).Text(" Qty:").FontSize(12);

                            static IContainer CellStyle(IContainer container)
                            {
                                return container.DefaultTextStyle(x => x.SemiBold()).PaddingVertical(1).BorderBottom(1).BorderColor(Colors.Black);
                            }
                        });

                        for (int i = 0; i < dtoEquipmentWithDefinitionsList.Count; i++)
                        {
                            table.Cell().Element(LabelStyle).Text($" {dtoEquipmentWithDefinitionsList[i].EquipmentDefinition.Description}").FontSize(tableFontSize);
                            table.Cell().Element(InfoStyle).Text($" {dtoEquipmentWithDefinitionsList[i].Quantity}").FontSize(tableFontSize);
                        }

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
