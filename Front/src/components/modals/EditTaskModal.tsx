import { useEffect, useState } from "react";
import { User } from "../../type/User";
import useAxios from "../../hooks/useAxios";
import { TaskState } from "../../type/Task";

const EditTaskModal = () => {

    const axios = useAxios();
    
    const [users,setUsers] = useState<User[] | null>(null);

    useEffect(() => {
        axios
            .get<User[]>("api/users")
            .then(response => response.data)
            .then(setUsers)
            .catch(console.log)
    },[])

    return (
        <div>
            <h1>Create Task</h1>
            <div>
                <div className="flex justify-between">
                    <div className="mt-3 w-full mr-2">
                        <div><label htmlFor="name">Name</label></div>
                        <input type="text" className="w-full" id="name" />
                    </div>
                    <div className="mt-3 w-full mr-2">
                        <div><label htmlFor="desc">Description</label></div> 
                        <input type="text" className="w-full" id="desc" />
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="mt-3 w-full mr-2">
                        <div><label htmlFor="priority">Assigned user</label></div> 
                        <select id="user" className="w-full" value={"1"} >
                            {users ? users.map((u,i) => <option key={i} value={u.id}>{u.email}</option> ) : null}
                        </select>
                    </div>
                    <div className="mt-3 w-full mr-2">
                        <div><label htmlFor="state">State</label></div>
                        <select id="state" className="w-full" >
                            <option value={TaskState.Todo}>{TaskState[TaskState.Todo]}</option>
                            <option value={TaskState.Doing}>{TaskState[TaskState.Doing]}</option>
                            <option value={TaskState.Done}>{TaskState[TaskState.Done]}</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="mt-3 w-full mr-2">
                        <div><label htmlFor="date">Date</label></div>
                        <input type="date" id="date"  />
                    </div>
                    <div className="mt-3 w-full mr-2 relative">
                        <div className="absolute right-0 bottom-0">
                            <button>
                                Create Task
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTaskModal;