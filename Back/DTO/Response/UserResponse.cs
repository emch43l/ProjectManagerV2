﻿using Back.Entities;

namespace Back.DTO.Response;

public class UserResponse
{
    public int Id { get; set; }
    
    public string UserName { get; set; }

    public string Email { get; set; }
    
    public ICollection<string> Roles { get; set; }
}