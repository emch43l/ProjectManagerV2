namespace Back.Entities;

public class RefreshToken
{
    public int Id { get; set; }
    
    public string TokenString { get; set; }
    
    public DateTime ExpireDate { get; set; }
    
    public int UserId { get; set; }

    public User User { get; set; }
}