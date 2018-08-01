using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MYM.Api.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace MYM.Api.Services
{
    public interface IAuthenticationProvider
    {
        JwtSecurityToken CreateToken(User user);
    }

    public class AuthenticationProvider : IAuthenticationProvider
    {
        public readonly IConfiguration config;

        public AuthenticationProvider(IConfiguration _config)
        {
            config = _config;
        }

        public JwtSecurityToken CreateToken(User user)
        {
            var claims = new List<Claim>();

            claims.Add(new Claim("Id", user.Id));
            claims.Add(new Claim("Name", user.Name));
            claims.Add(new Claim("Lastname", user.Lastname));
            claims.Add(new Claim("Role", user.Role.ToString()));
            claims.Add(new Claim("Email", user.Email));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Tokens:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
              config["Tokens:Issuer"],
              config["Tokens:Issuer"],
              claims,
              expires: DateTime.UtcNow.AddMinutes(780),
              signingCredentials: creds);

            return token;
        }

    }

    public static class AuthMethods
    {
        public static string GetUserId(this ClaimsPrincipal user)
        {
            var isValid = user.HasClaim(x => x.Type == "Id");
            if (isValid)
            {
                return user.Claims.First(x => x.Type == "Id").Value;
            }
            else
            {
                throw new Exception("User account is not valid");
            }
        }
    }
}

