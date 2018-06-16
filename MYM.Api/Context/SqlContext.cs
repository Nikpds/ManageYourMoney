using Microsoft.EntityFrameworkCore;
using MYM.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MYM.Api.Context
{
    public class SqlContext : DbContext
    {
        public SqlContext(DbContextOptions<SqlContext> options) : base(options) { }

        public DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            #region User
            var userBuilder = modelBuilder.Entity<User>();
            userBuilder.HasKey(h => h.Id);
            userBuilder.Property(p => p.Email).IsRequired();
            userBuilder.Property(p => p.Lastname).IsRequired();
            userBuilder.Property(p => p.Name).IsRequired();
            #endregion
            
        }
    }
}
