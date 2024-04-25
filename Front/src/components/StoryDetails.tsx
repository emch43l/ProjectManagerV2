import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import {  useParams } from "react-router-dom";
import { Story } from "../type/Story";
import KanbanTable from "./KanbanTable";
import KanbanTableColumn from "./KanbanTableColumn";
import KanbanTableColumnDivider from "./KanbanTableColumnDivider";
import { Task, TaskState } from "../type/Task";
import TaskEntry from "./TaskEntry";
import ModalBody from "./modals/ModalBody";
import ModalCard from "./modals/ModalCard";
import ManageTaskModal from "./modals/ManageTaskModal";
import useModal from "../hooks/useModal";

type StoryDetailsParams = {
    storyId: string
}

const StoryDetails = () => {

    const modalParams = useModal()
    const axios = useAxios()

    const { storyId } = useParams<StoryDetailsParams>()
    
    const [story,setStory] = useState<Story | null>(null)
    const [task,setTask] = useState<Task | null>(null)

    useEffect(() => {
        getStory()
    },[storyId])

    const getStory = () => {
        axios
            .get<Story>(`api/stories/${storyId}`)
            .then(response => response.data)
            .then(setStory)
            .catch(console.log)
    }

    const addTask = () => {
        setTask(null)
        modalParams.open()
    }

    const editTask = (task: Task) => {
        setTask(task)
        modalParams.open()
    }

    const deleteTask = (task: Task) => {
        axios
            .delete(`api/tasks/${task.id}`)
            .catch(console.log)
            .finally(getStory)
    }

    const onFormSubmit = () => {
        modalParams.close()
        getStory()
    }

    return (
        story === null ? null :  
        <>
            <div className="flex items-center justify-center mt-5">
                <div className="-mb-10 bg-white z-10 px-10 py-1 border-slate-300 border-[1px] rounded-md font-semibold">
                    <span>{story.name} - Tasks Table</span>
                </div>
                <div className="-mb-10 z-10 px-5 py-1 rounded-md font-semibold">
                    <button onClick={addTask} className=" bg-green-200 px-4 py-1 rounded-md text-green-900 border-green-700 border-[1px]">
                        Add             
                    </button>
                </div>
                
            </div>
                
            <KanbanTable>
                <KanbanTableColumn label="Todo" width="w-[33vw]">
                    {story.tasks.filter(s => s.state == TaskState.Todo).map((t,i) => 
                        <TaskEntry key={i} task={t} editTaskCallback={() => editTask(t)} deleteTaskCallback={() => deleteTask(t)}/>
                    )}
                </KanbanTableColumn>
                <KanbanTableColumnDivider/>
                <KanbanTableColumn label="Doing" width="w-[33vw]">
                    {story.tasks.filter(s => s.state == TaskState.Doing).map((t,i) => 
                        <TaskEntry key={i} task={t} editTaskCallback={() => editTask(t)} deleteTaskCallback={() => deleteTask(t)}/>
                    )}
                </KanbanTableColumn>
                <KanbanTableColumnDivider/>
                <KanbanTableColumn label="Done" width="w-[33vw]">
                    {story.tasks.filter(s => s.state == TaskState.Done).map((t,i) => 
                        <TaskEntry key={i} task={t} editTaskCallback={() => editTask(t)} deleteTaskCallback={() => deleteTask(t)}/>
                    )}
                </KanbanTableColumn>
            </KanbanTable>

            <ModalBody params={modalParams}>
                <ModalCard>
                    <ManageTaskModal story={story} task={task} onSubmitCallback={onFormSubmit}/>
                </ModalCard>
            </ModalBody>
        </>
        
    )
}

export default StoryDetails;