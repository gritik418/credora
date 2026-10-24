import { createSlice } from "@reduxjs/toolkit";
import { TaskAssignee } from "../task/task.interface";
import projectApi from "./project.api";
import { ProjectWithWorkspaceAndMembers } from "./project.interface";

interface TaskReviewer {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string | null;
}

interface ProjectState {
  projects: ProjectWithWorkspaceAndMembers[];
  selectedProject: ProjectWithWorkspaceAndMembers | null;
  availableAssignees: TaskAssignee[];
  availableReviewers: TaskReviewer[];
}

const initialState: ProjectState = {
  projects: [],
  selectedProject: null,
  availableAssignees: [],
  availableReviewers: [],
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
      )
      .addMatcher(
        projectApi.endpoints.getTaskReviewers.matchFulfilled,
        (state, action) => {
          if (action.payload.data?.reviewers.length) {
            state.availableReviewers = action.payload.data.reviewers;
          } else {
            state.availableReviewers = [];
          }
        },
      )
      .addMatcher(
        projectApi.endpoints.getTaskReviewers.matchRejected,
        (state, action) => {
          state.availableReviewers = [];
        },
      );
  },
});

export default projectSlice;
