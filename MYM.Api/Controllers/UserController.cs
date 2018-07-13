using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MYM.Api.Context;
using MYM.Api.Models;
using MYM.Api.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MYM.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private SqlContext _ctx;

        public UserController(SqlContext ctx)
        {
            _ctx = ctx;
        }

        [Route("")]
        [HttpPost]
        public IActionResult Post([FromBody]User user)
        {
            try
            {
                if (!user.IsValid())
                {
                    return BadRequest("Λάθος δεδομένα");
                }

                var result = _ctx.Users.Add(user);
                _ctx.SaveChanges();
                return Ok(result.Entity);
            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }
        }

        [Route("all")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var result = _ctx.Users.ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }
        }

        [Route("info")]
        public IActionResult GetInfo()
        {
            UserInfo info = new UserInfo();
            var d = DateTime.UtcNow;
            var bills = _ctx.Bills.Where(w => w.Date.Month == d.Month && w.Date.Year == d.Year);
            info.Total = bills.Sum(x => x.Amount);
            info.TotalBills = bills.Count();
            return Ok(info);
        }

    }
}
