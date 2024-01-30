using System;
using System.Collections.Generic;

#nullable disable

namespace CabinetMedical.Models
{
    public partial class Patient
    {
        public int PatId { get; set; }
        public string Nom { get; set; }
        public string History { get; set; }
        public string Adress { get; set; }
    }
}
