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
            
            User admin = await CreateUser(userManager,"admin","admin@manageme.com","zaq1@WSX");
            User devops = await CreateUser(userManager,"devops", "devops@manageme.com","zaq1@WSX");
            User developer = await CreateUser(userManager, "developer", "developer@manageme.com", "zaq1@WSX");
            
            await AssignUserToRole(userManager,roleManager, admin, "admin");
            await AssignUserToRole(userManager,roleManager, devops, "devops");
            await AssignUserToRole(userManager,roleManager, developer, "developer");
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
}