import { useNavigate } from "react-router-dom";
import { Story, StoryPriority, StoryState } from "../type/Story";

const StoryEntry = ({story,editStoryCallback,deleteStoryCallback} : {story: Story, editStoryCallback: () => void, deleteStoryCallback: () => void }) => {

    const navigate = useNavigate();

    return (
        <div className="p-4 m-2 bg-slate-50 rounded-md shadow-md w-[250px]">
            <div>
                <div className="mt-2">
                    <div className="text-xs text-slate-500">Name</div>
                    <div className="font-thin">{story.name}</div>
                </div>
                <div className="mt-2">
                    <div className="text-xs text-slate-500">Description</div>
                    <div className="font-thin max-h-[150px] overflow-y-auto">{story.description}</div>
                </div>
                <div className="mt-2">
                    <div className="text-xs text-slate-500">Priority</div>
                    <div className="font-thin">{StoryPriority[story.priority]}</div>
                </div>
                <div className="mt-2">
                    <div className="text-xs text-slate-500">State</div>
                    <div className="font-thin">{StoryState[story.state]}</div>
                </div>
                <div className="mt-2">
                    <div className="text-xs text-slate-500">Date</div>
                    <div className="font-thin text-xs">{new Date(story.creationDate).toDateString()}</div>
                </div>
                <div className="bg-black opacity-5 h-[1px] my-4"></div>
                <div className="flex justify-between mt-2">
                    <button className="px-3 bg-slate-200 rounded-sm py-1 mx-1 text-slate-600" onClick={editStoryCallback}>Edit</button>
                    <button className="px-3 bg-slate-200 rounded-sm py-1 mx-1 text-slate-600" onClick={() => navigate(`story/${story.id}`)}>Tasks</button>
                    <button className="px-3 bg-slate-200 rounded-sm py-1 mx-1 text-slate-600" onClick={deleteStoryCallback}>Delete</button>
                </div>
            </div>
        </div>
        
    )
}

export default StoryEntry;