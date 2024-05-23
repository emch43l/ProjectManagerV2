using Back.DTO;
using Back.Entities;

namespace Back.Services;

public interface IProjectService
{
    Task<IEnumerable<Project>> GetProjects();

    Task<Project> GetProjectById(int id);

    Task<Project> CreateProject(ProjectRequest request);

    Task DeleteProject(int projectId);

    Task UpdateProject(ProjectRequest request, int projectId);
}