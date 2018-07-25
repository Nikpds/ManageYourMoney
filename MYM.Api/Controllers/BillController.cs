﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MYM.Api.Context;
using MYM.Api.Models;
using MYM.Api.Services;
using System;
using System.Linq;

namespace MYM.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class BillController : Controller
    {
        private SqlContext _ctx;
        public BillController(SqlContext ctx)
        {
            _ctx = ctx;
        }

        [HttpPost("")]
        public IActionResult Insert([FromBody] Bill bill)
        {
            try
            {
                bill.PaidDate = DateTime.UtcNow;
                bill.UserId = User.GetUserId();
                var category = _ctx.Categories.Find(bill.CatId);

                if (category == null)
                {
                    return BadRequest("Δεν βρέθηκε η κατηγορία");
                }

                bill.Category = category.Description;
                if (!bill.IsValid())
                {
                    return BadRequest("Λανθασμένα Δεδομένα");
                }

                var result = _ctx.Bills.Add(bill);
                _ctx.SaveChanges();

                return Ok(result.Entity);
            }
            catch (Exception ex)
            {
                return BadRequest("Σφάλμα εφαρμογής");
            }
        }

        [HttpPut("")]
        public IActionResult Update([FromBody] Bill bill)
        {
            try
            {
                var original = _ctx.Bills.Find(bill.Id);
                if (!bill.IsValid())
                {
                    return BadRequest("Λανθασμένα Δεδομένα");
                }
                original.Amount = bill.Amount;
                //original.CategoryId = bill.CategoryId;

                var result = _ctx.Bills.Update(original);
                _ctx.SaveChanges();

                return Ok(result.Entity);
            }
            catch (Exception ex)
            {
                return BadRequest("Σφάλμα εφαρμογής");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                if (string.IsNullOrEmpty(id))
                {
                    return BadRequest("Λανθασμένα Δεδομένα");
                }

                var original = _ctx.Bills.Find(id);

                var result = _ctx.Bills.Remove(original);
                _ctx.SaveChanges();

                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest("Σφάλμα εφαρμογής");
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            try
            {
                if (string.IsNullOrEmpty(id))
                {
                    return BadRequest("Λανθασμένα Δεδομένα");
                }
                var userId = User.GetUserId();
                var original = _ctx.Bills.Where(x => x.Id == id && x.UserId == userId);

                return Ok(original);
            }
            catch (Exception ex)
            {
                return BadRequest("Σφάλμα εφαρμογής");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetMonthHistory([FromBody] UserRequest req)
        {
            try
            {
                if (req.RequestDate == null)
                {
                    return BadRequest("Λανθασμένα Δεδομένα");
                }
                var userId = User.GetUserId();
                var result = _ctx.Bills.Where(x => x.PaidDate > req.RequestDate && x.UserId == userId).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Σφάλμα εφαρμογής");
            }
        }
    }
}
