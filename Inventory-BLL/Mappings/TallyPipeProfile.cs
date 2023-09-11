using AutoMapper;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Mappings
{
    public class TallyPipeProfile : Profile
    {
        public TallyPipeProfile()
        {
            CreateMap<TallyPipe, DtoTallyPipe>();
            CreateMap<DtoTallyPipe, TallyPipe>();
        }
    }
}
