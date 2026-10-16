import { RootState } from "@/store";

export const selectWorkspaceMembers = (state: RootState) =>
  state.workspaceMember.members;
