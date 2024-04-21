using Back.Entities;

namespace Back.Services;

public interface IProjectService
{
    Task<IEnumerable<Project>> GetProjects();

    Task<Project> GetProjectById(int id);
}