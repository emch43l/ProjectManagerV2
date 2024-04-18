using Back.Db;
using Back.Entities;
using Microsoft.EntityFrameworkCore;

namespace Back.Repositories;

public class StoryRepository : IStoryRepository
{
    private readonly AppDbContext _context;

    public StoryRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Story?> GetStoryById(int id)
    {
        return await _context.Stories.FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<IEnumerable<Story>> GetProjectStories(int projectId)
    {
        return await _context.Stories.Where(s => s.ProjectId == projectId).ToListAsync();
    }

    public async Task RemoveStory(Story story)
    {
        await Task.FromResult(_context.Stories.Remove(story));
    }

    public async Task UpdateStory(Story story)
    {
        await Task.FromResult(_context.Stories.Update(story));
    }

    public async Task<Story> CreateStory(Story story)
    {
        return (await _context.Stories.AddAsync(story)).Entity;
    }

    public async Task SaveChanges()
    {
        await _context.SaveChangesAsync();
    }
}