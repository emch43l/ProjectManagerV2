namespace Back.Exception;

public class TaskNotFoundException : ExceptionCore
{
    public TaskNotFoundException(string message = "Task not found !") : base(message)
    {
        
    }
}