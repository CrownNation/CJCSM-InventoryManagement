using AutoMapper;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_BLL.Mappings
{
    public class PipeProperty_WallProfile : Profile
    {
        public PipeProperty_WallProfile()
        {
            CreateMap<DtoPipeProperty_Wall, PipeProperty_Wall>().ReverseMap();
            CreateMap<DtoPipeProperty_WallUpdate, PipeProperty_Wall>()
                .ForMember(dest => dest.PipeProperty_WallId, opt => opt.Ignore());

        }

    }
}
