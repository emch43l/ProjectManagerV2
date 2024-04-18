using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers;

[ApiController]
[Route("api/story")]
[Authorize]
public class StoryController : ControllerBase
{
    [HttpGet]
    [Route("get")]
    public async Task<IActionResult> AuthTest()
    {
        return Ok(new
        {
            
        });
    }
}