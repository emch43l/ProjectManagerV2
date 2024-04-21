using Back.Entities.Enums;

namespace Back.Entities;

public class Story
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public Priority Priority { get; set; }
    
    public int ProjectId { get; set; }
    
    public DateTime CreationDate { get; set; }
    
    public State State { get; set; }
    
    public ICollection<StoryTask> Tasks { get; set; }
    
    public User User { get; set; }
    
    public int UserId { get; set; }
}