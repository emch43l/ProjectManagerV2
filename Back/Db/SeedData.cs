using Back.Entities;
using Microsoft.AspNetCore.Identity;

namespace Back.Db;

public static class SeedData
{
    public static async void Seed(this IApplicationBuilder app)
    {
        using (IServiceScope scope = app.ApplicationServices.CreateScope())
        {
            IServiceProvider provider = scope.ServiceProvider;
            
            AppDbContext context = provider.GetRequiredService<AppDbContext>();
            RoleManager<Role> roleManager = provider.GetRequiredService<RoleManager<Role>>();
            UserManager<User> userManager = provider.GetRequiredService<UserManager<User>>();

            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
            
            User admin = await CreateUser(userManager,"admin","admin@manageme.com","zaq1@WSX");
            User devops = await CreateUser(userManager,"devops", "devops@manageme.com","zaq1@WSX");
            User developer = await CreateUser(userManager, "developer", "developer@manageme.com", "zaq1@WSX");
            
            await AssignUserToRole(userManager,roleManager, admin, "admin");
            await AssignUserToRole(userManager,roleManager, devops, "devops");
            await AssignUserToRole(userManager,roleManager, developer, "developer");

            Project p1 = CreateProjectOne(new List<User>([admin, developer, devops]));
            Project p2 = CreateProjectTwo(new List<User>([admin, developer, devops]));
            Project p3 = CreateProjectThree(new List<User>([admin, developer, devops]));
            
            await context.Projects.AddRangeAsync([p1, p2, p3]);
;           await context.SaveChangesAsync();


        }
    }

    private static async Task<User> CreateUser(UserManager<User> userManager, string userName, string email, string password)
    {
        User user = new User();
        user.EmailConfirmed = true;
        user.UserName = userName;
        user.Email = email;

        await userManager.CreateAsync(user, password);
        return user;
    }

    private static async Task AssignUserToRole(UserManager<User> userManager, RoleManager<Role> roleManager, User user, string roleName)
    {
        Role role = new Role();
        role.Name = roleName;
            
        await roleManager.CreateAsync(role);
        await userManager.AddToRoleAsync(user, roleName);
    }

    public static Project CreateProjectOne(List<User> users)
    {
        return new Project()
        {
            Name = "Cyberpunk 2077 release date at : 16 April 2020",
            Stories = new List<Story>([
                new Story()
                {
                    Name = "Story 1",
                    Description = "Story 1 description",
                    StoryState = StoryState.Doing,
                    Priority = StoryPriority.High,
                    UserId = users[0].Id,
                    CreationDate = DateTime.Now,

                },
                new Story()
                {
                    Name = "Story 2",
                    Description = "Story 2 description",
                    StoryState = StoryState.Doing,
                    Priority = StoryPriority.Low,
                    UserId = users[1].Id,
                    CreationDate = DateTime.Now,

                },
                new Story()
                {
                    Name = "Story 3",
                    Description = "Story 3 description",
                    StoryState = StoryState.Doing,
                    Priority = StoryPriority.Low,
                    UserId = users[0].Id,
                    CreationDate = DateTime.Now,

                },
                new Story()
                {
                    Name = "Story 4",
                    Description = "Story 4 description",
                    StoryState = StoryState.Doing,
                    Priority = StoryPriority.Medium,
                    UserId = users[1].Id,
                    CreationDate = DateTime.Now,

                },
                new Story()
                {
                    Name = "Story 5",
                    Description = "Story 5 description",
                    StoryState = StoryState.Doing,
                    Priority = StoryPriority.Low,
                    UserId = users[2].Id,
                    CreationDate = DateTime.Now,
                },
            ])
        };
    }
    
    public static Project CreateProjectTwo(List<User> users)
    {
        return new Project()
        {
            Name = "CS2 Anticheat update",
            Stories = new List<Story>([
                new Story()
                {
                    Name = "Story 1",
                    Description = "Story 1 description",
                    StoryState = StoryState.Todo,
                    Priority = StoryPriority.Low,
                    UserId = users[1].Id,
                    CreationDate = DateTime.Now.Subtract(TimeSpan.FromHours(1000)),
                },
                new Story()
                {
                    Name = "Story 2",
                    Description = "Story 2 description",
                    StoryState = StoryState.Todo,
                    Priority = StoryPriority.Low,
                    UserId = users[2].Id,
                    CreationDate = DateTime.Now.Subtract(TimeSpan.FromHours(100)),

                },
                new Story()
                {
                    Name = "Story 3",
                    Description = "Story 3 description",
                    StoryState = StoryState.Todo,
                    Priority = StoryPriority.Low,
                    UserId = users[0].Id,
                    CreationDate = DateTime.Now.Subtract(TimeSpan.FromHours(2137)),

                }
            ])
        };
    }
    
    public static Project CreateProjectThree(List<User> users)
    {
        return new Project()
        {
            Name = "The crew offline mode",
            Stories = new List<Story>([
                new Story()
                {
                    Name = "Story 1",
                    Description = "Story 1 description",
                    StoryState = StoryState.Todo,
                    Priority = StoryPriority.High,
                    UserId = users[0].Id,
                    CreationDate = DateTime.Now,
                },
                new Story()
                {
                    Name = "Story 2",
                    Description = "Story 2 description",
                    StoryState = StoryState.Doing,
                    Priority = StoryPriority.High,
                    UserId = users[2].Id,
                    CreationDate = DateTime.Now,

                }
            ])
        };
    }
    
}