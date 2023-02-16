using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory_Models.ViewModels
{
    public class UserVM
    {
        [Key]
        public Guid UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Email { get; set; }
        public int? PhoneNumber { get; set; }
        public int? CellPhoneNumber { get; set; }
        public bool IsActive { get; set; }

    }
}
