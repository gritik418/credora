import { RootState } from "@/store";

export const selectProjects = (state: RootState) => state.project.projects;

export const selectSelectedProject = (state: RootState) =>
  state.project.selectedProject;
