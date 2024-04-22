using AutoMapper;
using Back.DTO.Response;
using Back.Entities;

namespace Back.Mapper;

public class StoryMapper : Profile
{
    public StoryMapper()
    {
        CreateMap< Story,StoryResponse>();
        CreateMap<StoryTask,TaskResponse>();
        CreateMap<User, UserResponse>();
    }
}