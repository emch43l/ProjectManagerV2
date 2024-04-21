using Back.Entities;

namespace Back.Repositories;

public interface ITaskRepository
{
    Task<StoryTask?> GetTaskById(int id);

    Task<IEnumerable<StoryTask>> GetAllTasks();

    Task RemoveTask(StoryTask storyTask);

    Task UpdateTask(StoryTask storyTask);

    Task<StoryTask> CreateTask(StoryTask storyTask);

    Task SaveChanges();
}