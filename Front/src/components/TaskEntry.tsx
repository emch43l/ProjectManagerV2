import { useNavigate } from "react-router-dom";
import { Task, TaskState } from "../type/Task";
import EditTaskModal from "./modals/EditTaskModal";
import ModalCard from "./modals/ModalCard";
import ModalBody from "./modals/ModalBody";
import useModal from "../hooks/useModal";

const TaskEntry = ({task} : {task: Task}) => {

    const modalParams = useModal();

    return (
        <div className="p-4 m-2 bg-yellow-100 rounded-md shadow-md w-[250px]">
            <div>
                <div className="mt-2">
                    <div className="text-xs text-yellow-600">Name</div>
                    <div className="font-thin">{task.name}</div>
                </div>
                <div className="mt-2">
                    <div className="text-xs text-yellow-600">Description</div>
                    <div className="font-thin max-h-[150px] overflow-y-auto">{task.description}</div>
                </div>
                <div className="mt-2">
                    <div className="text-xs text-yellow-600">State</div>
                    <div className="font-thin">{TaskState[task.state]}</div>
                </div>
                <div className="mt-2 flex justify-between">
                    <div>
                        <div className="text-xs text-yellow-600">Creation Date</div>
                        <div className="font-thin text-xs">{new Date(task.creationDate).toDateString()}</div>
                    </div>
                    <div>
                        <div className="text-xs text-yellow-600 text-right">Assigned user</div>
                        <div className="font-thin text-xs text-right overflow-hidden text-ellipsis max-w-[100px]">{task.user.email}</div>
                    </div>
                </div>
                <div className="mt-2 flex justify-between">
                    <div>
                        <div className="text-xs text-yellow-600">Start date</div>
                        <div className="font-thin text-xs">{new Date(task.creationDate).toDateString()}</div>
                    </div>
                    <div>
                        <div className="text-xs text-yellow-600">Finish date</div>
                        <div className="font-thin text-xs">{new Date(task.creationDate).toDateString()}</div>
                    </div>
                </div>
                <div className="bg-black opacity-5 h-[1px] my-4"></div>
                <div className="flex justify-between mt-2">
                    <button className="px-3 bg-yellow-200 rounded-sm py-1 mx-1 text-yellow-700" onClick={modalParams.open} >Edit</button>
                    <button className="px-3 bg-yellow-200 rounded-sm py-1 mx-1 text-yellow-700">Delete</button>
                </div>
            </div>
            <ModalBody params={modalParams}>
                <ModalCard>
                    <EditTaskModal/>
                </ModalCard>
            </ModalBody>
        </div>
        
    )
}

export default TaskEntry;