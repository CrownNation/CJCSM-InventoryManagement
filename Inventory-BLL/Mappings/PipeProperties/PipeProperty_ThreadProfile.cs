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
    public class PipeProperty_ThreadProfile : Profile
    {
        public PipeProperty_ThreadProfile()
        {
            CreateMap<DtoPipeProperty_Thread, PipeProperty_Thread>().ReverseMap();

            CreateMap<DtoPipeProperty_ThreadUpdate, PipeProperty_Thread>()
                .ForMember(dest => dest.PipeProperty_ThreadId, opt => opt.Ignore());

        }

    }
}
