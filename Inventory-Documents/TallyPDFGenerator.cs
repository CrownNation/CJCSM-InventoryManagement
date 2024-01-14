using Inventory_Dto.Dto;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System.ComponentModel;

namespace Inventory_Documents
{
    public class TallyPDFGenerator
    {
        public Stream GenerateTallyPDFDocuemnt(DtoTally_WithPipeAndCustomer dtoTally)
        {
            System.Diagnostics.Debug.WriteLine("IN TallyPDFGenerator");



            Document document = Document.Create(container =>
            {
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
                        .AlignCenter()
                        .Text(x =>
                        {
                            x.Span("Page ");
                            x.CurrentPageNumber();
                        });
                });
            });

            MemoryStream stream = new MemoryStream(document.GeneratePdf());
            return stream;

        }
    }
}

