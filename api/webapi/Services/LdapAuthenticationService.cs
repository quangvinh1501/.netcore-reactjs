using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.DirectoryServices;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using webapi.Auth;
using webapi.Helpers;
using webapi.Interfaces;
using webapi.Models;


namespace webapi.Services
{
    public class LdapAuthenticationService : IAuthenticationService
    {
        private readonly AppSettings _appSettings;
        private const string DisplayNameAttribute = "DisplayName";
        private const string SAMAccountNameAttribute = "SAMAccountName";
        private const string EmailAttribute = "mail";
        private const string DepartmentAttribute = "department";

        private readonly LdapConfig config;

        public LdapAuthenticationService(IOptions<LdapConfig> config, IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            this.config = config.Value;
        }

        
        public AuthenticateResponse Login(AuthenticateRequest model)
        {
            try
            {
                using (DirectoryEntry entry = new DirectoryEntry(config.Path, config.UserDomainName + "\\" + model.Username, model.Password))
                {
                    using (DirectorySearcher searcher = new DirectorySearcher(entry))
                    {
                        searcher.Filter = String.Format("({0}={1})", SAMAccountNameAttribute, model.Username);
                        searcher.PropertiesToLoad.Add(DisplayNameAttribute);
                        searcher.PropertiesToLoad.Add(SAMAccountNameAttribute);
                        searcher.PropertiesToLoad.Add(EmailAttribute);
                        searcher.PropertiesToLoad.Add(DepartmentAttribute);
                        var result = searcher.FindOne();
                        if (result != null)
                        {
                            var displayName = result.Properties[DisplayNameAttribute];
                            var samAccountName = result.Properties[SAMAccountNameAttribute];
                            var eMail = result.Properties[EmailAttribute];
                            var Department = result.Properties[DepartmentAttribute];

                            var user = new User
                            {
                                DisplayName = displayName == null || displayName.Count <= 0 ? null : displayName[0].ToString(),
                                UserName = samAccountName == null || samAccountName.Count <= 0 ? null : samAccountName[0].ToString(),
                                eMail = eMail == null || eMail.Count <= 0 ? null : eMail[0].ToString(),
                                Department = Department == null || Department.Count <= 0 ? null : Department[0].ToString()
                            };
                            var token = generateJwtToken(user);
                            return new AuthenticateResponse(user, token);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // if we get an error, it means we have a login failure.
                // Log specific exception

            }
            return null;
        }
        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            //var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret); 
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                //Subject = new ClaimsIdentity(new[] { new Claim("user", user.ToString()) }),

                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("user",user.UserName.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
