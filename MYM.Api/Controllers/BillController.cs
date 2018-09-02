using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MYM.Api.Context;
using MYM.Api.Models;
using MYM.Api.Services;
using System;
using System.Collections.Generic;
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
                var category = _ctx.Categories.Find(bill.CategoryId);

                if (category == null)
                {
                    return BadRequest("Δεν βρέθηκε η κατηγορία");
                }

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
                original.Comment = bill.Comment;
                original.CategoryId = bill.CategoryId;

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
                var original = _ctx.Bills.Include(i => i.Category).FirstOrDefault(x => x.Id == id && x.UserId == userId);

                return Ok(original);
            }
            catch (Exception ex)
            {
                return BadRequest("Σφάλμα εφαρμογής");
            }
        }

        [HttpPost("bills")]
        public IActionResult GetMonthHistory([FromBody] UserRequest req)
        {
            try
            {
                if (req.RequestDate == null)
                {
                    return BadRequest("Λανθασμένα Δεδομένα");
                }
                var userId = User.GetUserId();
                var result = _ctx.Bills.Include(i => i.Category).Where(x => x.PaidDate.Month == req.RequestDate.Month && x.UserId == userId).OrderByDescending(x => x.PaidDate).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Σφάλμα εφαρμογής");
            }
        }

        [HttpPost("pie/chart")]
        public IActionResult GetPieHistory([FromBody] UserRequest req)
        {
            try
            {
                var pie = Tuple.Create(new List<string>(), new List<double>());
                if (req.RequestDate == null)
                {
                    return BadRequest("Λανθασμένα Δεδομένα");
                }
                var userId = User.GetUserId();
                var categories = _ctx.Categories.Where(x => x.UserId == userId).ToList();
                var result = _ctx.Bills.Include(i => i.Category).Where(x => x.PaidDate.Month == req.RequestDate.Month && x.UserId == userId).OrderByDescending(x => x.PaidDate).ToList();
                for (var i = 0; i < categories.Count; i++)
                {
                    var piece = new PieChart();
                    piece.Category = categories[i].Description;
                    var total = result.Where(x => x.Category.Description == categories[i].Description).Select(x => x.Amount);
                    piece.Total = total.Sum(x => x);
                    pie.Item1.Add(piece.Category);
                    pie.Item2.Add(Math.Round(piece.Total, 2));
                }


                return Ok(pie);
            }
            catch (Exception ex)
            {
                return BadRequest("Σφάλμα εφαρμογής");
            }
        }
    }
}
