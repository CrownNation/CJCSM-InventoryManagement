using CJCSM_Common;

namespace Inventory_Dto.Dto
{
    public class DtoTallyUpdate
    {
        public Guid ShopLocationId { get; set; }
        public int TallyType { get; set; }
        public string? Notes { get; set; }
    }
}
