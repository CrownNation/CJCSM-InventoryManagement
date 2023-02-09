using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoRoles
    {
        public Guid RolesId { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
    }
}
