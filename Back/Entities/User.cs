using Microsoft.AspNetCore.Identity;

namespace Back.Entities;

public class User : IdentityUser<int>
{
    public RefreshToken? RefreshToken { get; set; }
    
    public List<Story> Stories { get; set; }
    
    public List<StoryTask> Tasks { get; set; }
}