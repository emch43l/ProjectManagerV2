const CreateTaskModal = () => {
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
                        <div><label htmlFor="priority">Priority</label></div> 
                        <select id="priority" className="w-full" >
                            
                        </select>
                    </div>
                    <div className="mt-3 w-full mr-2">
                        <div><label htmlFor="state">State</label></div>
                        <select id="state" className="w-full" >
                            
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

export default CreateTaskModal;