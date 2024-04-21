using System.Security.Claims;
using Back.DTO;
using Back.Entities;
using Back.Exception;
using Back.Repositories;
using Back.Services.Identity;

namespace Back.Services;

public class StoryService : IStoryService
{
    private readonly IStoryRepository _storyRepository;

    private readonly IIdentityService _identityService;

    private readonly IProjectRepository _projectRepository;

    public StoryService(IStoryRepository storyRepository, IIdentityService identityService, IProjectRepository projectRepository)
    {
        _storyRepository = storyRepository;
        _identityService = identityService;
        _projectRepository = projectRepository;
    }

    public async Task UpdateStory(UpdateStoryRequest request, int storyId)
    {
        Story? currentStory = await _storyRepository.GetStoryById(storyId);
        if (currentStory == null)
            throw new StoryNotFoundException();

        currentStory.Name = request.Name;
        currentStory.Description = request.Description;
        currentStory.Priority = request.StoryPriority;
        currentStory.State = request.StoryState;
        currentStory.CreationDate = request.CreationDate;

        await _storyRepository.UpdateStory(currentStory);
        await _storyRepository.SaveChanges();
    }

    public async Task<Story> CreateNewStory(CreateNewStoryRequest request, ClaimsPrincipal principal)
    {
        User? user = await _identityService.GetUserByClaimAsync(principal);
        if (user == null)
            throw new UserNotFoundException();

        Project? project = await _projectRepository.GetProjectById(request.ProjectId);
        if (project == null)
            throw new ProjectNotFoundException();

        Story story = new Story()
        {
            CreationDate = request.CreationDate,
            Description = request.Description,
            Name = request.Name,
            State = request.StoryState,
            Priority = request.StoryPriority,
            ProjectId = request.ProjectId,
            UserId = user.Id
        };
        Story newStory = await _storyRepository.CreateStory(story);
        await _storyRepository.SaveChanges();
        
        return newStory;
    }

    public async Task DeleteStory(int storyId)
    {
        Story? story = await _storyRepository.GetStoryById(storyId);
        if (story == null)
            throw new StoryNotFoundException();

        await _storyRepository.RemoveStory(story);
        await _storyRepository.SaveChanges();
    }

    public async Task<Story> GetStory(int storyId)
    {
        Story? story = await _storyRepository.GetStoryById(storyId);
        if (story == null)
            throw new StoryNotFoundException();

        return story;
    }
}