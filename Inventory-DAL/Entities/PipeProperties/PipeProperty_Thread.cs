﻿using System.ComponentModel.DataAnnotations;

namespace Inventory_DAL.Entities.PipeProperties
{
    public class PipeProperty_Thread
    {
        [Key]
        public Guid PipeProperty_ThreadID { get; set; }
        [StringLength(15)]
        public string Name { get; set; } = String.Empty;


    }
}
