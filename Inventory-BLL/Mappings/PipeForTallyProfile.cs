using AutoMapper;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Mappings
{
   public class PipeForTallyProfile : Profile
   {
      public PipeForTallyProfile()
      {
         CreateMap<PipeForTally, DtoPipeForTally>();
         CreateMap<DtoPipeForTally, PipeForTally>();

         CreateMap<PipeForTally, DtoPipeForTallyCreate>();
         CreateMap<DtoPipeForTallyCreate, PipeForTally>();

         CreateMap<PipeDefinition, DtoPipeDefinition>();
      }
   }
}
