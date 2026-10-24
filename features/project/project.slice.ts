import { createSlice } from "@reduxjs/toolkit";
import { TaskAssignee } from "../task/task.interface";
import projectApi from "./project.api";
import { ProjectWithWorkspaceAndMembers } from "./project.interface";

interface ProjectState {
  projects: ProjectWithWorkspaceAndMembers[];
  selectedProject: ProjectWithWorkspaceAndMembers | null;
  availableAssignees: TaskAssignee[];
}

const initialState: ProjectState = {
  projects: [],
  selectedProject: null,
  availableAssignees: [],
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
      )
      .addMatcher(
        projectApi.endpoints.getTaskAssignees.matchFulfilled,
        (state, action) => {
          if (action.payload.data?.assignees.length) {
            state.availableAssignees = action.payload.data.assignees;
          } else {
            state.availableAssignees = [];
          }
        },
      )
      .addMatcher(
        projectApi.endpoints.getTaskAssignees.matchRejected,
        (state, action) => {
          state.availableAssignees = [];
        },
      );
  },
});

export default projectSlice;
