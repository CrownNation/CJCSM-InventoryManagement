using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory_BLL.BL
{
    public class PipeProperty_GradeBL : IPipeProperty_GradeBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public PipeProperty_GradeBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoPipeProperty_Grade> GetGrades()
        {
            var entities = _context.PipeProperty_Grade.OrderBy(c => c.Name);
            return _mapper.ProjectTo<DtoPipeProperty_Grade>(entities.AsQueryable());
        }

        public async Task<DtoPipeProperty_Grade> GetGradeById(Guid id)
        {
            var entity = await _context.PipeProperty_Grade.FirstOrDefaultAsync(e => e.PipeProperty_GradeId == id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No grade with ID {id} can be found.");
            }
            return _mapper.Map<DtoPipeProperty_Grade>(entity);
        }

        public async Task<DtoPipeProperty_Grade> CreateGrade(DtoPipeProperty_Grade grade)
        {
            var entity = _mapper.Map<PipeProperty_Grade>(grade);
            entity.PipeProperty_GradeId = Guid.NewGuid();
            await _context.PipeProperty_Grade.AddAsync(entity);
            await _context.SaveChangesAsync();
            return _mapper.Map<DtoPipeProperty_Grade>(entity);
        }

        public async Task UpdateGrade(DtoPipeProperty_GradeUpdate grade, Guid id)
        {
            var entity = await _context.PipeProperty_Grade.FirstOrDefaultAsync(e => e.PipeProperty_GradeId == id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No grade with ID {id} can be found.");
            }
            _mapper.Map(grade, entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeactivateGrade(Guid id)
        {
            var entity = await _context.PipeProperty_Grade.FirstOrDefaultAsync(e => e.PipeProperty_GradeId == id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No grade with ID {id} can be found.");
            }
            entity.IsActive = false;
            await _context.SaveChangesAsync();
        }
    }
}
