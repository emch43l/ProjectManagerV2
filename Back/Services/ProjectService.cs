using Back.Entities;
using Back.Repositories;

namespace Back.Services;

public class ProjectService : IProjectService
{
    public readonly IProjectRepository _projectRepository;

    public ProjectService(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }

    public async Task<IEnumerable<Project>> GetProjects()
    {
        return await _projectRepository.GetAllProjects();
    }
}