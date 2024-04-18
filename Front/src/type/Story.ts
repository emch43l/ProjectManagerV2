type Story = {
    Id: string,
    Name: string,
    Description: string,
    DateCreated: Date,
    Priority: StoryPriority,
    State: StoryState
}

enum StoryPriority
{
    Low,
    Medium,
    High
}

enum StoryState
{
    Todo,
    Doing,
    Done
}