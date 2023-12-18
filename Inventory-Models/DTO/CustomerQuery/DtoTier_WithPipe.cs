using Inventory_Dto.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.DTO.CustomerQuery
{
    public class DtoTier_WithPipe
    {
        public Guid TierId { get; set; }

        public int TierNumber { get; set; }

        public List<DtoPipe> PipeList { get; set; }

    }
}
