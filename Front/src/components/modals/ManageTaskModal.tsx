import { useEffect, useState } from "react";
import { User } from "../../type/User";
import useAxios from "../../hooks/useAxios";
import { Task, TaskState } from "../../type/Task";
import { Story } from "../../type/Story";

const DATE_LOCALE = "en-Ca";

export type TaskDates = {
    creationDate: string,
    endDate: string | null,
    startDate: string | null,
    expectedDate: string
}

export type ManageTaskModalParams = {
    story: Story,
    task: Task | null,
    onSubmitCallback: () => void
}

const ManageTaskModal = ({story,task,onSubmitCallback} : ManageTaskModalParams) => {

    const axios = useAxios();
    
    const [users,setUsers] = useState<User[] | null>(null)
    const [assignedUserId,assignUserId] = useState<number>(task?.user?.id ?? 0)
    const [name,setName] = useState<string>(task?.name ?? "")
    const [desc,setDesc] = useState<string>(task?.description ?? "")
    const [dates,setDates] = useState<TaskDates>({
        creationDate: new Date(task?.creationDate ?? Date.now()).toLocaleDateString(DATE_LOCALE),
        endDate: task?.endDate ? new Date(task.endDate).toLocaleDateString(DATE_LOCALE) : null,
        startDate: task?.startDate ? new Date(task.startDate).toLocaleDateString(DATE_LOCALE) : null,
        expectedDate: new Date(task?.expectedDate ?? Date.now()).toLocaleDateString(DATE_LOCALE)
    })

    
    console.log("dates",dates)
    console.log("task",task)

    useEffect(() => {
        axios
            .get<User[]>("api/users")
            .then(response => response.data)
            .then(setUsers)
            .catch(console.log)
    },[])

    const handleClick = () => {
        if(task == null) {

            if(!assignedUserId)
                return;

            axios
                .post("api/tasks",{
                    name: name,
                    description: desc,
                    storyId: story.id,
                    expectedEndTime: dates.expectedDate,
                    creationDate: dates.creationDate,
                    userId: assignedUserId
                })
                .catch(console.log)
                .finally(onSubmitCallback)

        } else {
            axios
                .put(`api/tasks/${task.id}`,{
                    name: name,
                    description: desc,
                    startDate: dates.startDate,
                    endDate: dates.endDate
                })
                .catch(console.log)
                .finally(onSubmitCallback)
        }
    }

    return (
        <div>
            <h1>{task ? "Edit task" : "Create task"}</h1>
            <div>
                <div className="flex justify-between">
                    <div className="mt-3 w-full mr-2">
                        <div><label htmlFor="name">Name</label></div>
                        <input type="text" className="w-full" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mt-3 w-full mr-2">
                        <div><label htmlFor="desc">Description</label></div> 
                        <input type="text" className="w-full" id="desc" value={desc} onChange={(e) => setDesc(e.target.value)}/>
                    </div>
                </div>

                <div className="flex justify-between">
                    {task ? null : <div className="mt-3 w-full mr-2">
                        <div><label htmlFor="priority">Assigned user</label></div> 
                        <select id="user" className="w-full" value={assignedUserId} onChange={(e) => assignUserId(Number(e.target.value))} >
                            <option>Please select an user !</option>
                            {users ? users.filter(u => u.roles.find(r => r.toLocaleLowerCase() !== "admin")).map((u,i) => <option key={i} value={u.id}>{u.email}</option> ) : null}
                        </select>
                    </div>}
                </div>

                {!task ?  <div className="flex justify-between">
                    <div className="mt-3 w-full mr-2">
                        <div><label htmlFor="date3">Creation date</label></div>
                        <input type="date" id="date3" value={dates.creationDate} onChange={(e) => setDates(state => ({
                            ...state,
                            creationDate: new Date(e.target.value).toLocaleDateString(DATE_LOCALE)
                        }))} />
                    </div>
                </div> : null}

               

                <div className="flex justify-between">
                    {task ? <div>
                        <div className="mt-3 w-full mr-2">
                            <div><label htmlFor="date1">Start date</label></div>
                            <input type="date" id="date1" value={dates.startDate ?? ""} onChange={(e) => setDates(state => ({
                                ...state,
                                startDate: new Date(e.target.value).toLocaleDateString(DATE_LOCALE)
                            }))} />
                        </div>
                        <div className="mt-3 w-full mr-2">
                            <div><label htmlFor="date2">End date</label></div>
                            <input type="date" id="date2" value={dates.endDate ?? ""} onChange={(e) => setDates(state => ({
                                ...state,
                                endDate: new Date(e.target.value).toLocaleDateString(DATE_LOCALE)
                            }))} />
                        </div>
                    </div> : null }

                    
                    {!task ? <div className="mt-3 w-full mr-2">
                        <div><label htmlFor="date3">Expected date</label></div>
                        <input type="date" id="date3" value={dates.expectedDate} onChange={(e) => setDates(state => ({
                            ...state,
                            expectedDate: new Date(e.target.value).toLocaleDateString(DATE_LOCALE)
                        }))} />
                    </div> : null }
                    
                </div>
                <div>
                    <div className="mt-12 w-full mr-2 relative">
                        <div className="absolute right-0 bottom-0">
                            <button onClick={handleClick}>
                                {task ? "Edit task" : "Create task"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageTaskModal;