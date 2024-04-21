using Back.DTO;
using Back.Entities;

namespace Back.Services;

public interface ITaskService
{
    Task DeleteTask(int taskId);

    Task<StoryTask> CreateTask(CreateTaskRequest request);

    Task UpdateTask(UpdateTaskRequest request, int taskId);
}