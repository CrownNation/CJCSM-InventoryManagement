using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_DAL.Entities
{
    public class TallyPipe
    {
        [Key]
        public Guid TallyId { get; set; }
        [Key]
        public Guid PipeId { get; set; }

        //Navigation Properties
        public Tally Tally { get; set; }  
        public Pipe Pipe { get; set; } 
    }
}
