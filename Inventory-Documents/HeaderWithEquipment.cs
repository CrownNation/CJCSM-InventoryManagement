

using Inventory_Dto.Dto;
using QuestPDF.Elements;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace Inventory_Documents
{
    public class HeaderWithEquipment : IDynamicComponent<bool>
    {
        public bool State { get; set; }
        public DtoTally_WithPipeAndCustomer dtoTally { get; set; }


        public DynamicComponentComposeResult Compose(DynamicContext context)
        {
            var content = context.CreateElement(element =>
            {
                if (State == false)
                {
                    element.Column(column =>
                    {
                        column.Item().Element(ComposePipeHeader);
                    });
                }
                else
                {
                    element
                        .Text(x =>
                        {
                            x.CurrentPageNumber();
                            x.Span(" of ");
                            x.TotalPages();
                        });
                }
            });

            return new DynamicComponentComposeResult
            {
                Content = content,
                HasMoreContent = false
            };
        }
        void ComposePipeHeader(QuestPDF.Infrastructure.IContainer container)
        {
            var titleStyle = TextStyle.Default.FontSize(25).SemiBold();
            var tableFontSize = 11;

            container.Column(column =>
            {
                column.Item().Row(row =>
                {
                    //row.AutoItem().Image("CJCSM_Logo_Transparent_ORIGINAL.png"); //.Image(Placeholders.Image(200, 50));
                    //row.RelativeItem().Image("CJCSM_Logo_Transparent_ORIGINAL.png");
                    //row.RelativeItem().Image("path/CJCSM_Logo_Transparent_ORIGINAL.png");

                    //byte[] imageData = File.ReadAllBytes("CJCSM-InventoryManagement/Inventory-Documents/CJCSM_Logo_Transparent_ORIGINAL.png");
                    //row.RelativeItem().Image(imageData);

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
    }
}
