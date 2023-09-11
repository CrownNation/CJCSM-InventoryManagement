using AutoMapper;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Mappings
{
    public class PipeProfile : Profile
    {
        public PipeProfile()
        {
            CreateMap<Pipe, DtoPipe>();
            CreateMap<DtoPipe, Pipe>();

            CreateMap<Pipe, DtoPipeCreate>();
            CreateMap<DtoPipeCreate, Pipe>();

            CreateMap<Pipe, DtoPipeUpdate>();

            // Ignore PipeId since it is passed as a parameter and we don't want to ever update the PipeId
            CreateMap<DtoPipeUpdate, Pipe>()
               .ForMember(dest => dest.PipeId, opt => opt.Ignore());
        }
    }
}
