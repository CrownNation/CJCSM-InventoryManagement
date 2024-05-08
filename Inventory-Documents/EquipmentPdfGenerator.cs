using Inventory_Dto.Dto;
using Inventory_Models.DTO.Basic;
using QuestPDF.Fluent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Documents
{
    public class EquipmentPdfGenerator
    {
        public Stream GenerateEquipmentSummaryPDFDocuemnt(List<DtoEquipment> dtoEquipmentWithDefinitionsList)
        {

            Document document = Document.Create(container =>
            {
                container.Page(page =>
                {
                });
            });

            MemoryStream stream = new MemoryStream(document.GeneratePdf());
            return stream;
        }
    }
}
