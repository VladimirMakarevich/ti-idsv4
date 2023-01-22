using Idsv4.Identity.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Idsv4.Identity.Controllers
{
    [Route("api/config")]
    [ApiController]
    [AllowAnonymous]
    public class ConfigController : ControllerBase
    {
        // TODO: MW: move to constants
        private const string LoginCallback = "auth/oidc/sign-in-callback";
        private const string LogoutCallback = "auth/oidc/sign-out-callback";

        private AppConfig AppConfig { get; }

        public ConfigController(
            IOptions<AppConfig> appConfig
        )
        {
            AppConfig = appConfig.Value;
        }

        [HttpGet]
        public ActionResult SpaConfig()
        {
            var auth = new AuthConfigModel
            {
                Authority = UriHelper.BuildAbsolute(Request.Scheme, Request.Host),
                ClientId = AppConfig.Identity.JsClient.ClientId,
                RedirectUri = AppConfig.Identity.JsClient.ClientUri + LoginCallback,
                PostLogoutRedirectUri = AppConfig.Identity.JsClient.ClientUri + LogoutCallback,
                ResponseType = "code",
            };

            if (AppConfig.Identity.JsClient.AllowedScopes != null)
            {
                auth.Scope = string.Join(" ", AppConfig.Identity.JsClient.AllowedScopes);
            }

            var config = new ConfigModel(auth);

            return Ok(config);
        }

        [HttpGet("application")]
        public ActionResult ApplicationConfig()
        {
            return Ok(new
            {
                cdnUrl = AppConfig.CdnUrl,
                defaultAppUrl = AppConfig.DefaultAppUrl,
                siteTitle = AppConfig.SiteTitle,
                version = AppConfig.Version
            });
        }
    }
}