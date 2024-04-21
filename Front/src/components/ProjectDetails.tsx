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
            <div>   
                <h1 className="font-bold text-xl text-gray-800">{project.name}</h1>
                <button onClick={addStory}>Add Story</button>
                <div className="mt-5">
                    <h2 className="font-medium text-lg text-gray-800">Stories</h2>
                    <div className="h-[1px] bg-black opacity-10 my-5"></div>
                    <div className="flex">
                        <div className="w-full">
                            <h1 className="px-2 font-bold text-xl text-center text-gray-500">Todo</h1>
                            <div className="flex">
                            {project.stories.filter(s => s.state == StoryState.Todo).map((s,i) => 
                                <StoryEntry key={i} story={s} editStoryCallback={() => editStory(s)} deleteStoryCallback={() => deleteStory(s)}/>
                            )}
                            </div>
                        </div>
                        <div className="w-[2px] bg-black opacity-10 mx-5"></div>
                        <div className="w-full">
                            <h1 className="px-2 font-bold text-xl text-center text-gray-500">Doing</h1>
                            <div className="flex">
                            {project.stories.filter(s => s.state == StoryState.Doing).map((s,i) => 
                                <StoryEntry key={i} story={s} editStoryCallback={() => editStory(s)} deleteStoryCallback={() => deleteStory(s)}/>
                            )}
                            </div>
                        </div>
                        <div className="w-[2px] bg-black opacity-10 mx-5"></div>
                        <div className="w-full">
                            <h1 className="px-2 font-bold text-xl text-center text-gray-500">Done</h1>
                            <div className="flex">
                            {project.stories.filter(s => s.state == StoryState.Done).map((s,i) => 
                                <StoryEntry key={i} story={s} editStoryCallback={() => editStory(s)} deleteStoryCallback={() => deleteStory(s)}/>
                            )}
                            </div>
                        </div>
                    </div>
                    <div className="h-[1px] bg-black opacity-10 my-5"></div>
                </div>
            </div>

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