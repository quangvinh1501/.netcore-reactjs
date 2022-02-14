using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using webapi.Interfaces;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SecurityController : Controller
    {

        private readonly IAuthenticationService authService;

        public SecurityController(IAuthenticationService authService)
        {
            this.authService = authService;
        }
        //http://localhost:5000/api/Security/Login?Username=xxx&Password=xxxx
        [HttpPost("Login")]
        //public async Task<IActionResult> Login(string UserName, string Password)
        public IActionResult Login(AuthenticateRequest model)
        {
            //try
            //{
                var user = authService.Login(model);
                if (null != user)
                {
                    return Ok(user);
                    // create your login token here
                }
                else
                {
                //return Unauthorized();
                return BadRequest(new { message = "Username or password is incorrect" });
            }
           // }
            //catch (Exception ex)
            //{
            //    return BadRequest(ex.Message);
            //}
        }
    }
}
