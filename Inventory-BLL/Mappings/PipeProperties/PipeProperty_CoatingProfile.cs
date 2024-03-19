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
    public class PipeProperty_CoatingProfile : Profile
    {
        public PipeProperty_CoatingProfile()
        {
            CreateMap<DtoPipeProperty_Coating, PipeProperty_Coating>().ReverseMap();

            CreateMap<DtoPipeProperty_CoatingUpdate, PipeProperty_Coating>()
                .ForMember(dest => dest.PipeProperty_CoatingId, opt => opt.Ignore());

        }
    }
}
