using AutoMapper;
using System;
using System.Linq;
using System.Threading.Tasks;
using Inventory_DAL.Entities;
using Inventory_Dto.Dto;
using Microsoft.EntityFrameworkCore;
using Inventory_BLL.Interfaces;

namespace Inventory_BLL.BL
{
    public class PipeDefinitionBL : IPipeDefinitionBL
    {
        private readonly InventoryContext _context;
        private readonly IMapper _mapper;

        public PipeDefinitionBL(InventoryContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IQueryable<DtoPipeDefinition> GetPipeDefinitions()
        {
            IQueryable<PipeDefinition> entity = _context.PipeDefinition.AsQueryable();
            IQueryable<DtoPipeDefinition> pipeDefinitions = _mapper.ProjectTo<DtoPipeDefinition>(entity);

            return pipeDefinitions;
        }



        public IQueryable<DtoPipeDefinition>? GetPipeDefinitionById(Guid id)
        {
            IQueryable<PipeDefinition>? pipeDefinition = _context.PipeDefinition.Where(x => x.PipeDefinitionId == id);
            if (pipeDefinition.Any())
            {
                IQueryable<DtoPipeDefinition> dtoPipeDefinition = _mapper.ProjectTo<DtoPipeDefinition>(pipeDefinition);
                return dtoPipeDefinition;
            }

            throw new KeyNotFoundException($"No PipeDefinition with ID {id} can be found.");
        }

        public async Task<DtoPipeDefinition> CreatePipeDefinition(DtoPipeDefinitionCreate dtoPipeDefinitionCreate)
        {
            if (dtoPipeDefinitionCreate == null)
                throw new ArgumentNullException("Create PipeDefinition failed. The PipeDefinition data is null.");

            PipeDefinition pipeDefinition = _mapper.Map<PipeDefinition>(dtoPipeDefinitionCreate);

            pipeDefinition.PipeDefinitionId = Guid.NewGuid();
            _context.PipeDefinition.Add(pipeDefinition);
            await _context.SaveChangesAsync();

            return _mapper.Map<DtoPipeDefinition>(pipeDefinition);
        }

        public void UpdatePipeDefinition(DtoPipeDefinitionUpdate dtoPipeDefinitionUpdate, Guid id)
        {
            PipeDefinition? pipeDefinition = _context.PipeDefinition.Find(id);

            if (pipeDefinition == null)
                throw new KeyNotFoundException($"No PipeDefinition with ID {id} can be found.");

            _mapper.Map<DtoPipeDefinitionUpdate, PipeDefinition>(dtoPipeDefinitionUpdate, pipeDefinition);
            _context.SaveChanges();
        }

        public void DisablePipeDefinition(Guid id)
        {
            PipeDefinition? pipeDefinition = _context.PipeDefinition.Find(id);

            if (pipeDefinition == null)
                throw new KeyNotFoundException($"No PipeDefinition with ID {id} can be found.");

            pipeDefinition.IsActive = false;
            _context.SaveChanges();
        }


    }
}
