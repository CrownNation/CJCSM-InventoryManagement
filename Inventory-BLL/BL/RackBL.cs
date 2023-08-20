using Inventory_BLL.Interfaces;
using Inventory_Dto.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_BLL.BL
{
   public class RackBL : IRackBL
   {
      public Task<RackDto> CreateRack(DtoRackCreate rack)
      {
         throw new NotImplementedException();
      }

      public void DeleteRack(Guid guid)
      {
         throw new NotImplementedException();
      }

      public IQueryable<RackDto>? GetRackById(Guid guid)
      {
         throw new NotImplementedException();
      }

      public IQueryable<RackDto> GetRacks()
      {
         throw new NotImplementedException();
      }

      public void UpdateRack(DtoRackUpdate rack, Guid guid)
      {
         throw new NotImplementedException();
      }
   }
}
