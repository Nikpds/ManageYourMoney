using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MYM.Api.Context;
using MYM.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MYM.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private SqlContext _ctx;
        public CategoryController(SqlContext ctx)
        {
            _ctx = ctx;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest("Λανθασμένα Δεδομένα");
                }

                var original = _ctx.Categories.Find(id);

                return Ok(original);
            }
            catch (Exception ex)
            {
                return BadRequest("Σφάλμα εφαρμογής");
            }
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            try
            {
                var original = _ctx.Categories.ToList();

                return Ok(original);
            }
            catch (Exception ex)
            {
                return BadRequest("Σφάλμα εφαρμογής");
            }
        }

        [HttpPost("insert")]
        public IActionResult Insert([FromBody] Category cat)
        {
            try
            {
                _ctx.Categories.Add(cat);
                _ctx.SaveChanges();
                return Ok(cat);
            }
            catch (Exception ex)
            {
                return BadRequest("Σφάλμα εφαρμογής");
            }
        }

        [HttpPut("update")]
        public IActionResult Update([FromBody] Category cat)
        {
            try
            {
                _ctx.Categories.Update(cat);
                _ctx.SaveChanges();
                return Ok(cat);
            }
            catch (Exception ex)
            {
                return BadRequest("Σφάλμα εφαρμογής");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest("Λανθασμένα Δεδομένα");
                }
                var original = _ctx.Categories.Find(id);

                if (original == null)
                {
                    return BadRequest("Λανθασμένα Δεδομένα");
                }

                _ctx.Categories.Remove(original);
                _ctx.SaveChanges();

                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest("Σφάλμα εφαρμογής");
            }
        }
    }
}
