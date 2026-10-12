import { RootState } from "@/store";

export const selectOrganizationInvites = (state: RootState) =>
  state.organizationInvite.organizationInvites;
