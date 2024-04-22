import { User } from "./User"

export type Task = {
    id: number
    name: string,
    description: string,
    state: TaskState,
    creationDate: string,
    startDate: string | null,
    endDate: string | null,
    storyId: number,
    userId: number,
    user: User
}

export enum TaskState {
    Todo,
    Doing,
    Done,
}