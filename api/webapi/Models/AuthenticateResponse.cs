namespace webapi.Models
{
    public class AuthenticateResponse
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string eMail { get; set; }
        public string Department { get; set; }
        public string Token { get; set; }
        public AuthenticateResponse(User user, string token)
        {
            UserName = user.UserName;
            DisplayName = user.DisplayName;
            eMail = user.eMail;
            Department = user.Department;
            Token = token;
        }
    }
}
