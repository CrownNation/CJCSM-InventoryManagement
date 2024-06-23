using Inventory_Dto.Dto;
using Inventory_Models.DTO.PipeProperties;
using System.Threading.Tasks;

namespace Inventory_BLL.Interfaces
{
   public interface IPipePropertiesBL
   {
      Task<DtoPipePropertiesAll> GetAllPipeProperties();
   }
}
