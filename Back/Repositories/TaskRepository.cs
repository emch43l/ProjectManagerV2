using Back.Db;
using Back.Entities;
using Microsoft.EntityFrameworkCore;

namespace Back.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly AppDbContext _context;

    public TaskRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<StoryTask?> GetTaskById(int id)
    {
        return await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<IEnumerable<StoryTask>> GetAllTasks()
    {
        return await _context.Tasks.ToListAsync();
    }

    public async Task RemoveTask(StoryTask storyTask)
    {
        await Task.FromResult(_context.Tasks.Remove(storyTask));
    }

    public async Task UpdateTask(StoryTask storyTask)
    {
        await Task.FromResult(_context.Tasks.Update(storyTask));
    }

    public async Task<StoryTask> CreateTask(StoryTask storyTask)
    { 
        return (await _context.Tasks.AddAsync(storyTask)).Entity;
    }

    public async Task SaveChanges()
    {
        await _context.SaveChangesAsync();
    }
}