using Inventory_Dto.Dto;

namespace Inventory_BLL.Interfaces
{
    public interface IPipeProperty_WeightBL
    {
        IQueryable<DtoPipeProperty_Weight> GetWeights();
        Task<DtoPipeProperty_Weight> GetWeightById(Guid id);
        Task<DtoPipeProperty_Weight> CreateWeight(DtoPipeProperty_Weight weight);
        Task UpdateWeight(DtoPipeProperty_WeightUpdate weight, Guid id);
        Task DeactivateWeight(Guid id);
    }
}
