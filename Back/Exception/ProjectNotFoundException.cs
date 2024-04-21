namespace Back.Exception;

public class ProjectNotFoundException : ExceptionCore
{
    public ProjectNotFoundException(string message = "Project not found !") : base(message)
    {
        
    }
}