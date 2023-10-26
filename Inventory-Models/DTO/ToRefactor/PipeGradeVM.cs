using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.DTO.ToRefactor
{
    public class PipeGradeVM
    {
        [Key]
        public Guid PipeGradeId { get; set; }
        public string Name { get; set; }
    }
}
