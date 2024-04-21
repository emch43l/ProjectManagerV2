using Back.Entities.Enums;

namespace Back.DTO;

public class UpdateTaskRequest
{
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public DateTime? StartDate { get; set; }
    
    public DateTime? EndDate { get; set; }
}