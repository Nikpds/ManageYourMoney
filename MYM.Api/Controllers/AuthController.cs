using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MYM.Api.Context;
using MYM.Api.Models;
using MYM.Api.Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace MYM.Api.Controllers
{
    [AllowAnonymous]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private SqlContext _ctx;
        private readonly IAuthenticationProvider _auth;
        public AuthController(SqlContext ctx, IAuthenticationProvider auth)
        {
            _auth = auth;
            _ctx = ctx;
        }

        [HttpPost("token")]
        public IActionResult Token([FromBody] LoginModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = _ctx.Users.FirstOrDefault(x => x.Email == model.Username);
                    if (user != null)
                    {
                        if (AuthManager.VerifyHashedPassword(user.Password, model.Password))
                        {
                            var userToken = _auth.CreateToken(user);
                            return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(userToken) });
                        }
                        else
                        {
                            return BadRequest("Λάθος όνομα χρήστη ή κωδικός");
                        }
                    }
                    else
                    {
                        return BadRequest("Λάθος όνομα χρήστη ή κωδικός");
                    }
                }
                else
                {
                    return BadRequest("Λάθος όνομα χρήστη ή κωδικός");
                }

            }
            catch (Exception exc)
            {
                return BadRequest("Σφάλμα στην επιβεβαίωση στοιχείων");
            }
        }
    }
}
