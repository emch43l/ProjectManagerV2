using Microsoft.AspNetCore.Identity;

namespace Back.Entities;

public class User : IdentityUser<int>
{
    public RefreshToken? RefreshToken { get; set; }
}