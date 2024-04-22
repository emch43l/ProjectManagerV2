import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import StoryEntry from "./StoryEntry";
import { Project } from "../type/Project";
import ModalBody from "./modals/ModalBody";
import useModal from "../hooks/useModal";
import ManageStoryModal from "./modals/ManageStoryModal";
import ModalCard from "./modals/ModalCard";
import { Story, StoryState } from "../type/Story";
import KanbanTable from "./KanbanTable";
import KanbanTableColumn from "./KanbanTableColumn";
import KanbanTableColumnDivider from "./KanbanTableColumnDivider";

type ProjectDetailsParams = {
    projectId: string
}

const PorjectDetails = () => {

    const modalParams = useModal();
    const axios = useAxios();
    const { projectId } = useParams<ProjectDetailsParams>();
    const [project,setProject] = useState<Project | null>(null);
    const [currentStory,setStory] = useState<Story | null>(null);

    useEffect(() => {
        getProject()
    },[projectId])

    const getProject = () => {
        axios
            .get<Project>(`api/projects/${projectId}`)
            .then(response => response.data)
            .then(setProject)
            .catch(console.log)
    }

    const editStory = (story: Story) => {
        setStory(story)
        modalParams.open()
    }

    const deleteStory = (story: Story) => {
        axios
            .delete<Project>(`api/stories/${story.id}`)
            .finally(getProject)
            .catch(console.log)
    }

    const addStory = () => {
        setStory(null)
        modalParams.open()
    }
    
    const onFormSubmit = () => {
        modalParams.close()
        getProject()
    }

    return (
        project === null ? null :  
        <>
            <div className="flex items-center justify-center mt-5">
                <div className="-mb-10 bg-white z-10 px-10 py-1 border-slate-300 border-[1px] rounded-md font-semibold">
                    <span>{project.name} - Stories Table</span>
                </div>
                <div className="-mb-10 z-10 px-5 py-1 rounded-md font-semibold">
                    <button onClick={addStory} className=" bg-green-200 px-4 py-1 rounded-md text-green-900 border-green-700 border-[1px]">
                        Add             
                    </button>
                </div>
            </div>
                
            <KanbanTable>
                <KanbanTableColumn label="Todo" width="w-[33vw]">
                    {project.stories.filter(s => s.state == StoryState.Todo).map((s,i) => 
                        <StoryEntry key={i} story={s} editStoryCallback={() => editStory(s)} deleteStoryCallback={() => deleteStory(s)}/>
                    )}
                </KanbanTableColumn>
                <KanbanTableColumnDivider/>
                <KanbanTableColumn label="Doing" width="w-[33vw]">
                    {project.stories.filter(s => s.state == StoryState.Doing).map((s,i) => 
                        <StoryEntry key={i} story={s} editStoryCallback={() => editStory(s)} deleteStoryCallback={() => deleteStory(s)}/>
                    )}
                </KanbanTableColumn>
                <KanbanTableColumnDivider/>
                <KanbanTableColumn label="Done" width="w-[33vw]">
                    {project.stories.filter(s => s.state == StoryState.Done).map((s,i) => 
                        <StoryEntry key={i} story={s} editStoryCallback={() => editStory(s)} deleteStoryCallback={() => deleteStory(s)}/>
                    )}
                </KanbanTableColumn>
            </KanbanTable>

            <Outlet/>

            <ModalBody params={modalParams}>
                <ModalCard>
                    <ManageStoryModal story={currentStory} onSubmitCallback={onFormSubmit} project={project!}/>
                </ModalCard>
            </ModalBody>
        </>
        
    )
}

export default PorjectDetails;