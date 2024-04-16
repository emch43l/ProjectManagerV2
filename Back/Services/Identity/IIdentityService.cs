using System.Security.Claims;
using Back.Entities;
using Microsoft.AspNetCore.Identity;

namespace Back.Services.Identity;

public interface IIdentityService
{
    Task<User> GetUserByClaimAsync(ClaimsPrincipal claimsPrincipal);
    
    Task<IList<string>> GetUserRolesByEmailAsync(string email);
    
    Task<User?> GetUserByEmailAsync(string email);
    
    Task<bool> CheckPasswordAsync(User user, string password);

    Task<User> CreateUserAsync(string email, string username,  string password);

    Task<IdentityResult> UpdateUserRefreshTokenAsync(User user, RefreshToken token);

}