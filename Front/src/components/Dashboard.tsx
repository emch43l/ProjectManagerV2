import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useSignOut from "../hooks/useSignOut";

const Dashboard = () => {
    const [projects,setProjects] = useState<Project[] | null>(null);

    const signOut = useSignOut();
    const axios = useAxios();
        
    useEffect(() => {
        (async () => {
            axios.get<Project[]>("api/projects").then(response => setProjects(response.data))
        })()
    },[])

    const logout = () => {
        signOut()
    }

    console.log(projects);


    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={logout}>Log Out</button>
            <div>
                <h2>Project list</h2>
                <div>
                    {projects === null ? projects : projects.map((p,i) => <div key={i}> <span>{p.id}</span> <span>{p.name}</span> </div>)}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;