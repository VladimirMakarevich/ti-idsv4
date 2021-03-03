using System.Runtime.Serialization;

namespace Idsv4.Identity.Utils {
    [DataContract]
    public class ConfigModel {
        public ConfigModel() : this(null) {
        }

        public ConfigModel(AuthConfigModel auth) {
            Auth = auth ?? new AuthConfigModel();
        }

        [DataMember(Name = "apiUrl")] public string ApiUrl { get; set; } = "/api";

        [DataMember(Name = "auth")] public AuthConfigModel Auth { get; }
    }

    [DataContract]
    public class AuthConfigModel {
        [DataMember(Name = "authority")] public string Authority { get; set; }

        [DataMember(Name = "client_id")] public string ClientId { get; set; }

        [DataMember(Name = "redirect_uri")] public string RedirectUri { get; set; }

        [DataMember(Name = "response_type")] public string ResponseType { get; set; }

        [DataMember(Name = "scope")] public string Scope { get; set; }

        [DataMember(Name = "post_logout_redirect_uri")]
        public string PostLogoutRedirectUri { get; set; }
    }
}