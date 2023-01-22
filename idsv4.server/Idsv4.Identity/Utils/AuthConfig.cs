using IdentityModel;
using IdentityServer4.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace Idsv4.Identity.Utils
{
    public class AuthConfig
    {
        public static string ApiName { get; set; } = "Idsv4_api";

        public static IList<ApiResource> GetApiResources()
        {
            return new List<ApiResource> {
                new ApiResource(ApiName, "Idsv4 API")
            };
        }

        public static IList<IdentityResource> GetIdentityResources()
        {
            var roleResource = new IdentityResource
            {
                Name = JwtClaimTypes.Role,
                Emphasize = true,
                UserClaims = new List<string> { JwtClaimTypes.Role }
            };

            return new List<IdentityResource> {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                roleResource,
            };
        }

        public static IList<Client> GetClients(IConfiguration configuration)
        {
            if (configuration == null)
            {
                throw new ArgumentNullException(nameof(configuration));
            }

            var jsClient = new Client();

            configuration.Bind("Identity:JsClient", jsClient);
            jsClient.RefreshTokenExpiration = TokenExpiration.Sliding;
            jsClient.RefreshTokenUsage = TokenUsage.OneTimeOnly;
            jsClient.AuthorizationCodeLifetime = 900;
            jsClient.UpdateAccessTokenClaimsOnRefresh = true;
            return new List<Client> { jsClient };
        }
    }
}