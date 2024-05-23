using Back.DTO;
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

    public async Task<Project> CreateProject(ProjectRequest request)
    {
        Project project = new Project()
        {
            Name = request.Name
        };

        project = await _projectRepository.CreateProject(project);
        await _projectRepository.SaveChanges();

        return project;
    }

    public async Task DeleteProject(int projectId)
    {
        Project? project = await _projectRepository.GetProjectById(projectId);
        if(project == null)
            throw new ProjectNotFoundException();

        await _projectRepository.RemoveProject(project);
        await _projectRepository.SaveChanges();
    }

    public async Task UpdateProject(ProjectRequest request, int projectId)
    {
        Project? project = await _projectRepository.GetProjectById(projectId);
        if(project == null)
            throw new ProjectNotFoundException();

        project.Name = request.Name;
        await _projectRepository.UpdateProject(project);
        await _projectRepository.SaveChanges();
    }
}