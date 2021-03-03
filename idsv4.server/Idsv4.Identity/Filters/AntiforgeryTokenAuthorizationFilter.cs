//using Microsoft.AspNetCore.Antiforgery;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc.Filters;
//using Microsoft.AspNetCore.Mvc.ViewFeatures;
//using Microsoft.Extensions.Logging;
//using System;
//using System.Threading.Tasks;
//
//namespace Idsv4.Identity.Filters {
//    public class AntiforgeryTokenAuthorizationFilter : IAntiforgeryPolicy, IAsyncAuthorizationFilter {
//        private readonly ILogger<AntiforgeryTokenAuthorizationFilter> _logger;
//        private readonly IAntiforgery _antiforgery;
//
//        public AntiforgeryTokenAuthorizationFilter(
//            IAntiforgery antiforgery,
//            ILogger<AntiforgeryTokenAuthorizationFilter> logger
//        ) {
//            _logger = logger;
//            _antiforgery = antiforgery;
//        }
//
//        public async Task OnAuthorizationAsync(AuthorizationFilterContext context) {
//            if (context == null) {
//                throw new ArgumentNullException(nameof(context));
//            }
//
//            if (!context.IsEffectivePolicy<IAntiforgeryPolicy>(this)) {
//                _logger.LogError($"Not most effective filter: {typeof(IAntiforgeryPolicy)}");
//                return;
//            }
//
//            try {
//                await _antiforgery.ValidateRequestAsync(context.HttpContext).ConfigureAwait(false);
//            }
//            catch (AntiforgeryValidationException exception) {
//                _logger.LogError($"Antiforgery token invalid: {exception.Message}");
//                _logger.LogTrace($"Antiforgery token invalid: {exception.Message}", exception);
//                context.Result = new AntiforgeryValidationFailedResult();
//            }
//        }
//    }
//}