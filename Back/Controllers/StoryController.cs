using System.Security.Claims;
using Back.DTO;
using Back.Entities;
using Back.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers;

[ApiController]
[Route("api/stories")]
[Authorize]
public class StoryController : ControllerBase
{
    private readonly IStoryService _storyService;

    public StoryController(IStoryService storyService)
    {
        _storyService = storyService;
    }

    [HttpGet]
    [Route("{storyId}")]
    public async Task<IActionResult> GetStory(int storyId)
    {
        Story story = await _storyService.GetStory(storyId);
        return Ok(story);
    }

    [HttpPut]
    [Route("{storyId}")]
    public async Task<IActionResult> UpdateStory(UpdateStoryRequest request, int storyId)
    {
        await _storyService.UpdateStory(request,storyId);
        return NoContent();
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateStory(CreateNewStoryRequest request)
    {
        Story story = await _storyService.CreateNewStory(request, HttpContext.User);
        return Created();
    }
    
    [HttpDelete]
    [Route("{storyId}")]
    public async Task<IActionResult> CreateStory(int storyId)
    {
        await _storyService.DeleteStory(storyId);
        return NoContent();
    }
}