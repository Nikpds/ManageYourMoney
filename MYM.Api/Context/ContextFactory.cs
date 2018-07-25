using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MYM.Api.Context
{
    //public class ContextFactory : IDesignTimeDbContextFactory<SqlContext>
    //{


    //    public SqlContext CreateDbContext(string[] args)
    //    {
    //        string path = Directory.GetCurrentDirectory().Replace("MYM.Api.Context", "MYM.Api");
    //        IConfigurationRoot configuration = new ConfigurationBuilder()
    //         .SetBasePath(@path)
    //         .AddJsonFile("appsettings.json")
    //         .Build();
    //        var optionsBuilder = new DbContextOptionsBuilder<SqlContext>();
    //        optionsBuilder.UseSqlServer(configuration["ConnectionStrings:DefaultConnection"]);

    //        return new SqlContext(optionsBuilder.Options);
    //    }
    //}
}
