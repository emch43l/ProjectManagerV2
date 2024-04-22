using Back.Entities;
using Back.Entities.Enums;

namespace Back.DTO.Response;

public class StoryResponse
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public Priority Priority { get; set; }
    
    public DateTime CreationDate { get; set; }
    
    public State State { get; set; }
    
    public List<TaskResponse> Tasks { get; set; }
}