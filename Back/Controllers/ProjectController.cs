using Back.DTO;
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
    
    [HttpDelete]
    [Route("{projectId}")]
    public async Task<IActionResult> DeleteProject(int projectId)
    {
        await _projectService.DeleteProject(projectId);
        return Ok();
    }
    
    [HttpPut]
    [Route("{projectId}")]
    public async Task<IActionResult> UpdateProject([FromBody] ProjectRequest request, int projectId)
    {
        await _projectService.UpdateProject(request,projectId);
        return Ok();
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateProject([FromBody] ProjectRequest request)
    {
        await _projectService.CreateProject(request);
        return Ok();
    }
}