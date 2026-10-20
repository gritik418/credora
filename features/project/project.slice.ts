import { createSlice } from "@reduxjs/toolkit";
import { Project, ProjectWithWorkspaceAndMembers } from "./project.interface";
import projectApi from "./project.api";

interface ProjectState {
  projects: ProjectWithWorkspaceAndMembers[];
  selectedProject: ProjectWithWorkspaceAndMembers | null;
}

const initialState: ProjectState = {
  projects: [],
  selectedProject: null,
};

const projectSlice = createSlice({
  name: "project",
  reducerPath: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        projectApi.endpoints.getProjects.matchFulfilled,
        (state, action) => {
          if (action.payload.data?.projects.length) {
            state.projects = action.payload.data.projects;
          } else {
            state.projects = [];
          }
        },
      )
      .addMatcher(
        projectApi.endpoints.getProjects.matchRejected,
        (state, action) => {
          state.projects = [];
        },
      )
      .addMatcher(
        projectApi.endpoints.getProjectBySlug.matchFulfilled,
        (state, action) => {
          state.selectedProject = action.payload.data?.project ?? null;
        },
      )
      .addMatcher(
        projectApi.endpoints.getProjectBySlug.matchRejected,
        (state, action) => {
          state.selectedProject = null;
        },
      );
  },
});

export default projectSlice;
