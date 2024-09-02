using Inventory_Dto.Dto;
using Inventory_Models.Dto;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace Inventory_Documents
{
   public class TallyPDFLayout
   {
      private string _imagePath;

      public TallyPDFLayout(string imagePath)
      {
         _imagePath = imagePath;
      }

      public void ComposeTallyInfoTable(QuestPDF.Infrastructure.IContainer container, List<DtoPipeForTally> pipeListSubset, DtoTally_WithPipeAndCustomer dtoTally)
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
               table.Cell().BorderRight(1).Element(InfoStyle).Text($"{DateTime.Now}").FontSize(tableFontSize);
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

      public void ComposePipeSummaryTable(QuestPDF.Infrastructure.IContainer container, decimal totalPipeDefinitionLength, int totalNumberPipeDefinitionLength, decimal totalNumberPipeWeightDefinitionLength)
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

      public void ComposePipeHeader(QuestPDF.Infrastructure.IContainer container, DtoTally_WithPipeAndCustomer dtoTally)
      {
         var titleStyle = TextStyle.Default.FontSize(25).SemiBold();
         var tableFontSize = 11;

         container.Column(column =>
         {
            column.Item().Row(row =>
            {
               row.RelativeItem(.75f).Width(8, Unit.Centimetre).Image(_imagePath);

               row.RelativeItem().MinHeight(50).MinWidth(300).AlignLeft()
                   .Text($"{dtoTally.TallyType}  !!Tally #{dtoTally.TallyNumber}")
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

      public void ComposeComments(QuestPDF.Infrastructure.IContainer container, string comments)
      {
         container.Background(Colors.Grey.Lighten3).MinHeight(60).Column(column =>
         {
            column.Item().Text("Comments").FontSize(11);
            column.Item().Text(comments).FontSize(9);
            column.Spacing(2);
         });
      }


      void ComposePipeSection(IContainer container, List<DtoPipeForTally> pipes, int pipesPerPage, DtoTally_WithPipeAndCustomer dtoTally)
      {
         // Assuming pipesPerPage is an estimate of how many pipes can fit on a single page
         int totalPipes = pipes.Count;
         int renderedPipes = 0;

         while (renderedPipes < totalPipes)
         {
            // Calculate the number of pipes to render on this page
            int pipesToRender = Math.Min(pipesPerPage, totalPipes - renderedPipes);

            container.Column(column =>
            {
               // Add the header at the start of each segment
               column.Item().Element(container=>ComposePipeHeader(container, dtoTally));

               // Render the calculated number of pipes
               for (int i = 0; i < pipesToRender; i++)
               {
                  //column.Item().Text(pipes[renderedPipes + i].SomeProperty);
               }

               renderedPipes += pipesToRender;

               // If there are more pipes to render, add a page break
               if (renderedPipes < totalPipes)
               {
                  column.Item().PageBreak();
               }
            });
         }
      }
   }
}
