using IdentityServer4.EntityFramework.DbContexts;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Examination.Identity.Core
{
    public class DatabaseInitializer
    {
        public static void Initialize(IApplicationBuilder app, IdentityContext context)
        {
            context.Database.EnsureCreated();

            InitializeTokenServerConfigurationDatabase(app);

            context.SaveChanges();
        }

        private static void InitializeTokenServerConfigurationDatabase(IApplicationBuilder app)
        {
            //using (var scope = app.ApplicationServices.GetService<IServiceScopeFactory>()
            //       .CreateScope())
            //{
            //    scope.ServiceProvider.GetRequiredService<PersistedGrantDbContext>()
            //        .Database.Migrate();

            //    var context = scope.ServiceProvider
            //        .GetRequiredService<ConfigurationDbContext>();
            //    context.Database.Migrate();
            //    if (!context.Clients.Any())
            //    {
            //        foreach (var client in Config.GetClients())
            //        {
            //            context.Clients.Add(client.ToEntity());
            //        }
            //        context.SaveChanges();
            //    }

            //    if (!context.IdentityResources.Any())
            //    {
            //        //foreach (var resource in Config.GetIdentityResources())
            //        //{
            //        //    context.IdentityResources.Add(resource.ToEntity());
            //        //}
            //        context.SaveChanges();
            //    }

            //    if (!context.ApiResources.Any())
            //    {
            //        //foreach (var resource in Config.GetApiResources())
            //        //{
            //        //    context.ApiResources.Add(resource.ToEntity());
            //        //}
            //        context.SaveChanges();
            //    }
            //}
        }
    }
}
