﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.DTO
{
    public class DtoShopLocationCreateAndUpdate
    {
        public string Name { get; set; } = string.Empty;

        public string? Address1 { get; set; }

        public string? Address2 { get; set; }

        public string? City { get; set; }

        public string? ProvinceState { get; set; }

        public string? PostalCode { get; set; }
        public string? Country { get; set; }

        public string? PhoneNumber { get; set; }

        public string? FaxNumber { get; set; }

        public bool IsActive { get; set; }
    }
}
