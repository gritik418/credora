import { RootState } from "@/store";

export const selectReceivedOrganizationInvites = (state: RootState) =>
  state.user.receivedOrganizationInvites;
