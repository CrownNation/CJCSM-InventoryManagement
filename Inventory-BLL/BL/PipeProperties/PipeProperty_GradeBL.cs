using AutoMapper;
using Inventory_BLL.Interfaces;
using Inventory_DAL.Entities;
using Inventory_DAL.Entities.PipeProperties;
using Inventory_Dto.Dto;
using System;
using System.Linq;

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
            var entities = _context.PipeProperty_Grade.OrderBy(g=>g.Name);
            return _mapper.ProjectTo<DtoPipeProperty_Grade>(entities.AsQueryable());
        }

        public DtoPipeProperty_Grade GetGradeById(Guid id)
        {
            var entity = _context.PipeProperty_Grade.FirstOrDefault(e => e.PipeProperty_GradeId == id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No grade with ID {id} can be found.");
            }
            return _mapper.Map<DtoPipeProperty_Grade>(entity);
        }

        public DtoPipeProperty_Grade CreateGrade(DtoPipeProperty_Grade grade)
        {
            var entity = _mapper.Map<PipeProperty_Grade>(grade);
            entity.PipeProperty_GradeId = Guid.NewGuid();
            _context.PipeProperty_Grade.Add(entity);
            _context.SaveChanges();
            return _mapper.Map<DtoPipeProperty_Grade>(entity);
        }

        public void UpdateGrade(DtoPipeProperty_GradeUpdate grade, Guid id)
        {
            var entity = _context.PipeProperty_Grade.FirstOrDefault(e => e.PipeProperty_GradeId == id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No grade with ID {id} can be found.");
            }
            _mapper.Map(grade, entity);
            _context.SaveChanges();
        }

        public void DeactivateGrade(Guid id)
        {
            var entity = _context.PipeProperty_Grade.FirstOrDefault(e => e.PipeProperty_GradeId == id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"No grade with ID {id} can be found.");
            }
            entity.IsActive = false;
            _context.SaveChanges();
        }
    }
}
