import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useSignOut from "../hooks/useSignOut";
import { Link, Outlet } from "react-router-dom";
import { Project } from "../type/Project";

const Dashboard = () => {
    const [projects,setProjects] = useState<Project[] | null>(null);

    const signOut = useSignOut();
    const axios = useAxios();
        
    useEffect(() => {
        axios
            .get<Project[]>("api/projects")
            .then(response => setProjects(response.data))
    },[])

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={signOut}>Log Out</button>
            <div>
                <h2>Project list</h2>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects === null ? projects : projects.map((p,i) => 
                                <tr key={i}>
                                    <td>{p.id}</td> 
                                    <td>{p.name}</td>
                                    <td>
                                        <Link to={`project/${p.id}`}>Details</Link>
                                    </td> 
                                </tr>
                            )}
                        </tbody>
                    </table>
                    
                </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default Dashboard;