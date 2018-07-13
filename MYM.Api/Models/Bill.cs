using System;

namespace MYM.Api.Models
{
    public class Bill
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public DateTime Date { get; set; }
        public string Comment { get; set; }
        public int Amount { get; set; }
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
    }
}
