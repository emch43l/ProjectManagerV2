using System.Security.Claims;
using Back.Db;
using Back.Entities;
using Back.Exception;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Back.Services.Identity;

public class IdentityService : IIdentityService
{
    private readonly AppDbContext _context;
    
    private readonly UserManager<User> _manager;

    public IdentityService(UserManager<User> manager, AppDbContext context)
    {
        _context = context;
        _manager = manager;
    }
    public async Task<User?> GetUserByEmailAsync(string email)
    {
        User? user = await _manager.FindByEmailAsync(email);

        await LoadTokenForUser(user);

        return user;
    }

    public async Task<bool> CheckPasswordAsync(User user, string password)
    {
        return await _manager.CheckPasswordAsync((User)user, password);
    }

    public async Task<User> CreateUserAsync(string email, string username, string password)
    {
        User? user = await GetUserByEmailAsync(email);
        if (user != null)
        {
            throw new UserAlreadyExistException($"User with this email already exist !");
        }

        User newUser = new User() { Email = email, UserName = username};
        IdentityResult result = await _manager.CreateAsync(newUser, password);
        if (!result.Succeeded)
        {
            throw new IdentityException(string.Join(',',result.Errors.Select(e => e.Description)));
        }

        return newUser;
    }

    public async Task<IdentityResult> UpdateUserRefreshTokenAsync(User user, RefreshToken token)
    {
        if (user.RefreshToken == null)
        {
            user.RefreshToken = token;
        }
        else
        {
            user.RefreshToken.TokenString = token.TokenString;
            user.RefreshToken.ExpireDate = token.ExpireDate;
        }
        
        return await _manager.UpdateAsync(user);
    }

    public async Task<User> GetUserByClaimAsync(ClaimsPrincipal claimsPrincipal)
    {
        User? user = await _manager.GetUserAsync(claimsPrincipal);
        if (user == null)
            throw new UserNotFoundException();

        await LoadTokenForUser(user);

        return user;
    }

    public async Task<IList<string>> GetUserRolesByEmailAsync(string email)
    {
        User? user = await GetUserByEmailAsync(email);
        if (user == null)
        {
            throw new UserNotFoundException();
        }
        
        IList<string> userRoles = await _manager.GetRolesAsync((User)user);
        return userRoles;
    }

    private async Task LoadTokenForUser(User? user)
    {
        if(user == null)
            return;
        await _context.Users.Entry(user).Reference(u => u.RefreshToken).LoadAsync();
    }

}