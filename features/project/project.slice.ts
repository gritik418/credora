import { createSlice } from "@reduxjs/toolkit";
import { Project } from "./project.interface";
import projectApi from "./project.api";

interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: [],
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
      );
  },
});

export default projectSlice;
