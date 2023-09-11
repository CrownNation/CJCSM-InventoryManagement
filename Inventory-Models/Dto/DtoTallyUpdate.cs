using CJCSM_Common;

namespace Inventory_Dto.Dto
{
    public class DtoTallyUpdate
    {
        public Guid ShopLocationId { get; set; }
        public ApplicationEnums.TallyTypes TallyType { get; set; }
        public string? Notes { get; set; }
    }
}
