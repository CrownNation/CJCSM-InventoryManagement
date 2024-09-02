using Inventory_Dto.Dto;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace Inventory_Documents
{
   // This is responsible for generating the header and footer of the PDF. This includes the company logo, company name, page numbers, etc.
   public class TallyHeaderFooterGenerator
   {
      string _logoImagePath = Path.GetFullPath("CJCSM_Logo_Transparent_ORIGINAL.png");

      public void GeneratePDFHeader(IContainer container, DtoTally_WithPipeAndCustomer dtoTally)
      {
         container.Column(column =>
         {
            column.Item().Row(row =>
            {
               // Logo on the left side
               row.RelativeItem(2).Width(5, Unit.Centimetre).Image(_logoImagePath);

               // Table on the right side, aligned to the right
               row.RelativeItem(2).AlignRight().Column(innerColumn =>
               {
                  innerColumn.Item().Table(table =>
                  {
                     table.ColumnsDefinition(columns =>
                     {
                        columns.ConstantColumn(100);
                        columns.ConstantColumn(120);
                     });

                     // Table cells with summary information
                     table.Cell().Element(LabelStyle).Text($"{dtoTally.TallyType} Tally#");
                     table.Cell().Element(InfoStyle).Text($"{dtoTally.TallyNumber}");

                     table.Cell().Element(LabelStyle).Text("Invoice #:");
                     table.Cell().Element(InfoStyle).Text($"{dtoTally.InvoiceNumber}");

                     table.Cell().Element(LabelStyle).Text("Date:");
                     table.Cell().Element(InfoStyle).Text($"{dtoTally.DateOfCreation.ToString("MMMM d, yyyy")}");
                  });
               });
            });
         });

         // Helper methods for styling
         static QuestPDF.Infrastructure.IContainer LabelStyle(IContainer container)
         {
            return container.Background(Colors.Grey.Lighten3)
               .ExtendHorizontal()
               .Border(2)
               .BorderColor(Colors.White)
               .Padding(5)
               .AlignRight()
               .Height(DocumentConstants.HEADING_ROW_HEIGHT)
               .DefaultTextStyle(text => text.FontSize(DocumentConstants.FONT_SIZE_STANDARD));
         }

         static QuestPDF.Infrastructure.IContainer InfoStyle(IContainer container)
         {
            return container.Background(Colors.White).AlignLeft().Padding(5).Height(DocumentConstants.HEADING_ROW_HEIGHT)
                .DefaultTextStyle(text => text.FontSize(DocumentConstants.FONT_SIZE_STANDARD));
         }
      }

      public void GeneratePDFFooter(IContainer container)
      {
         container.Column(column =>
         {
            column.Item().Height(1, Unit.Centimetre).Background(Colors.Grey.Lighten2).AlignMiddle().AlignCenter()
                .Text(text =>
                {
                   text.DefaultTextStyle(x => x.FontColor("#C90D0B").FontSize(DocumentConstants.FONT_SIZE_STANDARD));
                   text.Span("Page ");
                   text.CurrentPageNumber(); // Inserts the current page number
                   text.Span(" of ");
                   text.TotalPages(); // Inserts the total number of pages
                });
         });
      }
   }
}
