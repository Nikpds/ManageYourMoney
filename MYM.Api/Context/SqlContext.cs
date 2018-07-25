using Microsoft.EntityFrameworkCore;
using MYM.Api.Models;

namespace MYM.Api.Context
{
    public class SqlContext : DbContext
    {
        public SqlContext(DbContextOptions<SqlContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            #region User
            var userBuilder = modelBuilder.Entity<User>();
            userBuilder.HasKey(h => h.Id);
            userBuilder.Property(p => p.Email).IsRequired();
            userBuilder.Property(p => p.Lastname).IsRequired();
            userBuilder.Property(p => p.Name).IsRequired();
            userBuilder.HasMany(i => i.Bills)
                       .WithOne(u => u.User)
                       .HasForeignKey(f => f.UserId);

            #endregion

            #region Bill
            var billBuilder = modelBuilder.Entity<Bill>();
            billBuilder.HasKey(h => h.Id);
            billBuilder.Property(p => p.UserId).IsRequired();
            billBuilder.Property(p => p.Amount).IsRequired();
            billBuilder.Property(p => p.PaidDate).IsRequired();
            #endregion

        }
    }
}
