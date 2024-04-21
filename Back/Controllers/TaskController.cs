using Back.DTO;
using Back.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers;

[Authorize]
[ApiController]
[Route("api/tasks")]
public class TaskController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TaskController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpDelete]
    [Route("{taskId}")]
    public async Task<IActionResult> DeleteTask(int taskId)
    {
        await _taskService.DeleteTask(taskId);
        return NoContent();
    }

    [HttpPut]
    [Route("{taskId}")]
    public async Task<IActionResult> UpdateTask(UpdateTaskRequest request, int taskId)
    {
        await _taskService.UpdateTask(request, taskId);
        return NoContent();
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask(CreateTaskRequest request)
    {
        await _taskService.CreateTask(request);
        return Ok();
    }
}