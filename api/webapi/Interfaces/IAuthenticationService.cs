using webapi.Models;

namespace webapi.Interfaces
{
    public interface IAuthenticationService
    {
        AuthenticateResponse Login(AuthenticateRequest model);
        //AuthenticateResponse Login(string UserName, string Password);
    }
}
