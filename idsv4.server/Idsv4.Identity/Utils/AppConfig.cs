using System.Collections.Generic;

namespace Idsv4.Identity.Utils {
    public class AppConfig {
        public AppConfig() {
            Identity = new IdentityConfig();
        }

        public string SiteTitle { get; set; }
        public string Version { get; set; }
        public string DefaultAppUrl { get; set; }
        public string CdnUrl { get; set; }

        public IdentityConfig Identity { get; }
    }

    public class IdentityConfig {
        public IdentityConfig() {
            JsClient = new JsClientConfig();
            User = new UserConfig();
        }

        public int SecurityFormValidityPeriodLinkDays { get; set; }
        public int AuthValidityPeriodLinkDays { get; set; }
        public int PasswordExpireDays { get; set; }
        public int PasswordPreExpireDays { get; set; }

        public JsClientConfig JsClient { get; }
        public UserConfig User { get; }
    }

    public class JsClientConfig {
        public string ClientId { get; set; }
        public IList<string> AllowedScopes { get; set; }
        public int AccessTokenLifetime { get; set; }
        public int IdentityTokenLifetime { get; set; }
        public string ClientUri { get; set; }
    }

    public class UserConfig {
        public string AllowedUserNameCharacters { get; set; }
    }
}