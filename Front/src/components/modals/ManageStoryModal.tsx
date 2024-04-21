import { useContext, useState } from "react";
import { Story, StoryPriority, StoryState } from "../../type/Story";
import { ModalContext } from "./ModalBody";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../auth/AuthContext";
import { Project } from "../../type/Project";

const DATE_LOCALE = "en-Ca";

export type ManageStoryModalParams = {
    project: Project,
    story: Story | null,
    onSubmitCallback: () => void
}


const ManageStoryModal = ({story,project,onSubmitCallback}: ManageStoryModalParams) => {
    const axios = useAxios();

    const [name,setName] = useState<string>(story?.name ?? "")
    const [desc,setDesc] = useState<string>(story?.description ?? "")
    const [priority,setPriority] = useState<string>(story?.priority?.toString() ?? "0")
    const [state,setState] = useState<string>(story?.state?.toString() ?? "0")
    const [date,setDate] = useState<string>(new Date(story?.creationDate ?? Date.now()).toLocaleDateString(DATE_LOCALE))
    
    const handleClick = () => {

        if(story === null) {

            axios.post("api/stories",{
                name: name,
                description: desc,
                storyPriority: Number(priority),
                storyState:  Number(state),
                creationDate: date,
                projectId: project.id
            }).catch(console.log).finally(() => onSubmitCallback())
        } else {
            axios.put(`api/stories/${story?.id}`,{
                name: name,
                description: desc,
                storyPriority: Number(priority),
                storyState: Number(state),
                creationDate: date,
            }).catch(console.log).finally(() => onSubmitCallback())
           
        }
    }


    return (
        <div>
            <h1>{story === null ? "Add Story" : "Edit Story"}</h1>
            <div>
                <div className="flex justify-between">
                    <div className="mt-3 w-full mr-2">
                        <div><label htmlFor="name">Name</label></div>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full" id="name" />
                    </div>
                    <div className="mt-3 w-full mr-2">
                        <div><label htmlFor="desc">Description</label></div> 
                        <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full" id="desc" />
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="mt-3 w-full mr-2">
                        <div><label htmlFor="priority">Priority</label></div> 
                        <select id="priority" className="w-full" value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value={StoryPriority.Low}>{StoryPriority[StoryPriority.Low]}</option>
                            <option value={StoryPriority.Medium}>{StoryPriority[StoryPriority.Medium]}</option>
                            <option value={StoryPriority.High}>{StoryPriority[StoryPriority.High]}</option>
                        </select>
                    </div>
                    <div className="mt-3 w-full mr-2">
                        <div><label htmlFor="state">State</label></div>
                        <select id="state" className="w-full" value={state} onChange={(e) => setState(e.target.value)}>
                            <option value={StoryState.Todo}>{StoryState[StoryState.Todo]}</option>
                            <option value={StoryState.Doing}>{StoryState[StoryState.Doing]}</option>
                            <option value={StoryState.Done}>{StoryState[StoryState.Done]}</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="mt-3 w-full mr-2">
                        <div><label htmlFor="date">Date</label></div>
                        <input type="date" id="date" value={date} onChange={(e) => setDate(new Date(e.target.value).toLocaleDateString(DATE_LOCALE))} />
                    </div>
                    <div className="mt-3 w-full mr-2 relative">
                        <div className="absolute right-0 bottom-0">
                            <button onClick={handleClick}>
                                {story === null ? "Create Story" : "Edit Story"}
                            </button>
                        </div>
                        
                    </div>
                </div>
                
                
                
            </div>
        </div>
    )
}

export default ManageStoryModal;