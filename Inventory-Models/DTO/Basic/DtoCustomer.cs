﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Dto.Dto
{
    public class DtoCustomer
    {
        [Key]
        public Guid CustomerId { get; set; }
        public string Name { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public string? ProvinceState { get; set; }
        public string? Country { get; set; }
        public string? PostalCode { get; set; }
        public string? Email { get; set; }
        public bool IsActive { get; set; }
        public DateTimeOffset DateOfCreation { get; set; }
        public DateTimeOffset DateOfLastUpdate { get; set; }
    }



}
