using Inventory_Dto.Dto;
using QuestPDF.Infrastructure;
using QuestPDF.Fluent;
using QuestPDF.Helpers;

namespace Inventory_Documents
{
    public class CreateTallyEquipmentTableComponent : IComponent
    {
        public List<DtoEquipment> equipmentList;

        public CreateTallyEquipmentTableComponent(List<DtoEquipment> equipmentList)
        {
            this.equipmentList = equipmentList;
        }


        public void Compose(IContainer container)
        {
            container.Column(column =>
            {
                column.Item().Padding(40).Table(table =>
                {
                    table.ColumnsDefinition(columns =>
                    {
                        columns.ConstantColumn(55);
                        columns.ConstantColumn(400);

                    });

                    table.Header(header =>
                        {
                            header.Cell().BorderLeft(1).Element(CellStyle).Text(" Qty").FontSize(18);
                            header.Cell().BorderRight(1).Element(CellStyle).Text(" Description").FontSize(18);

                            static IContainer CellStyle(IContainer container)
                            {
                                return container.DefaultTextStyle(x => x.SemiBold()).PaddingVertical(1).BorderBottom(1).BorderTop(1).BorderColor(Colors.Black);
                            }
                        });


                    for (int j = 0; j < equipmentList.Count; j++)
                    {

                        table.Cell().Element(CellStyle).Text(equipmentList[j].Quantity.ToString()).FontSize(15);
                        //table.Cell().Element(CellStyle).Text(equipmentList[j].Description).FontSize(15);

                        if (j == equipmentList.Count - 1)
                        {
                           // table.Cell().BorderBottom(1);
                          //  table.Cell().BorderBottom(1);
                        }


                    }

                    static IContainer CellStyle(IContainer container)
                    {
                        return container.BorderLeft(1).BorderRight(1).BorderBottom(1).BorderColor(Colors.Black).PaddingVertical(2).PaddingLeft(3);
                    }

                });
            });

        }
    }
}
