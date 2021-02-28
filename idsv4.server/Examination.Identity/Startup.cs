using System;
using Examination.Identity.Utils;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Serilog;
using System.IO;
using Examination.Identity.Models;

namespace Examination.Identity {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services) {
            Microsoft.IdentityModel.Logging.IdentityModelEventSource.ShowPII = true;

//            services.ConfigureApplicationCookie(options => {
//                options.Cookie.HttpOnly = true;
////                options.Cookie.SameSite = SameSiteMode.Strict;
////                options.Cookie.IsEssential = true;
//                options.ExpireTimeSpan = TimeSpan.FromDays(30);
//                options.SlidingExpiration = false;
//            });

            services.AddCors(options => {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
            services.AddOptions();
            services.Configure<AppConfig>(Configuration);

            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "wwwroot"; });

//            services.AddAntiforgery(options => { options.HeaderName = "X-XSRF-TOKEN"; });
//            services.AddSingleton<IAsyncAuthorizationFilter, AntiforgeryTokenAuthorizationFilter>();

            services.AddControllers(options => {
//                    options.Filters.Add<AntiforgeryTokenAuthorizationFilter>();
                })
                .SetCompatibilityVersion(CompatibilityVersion.Latest)
                .AddNewtonsoftJson(options => {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                });

            var connectionString = Configuration.GetConnectionString("DefaultConnection");

            //services.AddDbContext<ExaminationContext>(options =>
            //    options.UseSqlServer(connectionString)
            //);

            //services.AddIdentity<User, IdentityRole>(options => {
            //        options.Password.RequiredLength = 0;
            //        options.Password.RequiredUniqueChars = 0;
            //        options.Password.RequireLowercase = false;
            //        options.Password.RequireUppercase = false;
            //        options.Password.RequireDigit = false;
            //        options.Password.RequireNonAlphanumeric = false;
            //    })
            //    .AddEntityFrameworkStores<ExaminationContext>()
            //    .AddDefaultTokenProviders();

            services.AddIdentityServer(ctx => {
                        //ctx.UserInteraction.LoginUrl = "http://localhost:4201/sign-in";
                        //ctx.UserInteraction.LogoutUrl = "http://localhost:4201/sign-out";
                        //ctx.UserInteraction.ErrorUrl = "http://localhost:4201/error";
                        ctx.UserInteraction.LoginUrl = "/sign-in";
                        ctx.UserInteraction.LogoutUrl = "/sign-out";
                        ctx.UserInteraction.ErrorUrl = "/error";
                        ctx.UserInteraction.LoginReturnUrlParameter = "returnUrl";
                        ctx.Authentication.CookieLifetime = TimeSpan.FromDays(30);
                        ctx.Authentication.CookieSlidingExpiration = false;
                        ctx.Events.RaiseErrorEvents = true;
                        ctx.Events.RaiseFailureEvents = true;
                        ctx.Events.RaiseInformationEvents = true;
                        ctx.Events.RaiseSuccessEvents = true;
                    }
                )
                .AddInMemoryPersistedGrants()
                .AddDeveloperSigningCredential()
                .AddInMemoryCaching()
                .AddInMemoryApiResources(AuthConfig.GetApiResources())
                .AddInMemoryIdentityResources(AuthConfig.GetIdentityResources())
                .AddInMemoryClients(AuthConfig.GetClients(Configuration))
                .AddAspNetIdentity<User>();

            //services.Configure<SecurityStampValidatorOptions>(options => options.ValidationInterval = TimeSpan.FromMinutes(1));

//            services
//                .AddAuthentication()
//                .AddIdentityServerAuthentication(options => {
//                    options.RequireHttpsMetadata = false;
//                    options.ApiName = AuthConfig.ApiName;
//                    options.EnableCaching = true;
//                });

//            services.AddAuthorization();

            services.AddTransient<IReturnUrlParser, ReturnUrlParser>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory) {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Information()
                .Enrich.FromLogContext()
                .WriteTo.RollingFile(Path.Combine(env.ContentRootPath, "logger/log-{Date}.txt"))
                .CreateLogger();

            loggerFactory.AddSerilog();

            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }
            else {
                app.UseHsts();
                app.UseHttpsRedirection();
            }

            app.UseSpaStaticFiles();

            //app.UseAuthentication();

            app.UseIdentityServer();

            app.UseCors("CorsPolicy");

            app.UseRouting();

//            app.UseAuthorization();

            app.UseEndpoints(endpoints => endpoints.MapControllers());

            // Fix a problem with chrome. Chrome enabled a new feature "Cookies without SameSite must be secure", 
            // the coockies shold be expided from https, but in eShop, the internal comunicacion in aks and docker compose is http.
            // To avoid this problem, the policy of cookies shold be in Lax mode.
            // app.UseCookiePolicy(new CookiePolicyOptions { MinimumSameSitePolicy = AspNetCore.Http.SameSiteMode.Lax });

            app.UseSpa(spa => {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501
                spa.Options.SourcePath = "wwwroot";
                if (env.IsDevelopment()) {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4201");
                }
            });
        }
    }
}