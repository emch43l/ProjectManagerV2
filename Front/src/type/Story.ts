export type Story = {
    id: string,
    name: string,
    description: string,
    creationDate: string,
    priority: StoryPriority,
    state: StoryState
}

export enum StoryPriority
{
    Low,
    Medium,
    High
}

export enum StoryState
{
    Todo,
    Doing,
    Done
}