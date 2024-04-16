namespace Back.Services.Auth;

public record AuthResult(string Token, string RefreshToken, int UserId);