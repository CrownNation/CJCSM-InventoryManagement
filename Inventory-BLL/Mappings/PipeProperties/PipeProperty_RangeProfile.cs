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
    public class PipeProperty_RangeProfile : Profile
    {
        public PipeProperty_RangeProfile()
        {
            CreateMap<DtoPipeProperty_Range, PipeProperty_Range>().ReverseMap();

            CreateMap<DtoPipeProperty_RangeUpdate, PipeProperty_Range>()
                .ForMember(dest => dest.PipeProperty_RangeId, opt => opt.Ignore());

        }

    }
}
