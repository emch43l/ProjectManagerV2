import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useSignOut from "../hooks/useSignOut";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Project } from "../type/Project";
import ModalBody from "./modals/ModalBody";
import useModal from "../hooks/useModal";
import ModalCard from "./modals/ModalCard";
import ProjectModal, { ProjectModalMode } from "./modals/ProjectModal";

const Dashboard = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [modalMode, setModalMode] = useState<ProjectModalMode>(
    ProjectModalMode.ADD
  );

  const signOut = useSignOut();
  const axios = useAxios();

  const useModalParams = useModal();

  const getProjects = () => {
    axios
      .get<Project[]>("api/projects")
      .then((response) => setProjects(response.data));
  };

  const updateProjectsAndCloseModal = () => {
    getProjects()
    useModalParams.close()
  }

  const setupModal = (
    mode: ProjectModalMode,
    project: Project | null = null
  ) => {
    switch (mode) {
      case ProjectModalMode.ADD:
        setProject(null);
        setModalMode(ProjectModalMode.ADD);
        break;
      case ProjectModalMode.UPDATE:
        setProject(project);
        setModalMode(ProjectModalMode.UPDATE);
        break;
      case ProjectModalMode.DELETE:
        setProject(project);
        setModalMode(ProjectModalMode.DELETE);
        break;
    }

    useModalParams.open();
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <button
          className="bg-gray-700 text-gray-200 px-10 py-2 font-semibold uppercase rounded-b-md -mt-1"
          onClick={signOut}
        >
          Log Out
        </button>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-center">
          <button
            className="bg-green-200 px-4 py-2 rounded-md text-green-900 border-green-700 border-2 font-bold"
            onClick={() => setupModal(ProjectModalMode.ADD)}
          >
            Add Project
          </button>
          {projects === null
            ? "Loading..."
            : projects.map((p, i) => (
                <div key={i}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "bg-slate-200 px-10 py-2 rounded-md mx-2 font-semibold border-slate-300 border-2 box-border block"
                        : "bg-slate-100 px-10 py-2 rounded-md mx-2 block"
                    }
                    to={`project/${p.id}`}
                  >
                    <div className="flex justify-between">
                      <div className="mr-2">
                        <span>{p.name}</span>
                      </div>
                      <div className="flex ml-5">
                        <button
                          onClick={() => setupModal(ProjectModalMode.DELETE, p)}
                        >
                          <svg
                            className="h-4 w-4 align-bottom opacity-50 mb-[-2px]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                          </svg>
                        </button>
                        <div className="w-[1px] bg-black mx-2 opacity-10"></div>
                        <button
                          onClick={() => setupModal(ProjectModalMode.UPDATE, p)}
                        >
                          <svg
                            className="h-4 w-4 align-bottom opacity-50 mb-[-2px]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </NavLink>
                </div>
              ))}
        </div>
      </div>
      <ModalBody params={useModalParams}>
        <ModalCard>
          <ProjectModal
            mode={modalMode}
            project={project}
            onSubmitCallback={updateProjectsAndCloseModal}
          />
        </ModalCard>
      </ModalBody>
      <Outlet />
    </div>
  );
};

export default Dashboard;
