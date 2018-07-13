using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace MYM.Api.Models
{
    public class User
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public bool Confirmed { get; set; }
        public DateTime BirthDate { get; set; }
        public string Password { get; set; }

        public virtual List<Bill> Bills { get; set; }

        [NotMapped]
        public int Age { get { return GetAge(BirthDate); } }

        private int GetAge(DateTime birthdate)
        {
            var today = DateTime.Today;
            var age = today.Year - birthdate.Year;
            return age;
        }
        public User()
        {
            Bills = new List<Bill>();
        }
    }
}
