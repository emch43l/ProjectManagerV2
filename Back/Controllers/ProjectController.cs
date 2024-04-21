using Back.Entities;
using Back.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers;


[ApiController]
[Route("api/projects")]
[Authorize]
public class ProjectController : ControllerBase
{
    private readonly IProjectService _projectService;

    public ProjectController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [HttpGet]
    public async Task<IActionResult> GetProjects()
    {
        IEnumerable<Project> projects = await _projectService.GetProjects();
        return Ok(projects);
    }

    [HttpGet]
    [Route("{projectId}")]
    public async Task<IActionResult> GetProject(int projectId)
    {
        Project project = await _projectService.GetProjectById(projectId);
        return Ok(project);
    }
}