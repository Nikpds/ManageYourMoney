﻿using Microsoft.AspNetCore.Authorization;
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
        [HttpGet]
        public IActionResult GetInfo()
        {
            var userId = User.GetUserId();
            UserInfo info = new UserInfo();
            var d = DateTime.UtcNow;
            var bills = _ctx.Bills.Where(w => w.PaidDate.Month == d.Month && w.PaidDate.Year == d.Year && w.UserId == userId);
            info.Total = bills.Sum(x => x.Amount);
            info.TotalBills = bills.Count();
            return Ok(info);
        }

        [AllowAnonymous]
        [Route("insert")]
        [HttpGet]
        public IActionResult NewUser()
        {
            User user = new User();
            user.Name = "Νίκος";
            user.Lastname = "Περπερίδης";
            user.Email = "perpegr@hotmail.com";
            user.Password = AuthManager.HashPassword("123");
            user.BirthDate = DateTime.Parse("04-06-1986");
            user.Confirmed = true;
            _ctx.Users.Add(user);
            _ctx.SaveChanges();

            return Ok("ok");
        }

    }
}
