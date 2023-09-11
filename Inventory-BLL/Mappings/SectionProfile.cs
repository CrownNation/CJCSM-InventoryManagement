using AutoMapper;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

namespace Inventory_BLL.Mappings
{
    public class SectionProfile : Profile
    {
        public SectionProfile()
        {
            CreateMap<Section, DtoSection>();
            CreateMap<DtoSection, Section>();

            CreateMap<Section, DtoSectionCreate>();
            CreateMap<DtoSectionCreate, Section>();

            CreateMap<Section, DtoSectionUpdate>();

            // Ignore SectionId since it is passed as a parameter and we don't want to ever update the SectionId
            CreateMap<DtoSectionUpdate, Section>()
               .ForMember(dest => dest.SectionId, opt => opt.Ignore());
        }
    }
}
