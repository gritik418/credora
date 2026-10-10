import { RootState } from "@/store";

export const selectOrganizationMembers = (state: RootState) =>
  state.organizationMember.organizationMembers;
