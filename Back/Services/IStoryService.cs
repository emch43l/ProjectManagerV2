using System.Security.Claims;
using Back.DTO;
using Back.Entities;

namespace Back.Services;

public interface IStoryService
{
    Task UpdateStory(UpdateStoryRequest story, int storyId);

    Task<Story> CreateNewStory(CreateNewStoryRequest request, ClaimsPrincipal user);

    Task DeleteStory(int storyId);

    Task<Story> GetStory(int storyId);
}