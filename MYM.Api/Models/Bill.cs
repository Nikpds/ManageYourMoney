using System;

namespace MYM.Api.Models
{
    public class Bill
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public DateTime PaidDate { get; set; }
        public string Comment { get; set; }
        public double Amount { get; set; }

        public int CatId { get; set; }
        public string Category { get; set; }
    }
}
