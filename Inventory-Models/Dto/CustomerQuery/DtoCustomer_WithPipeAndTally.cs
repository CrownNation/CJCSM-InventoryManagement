using Inventory_Dto.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.Dto
{
    public class DtoCustomer_WithPipeAndTally
    {

        List<DtoTally> TallyList { get; set; } = new List<DtoTally>();

    }
}
