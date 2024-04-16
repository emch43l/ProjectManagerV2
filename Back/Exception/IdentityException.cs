namespace Back.Exception;

public class IdentityException : ExceptionCore
{
    public IdentityException(string message = "An identity exception occured !") : base(message)
    {
        
    }
}