using Inventory_Dto.Dto;
using QuestPDF.Fluent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Documents
{
    public class RackPDFGenerator
    {

        public Stream GenerateRackSummaryPDFDocuemnt(List<DtoRack_WithStock> dtoRack_WithPipeList)
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
