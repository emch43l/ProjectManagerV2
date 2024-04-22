import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useSignOut from "../hooks/useSignOut";
import { Link, NavLink, Outlet } from "react-router-dom";
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
            <div className="flex justify-center">
                <button className="bg-gray-700 text-gray-200 px-10 py-2 font-semibold uppercase rounded-b-md -mt-1" onClick={signOut}>Log Out</button>
            </div>
            <div className="mt-5">
                <div className="flex items-center justify-center">
                    {projects === null ? projects : projects.map((p,i) => 
                        <div key={i}>
                            <NavLink className={({ isActive }) => isActive ? "bg-slate-200 px-10 py-2 rounded-md mx-2 font-semibold border-slate-300 border-2 box-border" : "bg-slate-100 px-10 py-2 rounded-md mx-2"} to={`project/${p.id}`}>{p.name}</NavLink>
                        </div>
                    )}
                </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default Dashboard;