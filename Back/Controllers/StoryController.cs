using System.Security.Claims;
using AutoMapper;
using Back.DTO;
using Back.DTO.Response;
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
    private readonly IMapper _mapper;

    public StoryController(IStoryService storyService, IMapper mapper)
    {
        _storyService = storyService;
        _mapper = mapper;
    }

    [HttpGet]
    [Route("{storyId}")]
    public async Task<IActionResult> GetStory(int storyId)
    {
        Story story = await _storyService.GetStory(storyId);
        StoryResponse response = _mapper.Map<StoryResponse>(story);
        return Ok(response);
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