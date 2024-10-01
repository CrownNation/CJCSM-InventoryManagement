using Inventory_Dto.Dto;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace Inventory_Documents
{
   public class TallyPDFGenerator
   {
      // I got this number by trial and error. First, generate the PDF as normal.
      // Then, use the tally or pipe section, and modify the padding top after you comment out all sections that generate before that section.
      // Compare the padding top to the original document by switching between the files (or in PS) to see the difference between the original section locaiton
      // and the location using only the padding number.
      // The goal here is to find the distance (using padding) from the top of the page to the location the section you want to know the distance to.
      int HEADER_AND_TALLY_SECTION_HEIGHT = 210;

      decimal totalPipeDefinitionLength = 0;
      int totalNumberPipeDefinitionLength = 0;
      decimal totalNumberPipeWeightDefinitionLength = 0;
      List<DtoPipeForTally> pipeListSubset;
      List<DtoEquipmentForTally> equipListSubset = new List<DtoEquipmentForTally>();

      TallyHeaderFooterGenerator _tallyHeaderFooterGenerator;
      PipeSectionPDFGenerator _pipeSectionPDFGenerator;
      TallySectionPDFGenerator _tallySectionPDFGenerator;
      EquipmentSectionPDFGenerator _equipmentSectionPDFGenerator;

      public Stream GenerateTallyPDFDocuemnt(DtoTally_WithPipeAndCustomer dtoTally)
      {
         _tallyHeaderFooterGenerator = new TallyHeaderFooterGenerator();
         _pipeSectionPDFGenerator = new PipeSectionPDFGenerator(_tallyHeaderFooterGenerator);
         _tallySectionPDFGenerator = new TallySectionPDFGenerator();
         _equipmentSectionPDFGenerator = new EquipmentSectionPDFGenerator(_tallyHeaderFooterGenerator);

         Document document = Document.Create(container =>
         {
            List<DtoPipeForTally> pipeList = new List<DtoPipeForTally>();

            container.Page(page =>
               {
                  page.Size(PageSizes.Letter);
                  page.Margin(0);
                  page.PageColor(Colors.White);
                  page.DefaultTextStyle(x => x.FontSize(DocumentConstants.FONT_SIZE_STANDARD));

                  page.Header()
                     .PaddingTop(1, Unit.Centimetre)
                     .PaddingLeft(1, Unit.Centimetre)
                     .PaddingRight(1, Unit.Centimetre)
                     .PaddingBottom(DocumentConstants.VERTICAL_SPACE_SMALL_HEIGHT_IN_POINTS)
                     .Background(Colors.White)
                     .Element(container => _tallyHeaderFooterGenerator.GeneratePDFHeader(container, dtoTally));

                  page.Content()
                            .PaddingTop(0, Unit.Centimetre)
                            .PaddingLeft(1, Unit.Centimetre)
                            .PaddingRight(1, Unit.Centimetre)
                            .PaddingBottom(DocumentConstants.VERTICAL_SPACE_SMALL_HEIGHT_IN_POINTS)
                            .Column(column =>
                            {
                               column.Item().Element(container => _tallySectionPDFGenerator.GenerateTallySection(container, dtoTally));

                               int currentYPosition = HEADER_AND_TALLY_SECTION_HEIGHT;
                               if(dtoTally.PipeList.Count > 0)
                                  column.Item().Element(container => _pipeSectionPDFGenerator.GeneratePipeSection(container, currentYPosition, dtoTally));

                               if(dtoTally.EquipmentList.Count > 0)
                                  column.Item().Element(container => _equipmentSectionPDFGenerator.GenerateEquipmentSection(container, currentYPosition, dtoTally));
                               
                               // Uncomment this to generate heights for test purposes
                               // Will need to comment out the sections above

                               //Full page height
                               /*
                               column.Item().Element(element =>
                               {
                                  element
                                      .Height(720)      // Page height excluding footer (ie. usable page height)
                                      .Width(50)        // Set width to 50 points
                                      .Background(Colors.Grey.Lighten2); // Optional: Add background color for visibility
                               });
                               */
                            });

                  page.Footer()
                     .AlignBottom()
                     .Padding(0)
                     .Height(1.5f, Unit.Centimetre)
                     .Background(Colors.Grey.Lighten2)
                     .Element(container => _tallyHeaderFooterGenerator.GeneratePDFFooter(container));

               });


         });
         MemoryStream stream = new MemoryStream(document.GeneratePdf());
         return stream;
      }
   }
}