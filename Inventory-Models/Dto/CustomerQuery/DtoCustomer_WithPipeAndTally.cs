using Inventory_Dto.Dto;
using Inventory_Models.DTO.CustomerQuery;

namespace Inventory_Models.Dto
{
    public class DtoCustomer_WithPipeAndTally
    {

        public Guid CustomerId { get; set; }

        public DtoCustomer Customer { get; set; }

        public List<DtoTally> TallyList { get; set; }

        public List<DtoRack_WithTiers> RackList { get; set; }

    }
}
