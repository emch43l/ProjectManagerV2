using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers;

[ApiController]
[Route("test")]
public class TestController : ControllerBase
{
    [Authorize]
    [HttpGet]
    [Route("get")]
    public async Task<IActionResult> AuthTest()
    {
        var user = HttpContext.User;
        return Ok(new
        {
            Id = 1,
            Name = "Adam",
            Surname = "Testowy"
        });
    }
}