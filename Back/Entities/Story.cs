namespace Back.Entities;

public class Story
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public StoryPriority Priority { get; set; }
    
    public Project Project { get; set; }
    
    public int ProjectId { get; set; }
    
    public DateTime CreationDate { get; set; }
    
    public StoryState StoryState { get; set; }
    
    public User User { get; set; }
    
    public int UserId { get; set; }
}

public enum StoryPriority
{
    Low,
    Medium,
    High
}

public enum StoryState
{
    Todo,
    Doing,
    Done
}