using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
   public interface IPipePropertiesBL
   {
      Task<DtoPipePropertiesAll> GetAllPipeProperties();
   }
}
