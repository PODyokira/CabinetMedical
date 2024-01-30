using System;
using System.Collections.Generic;

#nullable disable

namespace CabinetMedical.Models
{
    public partial class Historique
    {
        public int HcId { get; set; }
        public int? RdvId { get; set; }
        public string Descr { get; set; }
    }
}
