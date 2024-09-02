using Inventory_Dto.Dto;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Documents
{
   public class EquipmentSectionPDFGenerator
   {
      TallyHeaderFooterGenerator _tallyHeaderFooterGenerator;

      public EquipmentSectionPDFGenerator(TallyHeaderFooterGenerator tallyHeaderFooterGenerator)
      {
         _tallyHeaderFooterGenerator = tallyHeaderFooterGenerator;
      }

      public void GenerateEquipmentSection(IContainer container, int startingYPosition, DtoTally_WithPipeAndCustomer dtoTally)
      {
         // Display / organize equipment by EquipmentDefinitionId. So, get all DefinitionIds from the list of equipment.
         List<DtoEquipmentDefinition> uniqueEquipmentDefinitionList = dtoTally.EquipmentList
             .GroupBy(e => e.EquipmentDefinition.EquipmentDefinitionId)
             .Select(g => g.First().EquipmentDefinition)
             .ToList();

         List<DtoEquipmentForTally> equipmentListForDefinition;

         container.Column(column =>
         {
            // Add full-width heading before the table
            column.Item().PaddingBottom(DocumentConstants.VERTICAL_SPACE_SMALL_HEIGHT_IN_POINTS)
            .PaddingTop(DocumentConstants.VERTICAL_SPACE_LARGE_HEIGHT_IN_POINTS)
            .Background(Colors.Grey.Lighten1)
            .Padding(3)
            .Text("Equipment Information")
            .FontColor("#111111")
            .FontSize(DocumentConstants.FONT_SIZE_HEADING).Bold();

            // Generate header row
            column.Item().Row(row =>
            {
               // First Col: Qty
               row.RelativeItem(0.1f).Column(col =>
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
                  .Text($"Qty")
                  .FontSize(DocumentConstants.FONT_SIZE_STANDARD);
               });

               // Second column: Description
               row.RelativeItem(.9f).Column(col =>
               {
                  col.Item().BorderColor(Colors.Grey.Darken2)
                  .BorderRight(1)
                  .BorderTop(1)
                  .BorderBottom(1)
                  .Background(Colors.Grey.Lighten2)
                  .Padding(5)
                  .AlignLeft()
                  .Text($"Description")
                  .FontSize(DocumentConstants.FONT_SIZE_STANDARD);
               });
            });

            // For each EquipmentDefinitionId, get all the equipment that have that id.
            for (int i = 0; i < uniqueEquipmentDefinitionList.Count; i++)
            {
               equipmentListForDefinition = dtoTally.EquipmentList.Where(e => e.EquipmentDefinition.EquipmentDefinitionId == uniqueEquipmentDefinitionList[i].EquipmentDefinitionId).ToList();

               // Add a header for this section
               //column.Item().PaddingBottom(DocumentConstants.VERTICAL_SPACE_SMALL_HEIGHT_IN_POINTS).Element(c => GenerateEquipmentHeader(c, uniqueEquipmentDefinitionList[i], i + 1));

               column.Item().Element(c => GenerateEquipmentRows(c, equipmentListForDefinition));
            }
         });
      }

      private void GenerateEquipmentRows(IContainer container, List<DtoEquipmentForTally> dtoEquipmentForTallies)
      {
         container.Column(column =>
         {
            int rowIndex = 0;
            foreach (DtoEquipmentForTally equipmentForTally in dtoEquipmentForTallies)
            {
               column.Item().Row(row =>
               {
                  // First column: Pipe number
                  row.RelativeItem(0.1f).Column(col =>
                  {
                     col.Item().Background(rowIndex % 2 == 0 ? Colors.White : Colors.Grey.Lighten3)
                     .BorderColor(Colors.Grey.Darken2)
                     .BorderLeft(1)
                     .BorderRight(1)
                     .BorderTop(rowIndex == 0 ? 1 : 0)
                     .BorderBottom(rowIndex == dtoEquipmentForTallies.Count - 1 ? 1 : 0)
                     .Padding(5)
                     .AlignCenter()
                     .Text($"{equipmentForTally.Quantity}")
                     .FontSize(DocumentConstants.FONT_SIZE_STANDARD);
                  });

                  // Second column: Description from equpment definition
                  row.RelativeItem(.9f).Column(col =>
                  {
                     col.Item().BorderColor(Colors.Grey.Darken2)
                     .BorderRight(1)
                     .BorderTop(rowIndex == 0 ? 1 : 0)
                     .BorderBottom(rowIndex == dtoEquipmentForTallies.Count - 1 ? 1 : 0)
                     .Background(rowIndex % 2 == 0 ? Colors.White : Colors.Grey.Lighten3)
                     .Padding(5)
                     .Text($"{equipmentForTally.EquipmentDefinition.Category} - " +
                     $"{equipmentForTally.EquipmentDefinition.Grade.Name} - " + 
                     $"{equipmentForTally.EquipmentDefinition.Size.SizeMetric}mm")
                     .FontSize(DocumentConstants.FONT_SIZE_STANDARD);
                  });

               });
               rowIndex++;
            }
         });
      }

      private object GenerateEquipmentHeader(IContainer c, DtoEquipmentDefinition dtoEquipmentDefinition, int v)
      {
         throw new NotImplementedException();
      }
   }
}
