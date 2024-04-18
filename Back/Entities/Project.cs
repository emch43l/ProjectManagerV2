namespace Back.Entities;

public class Project
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    
    public ICollection<Story> Stories { get; set; }
}