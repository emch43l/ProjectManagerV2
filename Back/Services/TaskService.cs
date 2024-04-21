using Back.DTO;
using Back.Entities;
using Back.Entities.Enums;
using Back.Exception;
using Back.Repositories;
using Back.Services.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Back.Services;

public class TaskService : ITaskService
{
    private readonly IStoryRepository _storyRepository;
    private readonly ITaskRepository _taskRepository;
    private readonly UserManager<User> _userManager;

    public TaskService(ITaskRepository taskRepository, IStoryRepository storyRepository, UserManager<User> userManager)
    {
        _taskRepository = taskRepository;
        _storyRepository = storyRepository;
        _userManager = userManager;
    }

    public async Task DeleteTask(int taskId)
    {
        StoryTask? task = await _taskRepository.GetTaskById(taskId);
        if (task == null)
            throw new TaskNotFoundException();

        await _taskRepository.RemoveTask(task);
        await _taskRepository.SaveChanges();
    }

    public async Task<StoryTask> CreateTask(CreateTaskRequest request)
    {
        Story? story = await _storyRepository.GetStoryById(request.StoryId);
        if (story == null)
            throw new StoryNotFoundException();

        User? user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);
        if (user == null)
            throw new UserNotFoundException();

        IEnumerable<string> roles = await _userManager.GetRolesAsync(user);
        foreach (string role in roles)
        {
            if (role.ToLower().Contains("admin"))
            {
                throw new System.Exception("Admins cant be assigned to tasks !");
            }
        }

        StoryTask task = new StoryTask()
        {
            Name = request.Name,
            Description = request.Description,
            StoryId = request.StoryId,
            UserId = request.UserId,
            CreationDate = request.CreationDate,
            State = State.Todo
        };

        StoryTask createdTask = await _taskRepository.CreateTask(task);
        await _taskRepository.SaveChanges();

        return createdTask;
    }

    public async Task UpdateTask(UpdateTaskRequest request, int taskId)
    {
        StoryTask? task = await _taskRepository.GetTaskById(taskId);
        if (task == null)
            throw new TaskNotFoundException();

        if (request.StartDate != null)
            task.State = State.Doing;
        if (request.EndDate != null)
            task.State = State.Done;

        task.StartDate = request.StartDate;
        task.EndDate = request.EndDate;
        task.Name = request.Name;
        task.Description = request.Description;

        await _taskRepository.UpdateTask(task);
        await _taskRepository.SaveChanges();

    }
}