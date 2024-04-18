using Back.Db;
using Back.Entities;
using Microsoft.EntityFrameworkCore;

namespace Back.Repositories;

public interface IStoryRepository
{
    Task<Story?> GetStoryById(int id);

    Task<IEnumerable<Story>> GetProjectStories(int projectId);

    Task RemoveStory(Story story);

    Task UpdateStory(Story story);

    Task<Story> CreateStory(Story story);

    Task SaveChanges();

}