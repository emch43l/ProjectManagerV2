namespace Back.Services.Token;

public class Settings
{
    private const string SettingsSectionName = "JwtSettings"; 
    
    private readonly IConfiguration _configuration;
    public string Secret { get ; private set; }
    
    public string Issuer { get; private set; }
    
    public string Audience { get ; private set; }

    public Settings(IConfiguration configuration)
    {
        _configuration = configuration;
        PopulateSettings();
    }

    public static Settings FromConfiguration(IConfiguration configuration)
    {
        return new Settings(configuration);
    }

    private void PopulateSettings()
    {
        IConfigurationSection section = this._configuration.GetSection(SettingsSectionName);
        
        Secret = section.GetSection("Secret").Value ?? throw new ArgumentNullException(nameof(Secret));
        Issuer = section.GetSection("Issuer").Value ?? throw new ArgumentNullException(nameof(Issuer));
        Audience = section.GetSection("Audience").Value ?? throw new ArgumentNullException(nameof(Audience));
        
    }
    
}