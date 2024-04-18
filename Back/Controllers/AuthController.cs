using Back.Entities;
using Back.Services.Auth;
using Back.Services.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RefreshRequest = Back.DTO.RefreshRequest;
using LoginRequest = Back.DTO.LoginRequest;
using RegisterRequest = Back.DTO.RegisterRequest;

namespace Back.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IIdentityService _identityService;
    public AuthController(IAuthService authService, IIdentityService identityService)
    {
        _authService = authService;
        _identityService = identityService;
    }
    
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        AuthResult result = await _authService.Login(request.Email,request.Password);
        return Ok(result);
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        AuthResult result = await _authService.Register(request.Email, request.Username, request.Password);
        return Ok(result);
    }
    
    [HttpPost]
    [Route("refresh")]
    public async Task<IActionResult> Login([FromBody] RefreshRequest refreshRequest)
    {
        AuthResult result = await _authService.RefreshToken(refreshRequest.Token,refreshRequest.RefreshToken);
        return Ok(result);
    }

    [Authorize]
    [HttpGet]
    [Route("user")]
    public async Task<IActionResult> GetUser()
    {
        User user = await _identityService.GetUserByClaimAsync(HttpContext.User);
        IList<string> userRoles = await _identityService.GetUserRolesByEmailAsync(user.Email);
        return Ok(
            new { Email = user.Email, Username = user.UserName, Roles = userRoles }
            );
    }
}