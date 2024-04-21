using Back.Db;
using Back.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Back.Repositories;

public class ProjectRepository : IProjectRepository
{
    private readonly AppDbContext _context;

    public ProjectRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Project?> GetProjectById(int id)
    {
        return await _context.Projects.Include(p => p.Stories).FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<IEnumerable<Project>> GetAllProjects()
    {
        return await _context.Projects.ToListAsync();
    }

    public async Task RemoveProject(Project project)
    {
        await Task.FromResult(_context.Projects.Remove(project));
    }

    public async Task UpdateProject(Project project)
    {
        await Task.FromResult(_context.Projects.Update(project));
    }

    public async Task<Project> CreateProject(Project project)
    {
       return (await _context.Projects.AddAsync(project)).Entity;
    }

    public async Task SaveChanges()
    {
        await _context.SaveChangesAsync();
    }
}