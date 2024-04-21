using Back.Entities;
using Back.Exception;
using Back.Repositories;

namespace Back.Services;

public class ProjectService : IProjectService
{
    private readonly IProjectRepository _projectRepository;

    public ProjectService(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }

    public async Task<IEnumerable<Project>> GetProjects()
    {
        return await _projectRepository.GetAllProjects();
    }

    public async Task<Project> GetProjectById(int id)
    {
        return 
            await _projectRepository.GetProjectById(id) ?? 
            throw new ProjectNotFoundException();
    }
}