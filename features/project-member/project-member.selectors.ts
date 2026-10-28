import { RootState } from "@/store";

export const selectProjectMembers = (state: RootState) =>
  state.projectMember.members;

export const selectProjectMemberIds = (state: RootState) =>
  state.projectMember.memberIds;
