using MYM.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MYM.Api.Services
{
    public static class Validators
    {
        public static bool IsValid(this Bill bill)
        {
            return bill.Amount > 0
                && !string.IsNullOrEmpty(bill.UserId)
                && bill.PaidDate != null;
        }

        public static bool IsValid(this User user)
        {
            return !string.IsNullOrEmpty(user.Email) &&
                !string.IsNullOrEmpty(user.Name) &&
                !string.IsNullOrEmpty(user.Lastname);
        }
    }
}
