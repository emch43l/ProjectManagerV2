using Back.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Back.Db;

public class AppDbContext : IdentityDbContext<User,Role,int>
{
    public DbSet<RefreshToken> Tokens { get; set; }

    public DbSet<Project> Projects { get; set; }

    public DbSet<Story> Stories { get; set; }
    
    public DbSet<StoryTask> Tasks { get; set; }
    
    public AppDbContext(DbContextOptions options) : base(options)
    {
        this.ChangeTracker.LazyLoadingEnabled = false;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}