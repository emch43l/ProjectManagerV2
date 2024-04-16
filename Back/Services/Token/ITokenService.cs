using System.Security.Claims;
using Back.Entities;

namespace Back.Services.Token;

public interface ITokenService
{
    RefreshToken CreateRefreshTokenForUser();
    string CreateRefreshToken();
    string CreateToken(User user, IEnumerable<string> roles);
    
    Task<ClaimsPrincipal> GetPrincipalFromToken(string token);
}