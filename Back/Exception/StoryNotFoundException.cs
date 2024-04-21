namespace Back.Exception;

public class StoryNotFoundException : ExceptionCore
{
    public StoryNotFoundException(string message = "Story not found !") : base(message)
    {
        
    }
}