using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface ITallyPipeBL
    {
        IQueryable<DtoTallyPipe> GetTallyPipes();

        IQueryable<DtoTallyPipe>? GetTallyPipeByCompositeKey(Guid tallyId, Guid pipeId);

        Task<DtoTallyPipe> CreateTallyPipe(DtoTallyPipe dtoTallyPipe);

        void UpdateTallyPipe(DtoTallyPipe dtoTallyPipe, Guid tallyId, Guid pipeId);

        void DeleteTallyPipe(Guid tallyId, Guid pipeId);
    }
}
