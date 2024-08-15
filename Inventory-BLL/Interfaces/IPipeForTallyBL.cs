using Inventory_Dto.Dto;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory_BLL.Interfaces
{
   public interface IPipeForTallyBL
   {
      IQueryable<DtoPipeForTally> GetPipesForTally();
      IQueryable<DtoPipeForTally>? GetPipeForTallyByTallyId(Guid tallyId);
      Task<DtoPipeForTally> CreatePipeForTally(DtoPipeForTallyCreate dtoPipeForTallyCreate);
      void DeletePipeForTally(Guid guid);
      Task<IQueryable<DtoPipeForTally>> GetPipeForTallyWithDefinitionListByTallyId(Guid tallyId);
   }
}
