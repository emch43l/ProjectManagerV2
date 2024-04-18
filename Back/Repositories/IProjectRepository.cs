﻿using Back.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Back.Repositories;

public interface IProjectRepository
{
    Task<Project?> GetProjectById(int id);

    Task<IEnumerable<Project>> GetAllProjects();

    Task RemoveProject(Project project);

    Task UpdateProject(Project project);

    Task<Project> CreateProject(Project project);

    Task SaveChanges();
}