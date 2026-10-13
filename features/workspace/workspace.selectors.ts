import { RootState } from "@/store";

export const selectWorkspaces = (state: RootState) =>
  state.workspaceSlice.workspaces;

export const selectSelectedWorkspace = (state: RootState) =>
  state.workspaceSlice.selectedWorkspace;
