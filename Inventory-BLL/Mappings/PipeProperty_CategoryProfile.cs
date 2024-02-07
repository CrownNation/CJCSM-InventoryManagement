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
    public class PipeProperty_CategoryProfile : Profile
    {
        public PipeProperty_CategoryProfile()
        {
            CreateMap<DtoPipeProperty_CategoryUpdate, PipeProperty_Category>();
            CreateMap<PipeProperty_Category, DtoPipeProperty_CategoryUpdate>();

        }

    }
}
