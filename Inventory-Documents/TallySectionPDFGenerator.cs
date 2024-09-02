using Inventory_Dto.Dto;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace Inventory_Documents
{
   // This is responsible for generating the tally section of the PDF. This includes the tally information block containing the customer name, tally summaries, etc.
   public class TallySectionPDFGenerator
   {
      string _logoImagePath = Path.GetFullPath("CJCSM_Logo_Transparent_ORIGINAL.png");

      public TallySectionPDFGenerator() { }

      public void GenerateTallySection(IContainer container, DtoTally_WithPipeAndCustomer dtoTally)
      {
         int totalNumberPipes = dtoTally.PipeList.Sum(pipe => pipe.Quantity);

         container.Column(column =>
         {
            // Add full-width heading before the table
            column.Item()
            .Background(Colors.Grey.Lighten1)
            .Padding(3)
            .Text("Tally Information")
            .FontColor("#111111")
            .FontSize(DocumentConstants.FONT_SIZE_HEADING).Bold();

            column.Item().PaddingTop(DocumentConstants.VERTICAL_SPACE_SMALL_HEIGHT_IN_POINTS).Table(table =>
            {
               table.ColumnsDefinition(columns =>
               {
                  columns.ConstantColumn(120);
                  columns.ConstantColumn(148);
                  columns.ConstantColumn(120);
                  columns.ConstantColumn(148);
               });

               table.Cell().Element(LabelStyle).Text("Customer Name:");
               table.Cell().Element(InfoStyle).Text($"{dtoTally.CustomerName}");

               table.Cell().Element(LabelStyle).Text("Bill Lading:");
               table.Cell().Element(InfoStyle).Text($"DEJ382764");

               table.Cell().Element(LabelStyle).Text("Tallied by:");
               //table.Cell().Element(InfoStyle).Text($"{dtoTally.TalliedByUserName}");
               table.Cell().Element(InfoStyle).Text($"John Smith");

               table.Cell().Element(LabelStyle).Text("Weight (kg):");
               table.Cell().Element(InfoStyle).Text($"{dtoTally.WeightInKg.ToString("N1")}");

               table.Cell().Element(LabelStyle).Text("Yard:");
               table.Cell().Element(InfoStyle).Text($"{dtoTally.ShopLocationName}");

               table.Cell().Element(LabelStyle).Text("Weight (lbs):");
               table.Cell().Element(InfoStyle).Text($"{dtoTally.WeightInLbs.ToString("N1")}");

               table.Cell().Element(LabelStyle).Text("Carrier Name:");
               table.Cell().Element(InfoStyle).Text($"{dtoTally.CarrierName}");

               table.Cell().Element(LabelStyle).Text("Total Jts:");
               table.Cell().Element(InfoStyle).Text($"{totalNumberPipes}");
            });
         });

         // Helper methods for styling
         static QuestPDF.Infrastructure.IContainer LabelStyle(QuestPDF.Infrastructure.IContainer container)
         {
            return container.Background(Colors.Grey.Lighten3).ExtendHorizontal().Border(2).BorderColor(Colors.White).Padding(5).AlignRight()
               .Height(DocumentConstants.HEADING_ROW_HEIGHT)
               .DefaultTextStyle(text => text.FontSize(DocumentConstants.FONT_SIZE_STANDARD));
         }

         static QuestPDF.Infrastructure.IContainer InfoStyle(QuestPDF.Infrastructure.IContainer container)
         {
            return container.Background(Colors.White).AlignLeft().Padding(5).Height(DocumentConstants.HEADING_ROW_HEIGHT)
                .DefaultTextStyle(text => text.FontSize(DocumentConstants.FONT_SIZE_STANDARD));
         }
      }

   }
}
