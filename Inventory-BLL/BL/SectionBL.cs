using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;

namespace Inventory_BLL.BL
{
    public class SectionBL : ISectionBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public SectionBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoSection> GetSections()
        {
            IQueryable<Section> entity = _context.Section.AsQueryable();
            IQueryable<DtoSection> sections = _mapper.ProjectTo<DtoSection>(entity);

            return sections;
        }

        public IQueryable<DtoSection>? GetSectionById(Guid guid)
        {
            IQueryable<Section>? section = _context.Section.Where(x => x.SectionId == guid);
            if (section.Any())
            {
                IQueryable<DtoSection> DtoSection = _mapper.ProjectTo<DtoSection>(section);
                return DtoSection;
            }

            throw new KeyNotFoundException($"No section with guid {guid} can be found.");
        }

        public async Task<DtoSection> CreateSection(DtoSectionCreate dtoSectionCreate)
        {
            if (dtoSectionCreate == null)
                throw new ArgumentNullException("Create Section failed. The section data is null.");

            Section section = _mapper.Map<Section>(dtoSectionCreate);
            section.SectionId = Guid.NewGuid();

            _context.Section.Add(section);
            await _context.SaveChangesAsync();

            return _mapper.Map<DtoSection>(section);
        }

        public void UpdateSection(DtoSectionUpdate dtoSectionUpdate, Guid guid)
        {
            Section? section = _context.Section.Find(guid);

            if (section == null)
                throw new KeyNotFoundException($"No section with guid {guid} can be found.");

            _mapper.Map<DtoSectionUpdate, Section>(dtoSectionUpdate, section);
            _context.SaveChanges();
        }

        public void DeleteSection(Guid guid)
        {
            Section? section = _context.Section.Find(guid);

            if (section == null)
                throw new KeyNotFoundException($"No section with guid {guid} can be found.");

            _context.Section.Remove(section);
            _context.SaveChanges();
        }
    }
}
