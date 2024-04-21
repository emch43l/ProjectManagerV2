using Back.Entities.Enums;

namespace Back.Entities;

public class StoryTask
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public State State { get; set; }
    
    public DateTime CreationDate { get; set; }
    
    public DateTime? StartDate { get; set; }
    
    public DateTime? EndDate { get; set; }
    
    public int StoryId { get; set; }
    
    public int? UserId { get; set; }
    
}