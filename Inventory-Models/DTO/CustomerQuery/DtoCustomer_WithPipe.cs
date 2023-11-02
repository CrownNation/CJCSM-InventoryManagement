using Inventory_Dto.Dto;
using Inventory_Models.DTO.CustomerQuery;

namespace Inventory_Models.Dto
{
    public class DtoCustomer_WithPipe
    {

        public Guid CustomerId { get; set; }

        public DtoCustomer Customer { get; set; }

        public List<DtoPipe> PipeList { get; set; }

    }
}
