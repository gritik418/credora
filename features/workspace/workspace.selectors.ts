import { RootState } from "@/store";

export const selectWorkspaces = (state: RootState) =>
  state.workspaceSlice.workspaces;
