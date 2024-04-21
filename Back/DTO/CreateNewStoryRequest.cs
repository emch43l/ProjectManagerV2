using System.Security.Claims;
using Back.Entities;
using Back.Entities.Enums;

namespace Back.DTO;

public class CreateNewStoryRequest
{
    public int ProjectId { get; set; }
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public DateTime CreationDate { get; set; }
    
    public State StoryState { get; set; }
    
    public Priority StoryPriority { get; set; }
}