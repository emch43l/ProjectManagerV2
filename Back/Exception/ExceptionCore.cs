namespace Back.Exception;

public abstract class ExceptionCore : System.Exception
{
    public ExceptionCore(string message = "In app error occured !") : base(message)
    {
        
    }
}