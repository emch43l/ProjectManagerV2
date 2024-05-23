import { useCallback, useMemo, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { Project } from "../../type/Project";

export type ProjectModallParams = {
  project: Project | null;
  mode: ProjectModalMode;
  onSubmitCallback: () => void;
};

export enum ProjectModalMode {
  ADD,
  UPDATE,
  DELETE,
}

type ModalText = {
  title: string,
  buttonTitle: string,
}

const ProjectModal = ({
  mode,
  project,
  onSubmitCallback,
}: ProjectModallParams) => {
  const axios = useAxios();

  const [name, setName] = useState<string | null>(project?.name ?? null);

  const handleClick = () => {
    switch (mode) {
      case ProjectModalMode.ADD:
        axios
          .post("api/projects", { name: name })
          .then(onSubmitCallback)
          .catch(console.log);
        break;
      case ProjectModalMode.UPDATE:
        axios
          .put(`api/projects/${project!.id}`, { name: name })
          .then(onSubmitCallback)
          .catch(console.log);
        break;
      case ProjectModalMode.DELETE:
        axios
          .delete(`api/projects/${project!.id}`)
          .then(onSubmitCallback)
          .catch(console.log);
        break;
    }
  };

  const getModalText = (): ModalText => {
    switch (mode) {
      case ProjectModalMode.ADD:
        return {
          title: "Create Project",
          buttonTitle: "Create"
        };
      case ProjectModalMode.UPDATE:
        return {
          title: "Update Project",
          buttonTitle: "Update"
        };
      case ProjectModalMode.DELETE:
        return {
          title: "Delete Project",
          buttonTitle: "Delete"
        };
    }
  };

  const modalText = useMemo(() => getModalText(),[mode]);

  return (
    <div>
      <h1>{modalText.title}</h1>
      <div>
        <div className="flex justify-between">
          <div className="mt-3 w-full mr-2">
            {mode == ProjectModalMode.DELETE ? (
              "Do you really want to delete this project ?"
            ) : (
              <>
                <div>
                  <label htmlFor="name">Project Name</label>
                </div>
                <input
                  type="text"
                  value={name ?? ""}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                  id="name"
                />
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <div className="mt-10 w-full mr-2 relative">
            <div className="absolute right-0 bottom-0">
              <button onClick={handleClick}>{modalText.buttonTitle}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
