using Microsoft.AspNetCore.Mvc;
using MYM.Api.Context;
using MYM.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MYM.Api.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private SqlContext _ctx;
        public UserController(SqlContext ctx)
        {
            _ctx = ctx;
        }

        [Route("insert")]
        [HttpPost]
        public IActionResult Post([FromBody]User user)
        {
            try
            {
                user.BirthDate = DateTime.Now.AddYears(-20);
                if(string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Lastname))
                {
                    return BadRequest("Λάθος δεδομένα");
                }

                var result = _ctx.User.Add(user);
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
        public IActionResult GetAllFromCr()
        {
            try
            {
               
                var result = _ctx.User.ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Κάτι πήγε στραβά");
            }
        }
    }
}
