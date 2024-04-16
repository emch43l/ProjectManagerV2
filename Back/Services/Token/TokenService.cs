using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Back.Entities;
using Back.Exception;
using Back.Services.Identity;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace Back.Services.Token;

public class TokenService : ITokenService
{
    private const int TokenLifetime = 120;
    
    private const string TokenAlgorithm = SecurityAlgorithms.HmacSha256;
    
    private readonly Settings _settings;

    private readonly IIdentityService _identityService;

    public TokenService(Settings settings, IIdentityService identityService)
    {
        _settings = settings;
        _identityService = identityService;
    }

    public RefreshToken CreateRefreshTokenForUser()
    {
        RefreshToken token = new RefreshToken() 
        {
            TokenString = CreateRefreshToken(),
            ExpireDate = DateTime.Now.AddDays(7)
        };

        return token;
    }

    public string CreateToken(User user, IEnumerable<string> roles)
    {
        SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor();
        JsonWebTokenHandler handler = new JsonWebTokenHandler();
        handler.SetDefaultTimesOnTokenCreation = false;

        Dictionary<string, object> tokenClaims = new Dictionary<string, object>();
        
        tokenClaims.Add(ClaimTypes.NameIdentifier, user.Id);
        tokenClaims.Add(JwtRegisteredClaimNames.Email, user.Email);
        tokenClaims.Add(JwtRegisteredClaimNames.Exp, DateTimeOffset.UtcNow.AddMinutes(TokenLifetime).ToUnixTimeMilliseconds());
        tokenClaims.Add(ClaimTypes.Role, roles);


        descriptor.Claims = tokenClaims;
        descriptor.NotBefore = DateTime.Now;
        descriptor.Expires = DateTime.UtcNow.AddMinutes(TokenLifetime);
        descriptor.Audience = _settings.Audience;
        descriptor.Issuer = _settings.Issuer;
        descriptor.SigningCredentials = new SigningCredentials(GetTokenSecurityKey(),TokenAlgorithm);
        
        
        string token = handler.CreateToken(descriptor);
        return token;
    }

    public async Task<ClaimsPrincipal> GetPrincipalFromToken(string token)
    {
        JsonWebTokenHandler handler = new JsonWebTokenHandler();
        TokenValidationParameters parameters = new TokenValidationParameters();
        
        parameters.ValidateIssuerSigningKey = true;
        parameters.IssuerSigningKey = GetTokenSecurityKey();
        parameters.ValidIssuer = _settings.Issuer;
        parameters.ValidAudience = _settings.Audience;

        TokenValidationResult result = await handler.ValidateTokenAsync(token, parameters);
        if (!result.IsValid)
        {
            throw new TokenValidationException(result.Exception.Message);
        }

        return new ClaimsPrincipal(new ClaimsIdentity(result.ClaimsIdentity));
    }

    public string CreateRefreshToken()
    {
        var randomNumber = new byte[32];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
    }

    private SecurityKey GetTokenSecurityKey()
    {
        return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Secret));
    }
}