using AutoMapper;
using Back.DTO.Response;
using Back.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back.Controllers;

[Authorize]
[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly UserManager<User> _userManager;

    private readonly IMapper _mapper;

    public UserController(UserManager<User> userManager, IMapper mapper)
    {
        _userManager = userManager;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        List<User> users = await _userManager.Users.ToListAsync();
        
        // trash code
        
        List<UserResponse> response = users.Select(async r => new UserResponse()
        {
            Id = r.Id,
            UserName = r.UserName,
            Email = r.Email,
            Roles = await _userManager.GetRolesAsync(r)
        }).Select(t => t.Result).ToList();
        
        // end of trash code
        
        return Ok(response);
    }
}