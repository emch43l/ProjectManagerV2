using Back.Entities.Enums;

namespace Back.DTO;

public class CreateTaskRequest
{
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public int StoryId { get; set; }
    
    public DateTime ExpectedEndTime { get; set; }
    
    public State State { get; set; }
    
    public DateTime CreationDate { get; set; }
    
    public int UserId { get; set; }
}