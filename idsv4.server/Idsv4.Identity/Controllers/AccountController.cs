using Idsv4.Identity.Filters;
using Idsv4.Identity.Models;
using Idsv4.Student.Identity.Models.AccountModels;
using IdentityServer4.Events;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Idsv4.Identity.Controllers {
    [Route("api/account")]
    [ApiController]
    [AllowAnonymous]
    [SecurityHeaders]
    public class AccountController : ControllerBase {
        private readonly IIdentityServerInteractionService _interaction;
        private readonly IEventService _events;
        private readonly IUserSession _userSession;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AccountController(
            IUserSession userSession,
            IIdentityServerInteractionService interaction,
            IEventService events,
            UserManager<User> userManager,
            SignInManager<User> signInManager
        ) {
            _userSession = userSession;
            _events = events;
            _userManager = userManager;
            _signInManager = signInManager;
            _interaction = interaction;
        }

        /// <summary>
        /// Handle login
        /// </summary>
        [HttpPost("sign-in")]
//        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SignIn([FromBody] LoginModel model) {
            // check if we are in the context of an authorization request
            var context = await _interaction.GetAuthorizationContextAsync(model.ReturnUrl);
            if (context == null) {
                return BadRequest();
            }

            var user = await _userManager.FindByEmailAsync(model.Email);

            if (await _userManager.CheckPasswordAsync(user, model.Password)) {
                await _signInManager.SignInAsync(user, new AuthenticationProperties() {
                    AllowRefresh = true,
                    IsPersistent = true,
                    ExpiresUtc = DateTimeOffset.UtcNow.AddDays(30),
                    IssuedUtc = DateTimeOffset.UtcNow
                });
                await _events.RaiseAsync(
                    new UserLoginSuccessEvent(user.UserName, user.Id, user.UserName, true, user.Id));
            }

            return new JsonResult(new {
                returnUrl = model.ReturnUrl,
                statusCode = Ok().StatusCode
            });
        }

        /// <summary>
        /// Handle refresh login
        /// </summary>
        [HttpPost("refresh/sign-in")]
        public async Task<IActionResult> RefreshSignInAsync() {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            var session = _userSession.GetSessionIdAsync();

            if (user != null) {
                await _signInManager.RefreshSignInAsync(user);
                return Ok();
            }

            return BadRequest();
        }

        /// <summary>
        /// Handle register
        /// </summary>
        [HttpPost("sign-up")]
//        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SignUp([FromBody] RegisterModel model) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var user = new User {UserName = model.UserName, Email = model.Email};

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok();
        }

        /// <summary>
        /// Handle logout
        /// </summary>
        [HttpGet("/sign-out")]
//        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SignOut([FromQuery] string logoutId) {
            var context = await _interaction.GetLogoutContextAsync(logoutId);
            if (context != null) {
                await _signInManager.SignOutAsync();

                return Redirect(context.PostLogoutRedirectUri);
            }

            return BadRequest();
        }
    }
}