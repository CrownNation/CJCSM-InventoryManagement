using Inventory_Dto.Dto;
using Inventory_Models.Dto;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace Inventory_Documents
{
   public class PipeSectionPDFGenerator
   {
      public int _currentYPosition = 0;
      TallyHeaderFooterGenerator _tallyHeaderFooterGenerator;

      public PipeSectionPDFGenerator(TallyHeaderFooterGenerator tallyHeaderFooterGenerator)
      {
         _tallyHeaderFooterGenerator = tallyHeaderFooterGenerator;
      }

      // Here is an algorithm to handle putting the pipe group header at the top of every new page. (I don't think it's necessary after all, but leaving in case)
      // Before we generate 3 rows, check PIPE_ROW_HEIGHT_IN_POINTS * 3 against PAGE_HEIGHT_IN_POINTS, if the new rows would not fit, then
      // generate a new page, add a header, then continue generating rows. 
      // For each pipe definition that is added, check that PIPE_HEADER_HEIGHT_IN_POINTS +PIPE_ROW_HEIGHT_IN_POINTS *3 will fit on the page (ie. less than page height).
      // If it won't fit, create a new page first.


      public void GeneratePipeSection(IContainer container, int startingYPosition, DtoTally_WithPipeAndCustomer dtoTally)
      {

         // Display / organize pipes by PipeDefinitionId. So, get all DefinitionIds from the list of pipes.
         List<DtoPipeDefinition> uniquePipeDefinitionList = dtoTally.PipeList
             .GroupBy(p => p.PipeDefinition.PipeDefinitionId)
             .Select(g => g.First().PipeDefinition)
             .ToList();

         List<DtoPipeForTally> pipesListForDefinition;

         container.Column(column =>
         {
            // Add full-width heading before the table
            column.Item().PaddingBottom(DocumentConstants.VERTICAL_SPACE_SMALL_HEIGHT_IN_POINTS)
            .PaddingTop(DocumentConstants.VERTICAL_SPACE_LARGE_HEIGHT_IN_POINTS)
            .Background(Colors.Grey.Lighten1)
            .Padding(3)
            .Text("Pipe Information")
            .FontColor("#111111")
            .FontSize(DocumentConstants.FONT_SIZE_HEADING).Bold();

            // For each PipeDefinitionId, get all the pipes that have that id.
            for (int i = 0; i < uniquePipeDefinitionList.Count; i++)
            {
               pipesListForDefinition = dtoTally.PipeList.Where(p => p.PipeDefinition.PipeDefinitionId == uniquePipeDefinitionList[i].PipeDefinitionId).ToList();
               // Add a header for this section
               column.Item().PaddingBottom(DocumentConstants.VERTICAL_SPACE_SMALL_HEIGHT_IN_POINTS).Element(c => GeneratePipeHeader(c, uniquePipeDefinitionList[i],i+1));

               // Track the number of rows generated
               int pipesGenerated = 0;

               int totalPipes = pipesListForDefinition.Sum(p => p.Quantity);

               //Generate header row
               column.Item().Row(row =>
               {
                  for (int colIndex = 0; colIndex < 4; colIndex++)
                  {
                     //First Col: Jt.#
                     row.RelativeItem(0.4f).Column(col =>
                     {
                        col.Item()
                        .BorderColor(Colors.Grey.Darken2)
                        .BorderLeft(1)
                        .BorderRight(1)
                        .BorderTop(1)
                        .BorderBottom(1)
                        .Background(Colors.Grey.Lighten2)
                        .Padding(5)
                        .AlignCenter()
                        .Text($"Jt.#")
                        .FontSize(DocumentConstants.FONT_SIZE_STANDARD);
                     });
                     // Second column: Length
                     row.RelativeItem(.9f).Column(col =>
                     {
                        col.Item().BorderColor(Colors.Grey.Darken2)
                        .BorderRight(1)
                        .BorderTop(1)
                        .BorderBottom(1)
                        .Background(Colors.Grey.Lighten2)
                        .Padding(5)
                        .AlignLeft()
                        .Text($"Length (m)")
                        .FontSize(DocumentConstants.FONT_SIZE_STANDARD);
                     });

                     // Third column: Gap
                     if (colIndex < 3)
                     {
                        row.RelativeItem(0.2f)
                        .Element(EmptyElement);
                     }
                  }
               });

               // Generate the rows of pipes, 3 rows at a time
               while (pipesGenerated < totalPipes)
               {
                  // Ensure enough space for another set of 3 rows
                  if (_currentYPosition + (DocumentConstants.PIPE_ROW_HEIGHT_IN_POINTS) > DocumentConstants.PAGE_HEIGHT) // 3 rows of 4 columns
                  {
                     column.Item().PageBreak();
                     column.Item().Element(c => _tallyHeaderFooterGenerator.GeneratePDFHeader(c, dtoTally));
                     column.Item().Element(c => GeneratePipeHeader(c, uniquePipeDefinitionList[i], i + 1));
                  }

                  // Generate the 3 rows of pipes
                  column.Item().Element(c => GeneratePipeRows(c, pipesListForDefinition.Skip(pipesGenerated).Take(12).ToList())); // 12 items for 3 rows

                  pipesGenerated += 12; // Move to the next set of rows
               }
            }
         });
      }

      public void GeneratePipeHeader(IContainer container, DtoPipeDefinition pipeDefinition, int pipeGroupNumber)
      {
         container.Column(column =>
         {
            int verticalSpace = 0;

            // Add extra space for the second and subsequent pipe groups
            if(pipeGroupNumber > 1)
            {
               verticalSpace = DocumentConstants.VERTICAL_SPACE_LARGE_HEIGHT_IN_POINTS;
            }

            // Add full-width heading before the table
            column.Item().PaddingBottom(DocumentConstants.VERTICAL_SPACE_SMALL_HEIGHT_IN_POINTS)
            .PaddingTop(verticalSpace)
            .Background(Colors.White)
            .BorderBottom(1)
            .Padding(3)
            .Text("Pipe Group #" +pipeGroupNumber)
            .FontColor("#111111")
            .FontSize(DocumentConstants.FONT_SIZE_HEADING).Bold();

            column.Item().Table(table =>
            {
               table.ColumnsDefinition(columns =>
               {
                  //columns.ConstantColumn(120);
                  //columns.ConstantColumn(148);
                  //columns.ConstantColumn(120);
                  //columns.ConstantColumn(148);
                  //columns.ConstantColumn(120);
                  //columns.ConstantColumn(148);
                  columns.ConstantColumn(80);
                  columns.ConstantColumn(96);
                  columns.ConstantColumn(80);
                  columns.ConstantColumn(96);
                  columns.ConstantColumn(80);
                  columns.ConstantColumn(96);

               });

               table.Cell().Element(LabelStyle).Text("Cateogry");
               table.Cell().Element(InfoStyle).Text($"{pipeDefinition.Category.Name}");

               table.Cell().Element(LabelStyle).Text("Coating");
               table.Cell().Element(InfoStyle).Text($"{pipeDefinition.Coating.Name}");

               table.Cell().Element(LabelStyle).Text("Condition");
               table.Cell().Element(InfoStyle).Text($"{pipeDefinition.Condition.Name}");

               table.Cell().Element(LabelStyle).Text("Grade");
               table.Cell().Element(InfoStyle).Text($"{pipeDefinition.Grade.Name}");

               table.Cell().Element(LabelStyle).Text("Range");
               table.Cell().Element(InfoStyle).Text($"{pipeDefinition.Range.Name}");

               table.Cell().Element(LabelStyle).Text("Size (mm)");
               table.Cell().Element(InfoStyle).Text($"{pipeDefinition.Size.SizeMetric}");

               table.Cell().Element(LabelStyle).Text("Size (in)");
               table.Cell().Element(InfoStyle).Text($"{pipeDefinition.Size.SizeImperial}");

               table.Cell().Element(LabelStyle).Text("Thread");
               table.Cell().Element(InfoStyle).Text($"{pipeDefinition.Thread.Name}");

               table.Cell().Element(LabelStyle).Text("Wall (mm)");
               table.Cell().Element(InfoStyle).Text($"{pipeDefinition.Wall.WallMetric}");

               table.Cell().Element(LabelStyle).Text("Wall (in)");
               table.Cell().Element(InfoStyle).Text($"{pipeDefinition.Wall.WallImperial}");

               table.Cell().Element(LabelStyle).Text("Weight (kg/m)");
               table.Cell().Element(InfoStyle).Text($"{pipeDefinition.Weight.WeightInKgPerMeter}");

               table.Cell().Element(LabelStyle).Text("Weight (lbs/ft)");
               table.Cell().Element(InfoStyle).Text($"{pipeDefinition.Weight.WeightInLbsPerFoot}");

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

      private void GeneratePipeRows(IContainer container, List<DtoPipeForTally> pipesList)
      {
         // Sort by IndexOfPipe
         pipesList = pipesList.OrderBy(pipe => pipe.IndexOfPipe).ToList();

         // Create a list to hold each individual pipe entry, respecting the quantity of each group
         List<DtoPipeForTally> expandedPipesList = new List<DtoPipeForTally>();

         foreach (var pipeGroup in pipesList)
         {
            for (int i = 0; i < pipeGroup.Quantity; i++)
            {
               expandedPipesList.Add(pipeGroup);
            }
         }

         // Now we generate the rows for the expanded pipe list
         int numRows = (expandedPipesList.Count + 3) / 4; // Calculate the number of rows needed

         container.Column(column =>
         {
            // Used to just show the pipes in order, starting at 1
            int pipeNumber = 1;

            for (int rowIndex = 0; rowIndex < numRows; rowIndex++)
            {
               column.Item().Row(row =>
               {
                  for (int colIndex = 0; colIndex < 4; colIndex++)
                  {
                     int pipeIndex = rowIndex * 4 + colIndex;

                     if (pipeIndex < expandedPipesList.Count)
                     {
                        // First column: Pipe number
                        row.RelativeItem(0.4f).Column(col =>
                        {
                           col.Item().Background(rowIndex % 2 == 0 ? Colors.White : Colors.Grey.Lighten3)
                           .BorderColor(Colors.Grey.Darken2)
                           .BorderLeft(1)
                           .BorderRight(1)
                           .BorderTop(rowIndex == 0 ? 1 : 0)
                           .BorderBottom(rowIndex == numRows - 1 ? 1 : 0)
                           .Padding(5)
                           .AlignCenter()
                           .Text($"{pipeNumber}")
                           .FontSize(DocumentConstants.FONT_SIZE_STANDARD);
                        });

                        // Second column: Length
                        row.RelativeItem(.9f).Column(col =>
                        {
                           col.Item().BorderColor(Colors.Grey.Darken2)
                           .BorderRight(1)
                           .BorderTop(rowIndex == 0 ? 1 : 0)
                           .BorderBottom(rowIndex == numRows - 1 ? 1 : 0)
                           .Background(rowIndex % 2 == 0 ? Colors.White : Colors.Grey.Lighten3)
                           .Padding(5)
                           .Text($"{expandedPipesList[pipeIndex].LengthInMeters} m")
                           .FontSize(DocumentConstants.FONT_SIZE_STANDARD);
                        });

                        // Third column: Gap
                        if (colIndex < 3)
                        {
                           row.RelativeItem(0.2f)
                           .Element(EmptyElement);
                        }

                        pipeNumber++;
                     }
                     else
                     {
                        //// If there is no pipe to fill this column, add an empty space
                        //// Size is different depending on which column it is. It should be the same as above (sum of the column sizes), minus the gap in the last col
                        //float size = colIndex < 3 ? 1.5f : 1.3f;
                        //row.RelativeItem(size)
                        //.BorderTop(rowIndex == 0 ? 1 : 0)
                        //.BorderLeft(1)
                        //.BorderRight(1)
                        //.BorderBottom(rowIndex == numRows - 1 ? 1 : 0)
                        //.Element(EmptyElement); // Take up space for both the length and gap

                        //Generate the same columns as above, but with empty values
                        // First column: Pipe number
                        row.RelativeItem(0.4f).Column(col =>
                        {
                           col.Item().Background(rowIndex % 2 == 0 ? Colors.White : Colors.Grey.Lighten3)
                           .BorderColor(Colors.Grey.Darken2)
                           .BorderLeft(1)
                           .BorderRight(1)
                           .BorderTop(rowIndex == 0 ? 1 : 0)
                           .BorderBottom(rowIndex == numRows - 1 ? 1 : 0)
                           .Padding(5)
                           .Text("")
                           .FontSize(DocumentConstants.FONT_SIZE_STANDARD);
                        });

                        // Second column: Length
                        row.RelativeItem(.9f).Column(col =>
                        {
                           col.Item().BorderColor(Colors.Grey.Darken2)
                           .BorderRight(1)
                           .BorderTop(rowIndex == 0 ? 1 : 0)
                           .BorderBottom(rowIndex == numRows - 1 ? 1 : 0)
                           .Background(rowIndex % 2 == 0 ? Colors.White : Colors.Grey.Lighten3)
                           .Padding(5)
                           .Text("")
                           .FontSize(DocumentConstants.FONT_SIZE_STANDARD);
                        });

                        // Third column: Gap
                        if (colIndex < 3)
                        {
                           row.RelativeItem(0.2f)
                           .Element(EmptyElement);
                        }

                     }
                  }
               });
            }
         });
      }

      // Method to return an empty element, used to fill the gaps if there are less than 4 pipes in the last row
      private IContainer EmptyElement(IContainer container)
      {
         return container.Padding(0);
      }



   }
}
