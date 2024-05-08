using Inventory_Dto.Dto;
using QuestPDF.Infrastructure;
using QuestPDF.Fluent;
using QuestPDF.Helpers;

namespace Inventory_Documents
{
    public class CreatePipeTableComponent : IComponent
    {
        public List<DtoPipe> pipeList;

        public CreatePipeTableComponent(List<DtoPipe> pipeList)
        {
            this.pipeList = pipeList;
        }


        public void Compose(IContainer container)
        {
            container.Column(column =>
            {
                column.Item().Table(table =>
                {
                    table.ColumnsDefinition(columns =>
                    {
                        columns.ConstantColumn(55);
                        columns.RelativeColumn();
                        columns.ConstantColumn(55);
                        columns.RelativeColumn();
                        columns.ConstantColumn(55);
                        columns.RelativeColumn();
                        columns.ConstantColumn(55);
                        columns.RelativeColumn();
                    });

                    table.Header(header =>
                        {
                            header.Cell().BorderLeft(1).Element(CellStyle).Text(" No.").FontSize(12);
                            header.Cell().BorderRight(1).Element(CellStyle).Text(" Length").FontSize(12);
                            header.Cell().BorderLeft(1).Element(CellStyle).Text(" No.").FontSize(12);
                            header.Cell().BorderRight(1).Element(CellStyle).Text(" Length").FontSize(12);
                            header.Cell().BorderLeft(1).Element(CellStyle).Text(" No.").FontSize(12);
                            header.Cell().BorderRight(1).Element(CellStyle).Text(" Length").FontSize(12);
                            header.Cell().BorderLeft(1).Element(CellStyle).Text(" No.").FontSize(12);
                            header.Cell().BorderRight(1).Element(CellStyle).Text(" Length").FontSize(12);


                            static IContainer CellStyle(IContainer container)
                            {
                                return container.DefaultTextStyle(x => x.SemiBold()).PaddingVertical(1).BorderBottom(1).BorderColor(Colors.Black);
                            }
                        });

                    int MaxNumberOfRows = (pipeList.Count + 3) / 4;
                    //MaxNumberOfRows++;
                    int CurrentNumberOfRows = MaxNumberOfRows;
                    int Modulus = pipeList.Count % 4;
                    int ModulusCounter = 0;
                    int counter = 0;
                    for (int i = 1; i < 9; i += 2)
                    {
                        if (i == (Modulus * 2) + 1)
                        {
                            CurrentNumberOfRows--;
                        }

                        for (int j = 1; j <= MaxNumberOfRows; j++)
                        {
                            if (j <= CurrentNumberOfRows)
                            {
                                
                                table.Cell().Row((uint)j).Column((uint)i).Element(CellStyle).Text(pipeList[counter].IndexOfPipe.ToString()).FontSize(10);
                                table.Cell().Row((uint)j).Column((uint)i + 1).Element(CellStyle).Text(pipeList[counter].LengthInFeet.ToString()).FontSize(10);
                                counter++;
                            }
                            else
                            {
                                table.Cell().Row((uint)j).Column((uint)i).Element(CellStyle).Text("").FontSize(10);
                                table.Cell().Row((uint)j).Column((uint)i + 1).Element(CellStyle).Text("").FontSize(10);
                            }
                            if (j == MaxNumberOfRows)
                            {
                                table.Cell().Row((uint)j).Column((uint)i).BorderBottom(1);
                                table.Cell().Row((uint)j).Column((uint)i + 1).BorderBottom(1);
                            }
  

                        }

                        static IContainer CellStyle(IContainer container)
                        {
                            return container.BorderLeft(1).BorderRight(1).BorderColor(Colors.Black).PaddingVertical(2).PaddingLeft(3);
                        }
                    }
                });
            });

        }
    }
}
