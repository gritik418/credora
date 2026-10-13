import { createSlice } from "@reduxjs/toolkit";
import workspaceApi from "./workspace.api";
import { Workspace } from "./workspace.interface";

interface WorkspaceState {
  workspaces: Workspace[];
  selectedWorkspace: Workspace | null;
}

const initialState: WorkspaceState = {
  workspaces: [],
  selectedWorkspace: null,
};

const workspaceSlice = createSlice({
  name: "workspaceSlice",
  reducerPath: "workspaceSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        workspaceApi.endpoints.getWorkspaces.matchFulfilled,
        (state, action) => {
          if (action.payload.success && action.payload?.data?.workspaces) {
            state.workspaces = action.payload.data.workspaces;
          } else {
            state.workspaces = [];
          }
        },
      )
      .addMatcher(
        workspaceApi.endpoints.getWorkspaces.matchRejected,
        (state, action) => {
          state.workspaces = [];
        },
      )
      .addMatcher(
        workspaceApi.endpoints.getWorkspaceBySlug.matchFulfilled,
        (state, action) => {
          if (action.payload.success && action.payload?.data?.workspace) {
            state.selectedWorkspace = action.payload.data.workspace;
          } else {
            state.selectedWorkspace = null;
          }
        },
      )
      .addMatcher(
        workspaceApi.endpoints.getWorkspaceBySlug.matchRejected,
        (state, action) => {
          state.selectedWorkspace = null;
        },
      );
  },
});

export default workspaceSlice;
